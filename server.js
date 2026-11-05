require('dotenv').config();
const express = require('express');
const http = require('http');
const os = require('os');
const QRCode = require('qrcode');
const { Server } = require('socket.io');
const { rounds } = require('./content');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = Number(process.env.PORT || 3000);
const ROOM_CODE = String(process.env.ROOM_CODE || 'AULA2026').toUpperCase();
const PUBLIC_URL = String(process.env.PUBLIC_URL || '').replace(/\/$/, '');

// Render y otros alojamientos Node.js sirven la app detrás de un proxy HTTPS.
// Confiamos en el proxy para que req.protocol refleje el protocolo público.
app.set('trust proxy', 1);

app.use(express.static('public'));
app.get('/healthz', (_req, res) => res.status(200).send('ok'));
app.get('/', (_req, res) => res.sendFile(__dirname + '/public/index.html'));
app.get('/presenter', (_req, res) => res.sendFile(__dirname + '/public/presenter.html'));
app.get('/v/:roomCode', (_req, res) => res.sendFile(__dirname + '/public/vote.html'));

function getLanIp() {
  const nets = os.networkInterfaces();
  for (const entries of Object.values(nets)) {
    for (const net of entries || []) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}
function getBaseUrl(req) {
  if (PUBLIC_URL) return PUBLIC_URL;
  // En producción, usa el dominio público de la petición (por ejemplo, *.onrender.com).
  // En local, usa la IP de la red para que los celulares puedan entrar por Wi-Fi.
  if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
    const forwardedProto = String(req.get('x-forwarded-proto') || req.protocol || 'https').split(',')[0].trim();
    return `${forwardedProto}://${req.get('host')}`;
  }
  const ip = getLanIp();
  return `http://${ip}:${PORT}`;
}
app.get('/api/config', (req, res) => {
  const baseUrl = getBaseUrl(req);
  res.json({ roomCode: ROOM_CODE, participantUrl: `${baseUrl}/v/${ROOM_CODE}`, presenterUrl: `${baseUrl}/presenter` });
});
app.get('/api/qr', async (req, res) => {
  try {
    const url = `${getBaseUrl(req)}/v/${ROOM_CODE}`;
    const dataUrl = await QRCode.toDataURL(url, { width: 320, margin: 1, errorCorrectionLevel: 'M' });
    res.json({ dataUrl, url });
  } catch (_error) {
    res.status(500).json({ error: 'No se pudo generar el código QR.' });
  }
});

const state = {
  roomCode: ROOM_CODE,
  phase: 'intro', // intro | question | voting | results | explanation | finished
  currentIndex: 0,
  votes: {}, // participantId -> optionId (one current vote per device)
  onlineParticipants: new Set()
};

function countsForCurrentRound() {
  const counts = { A: 0, B: 0, C: 0 };
  for (const optionId of Object.values(state.votes)) {
    if (Object.prototype.hasOwnProperty.call(counts, optionId)) counts[optionId] += 1;
  }
  return counts;
}
function currentRound() {
  return rounds[state.currentIndex] || null;
}
function publicState(includeLiveCounts) {
  return {
    roomCode: state.roomCode,
    phase: state.phase,
    currentIndex: state.currentIndex,
    totalRounds: rounds.length,
    round: currentRound(),
    counts: includeLiveCounts || ['results', 'explanation', 'finished'].includes(state.phase) ? countsForCurrentRound() : null,
    totalVotes: Object.keys(state.votes).length,
    onlineParticipants: state.onlineParticipants.size
  };
}
function broadcastState() {
  io.to('presenters').emit('classroom:update', publicState(true));
  io.to('participants').emit('classroom:update', publicState(false));
}
function presenterOnly(socket, callback) {
  if (!socket.data.isPresenter) {
    socket.emit('notice', { type: 'error', message: 'Debes iniciar sesión como presentador.' });
    return;
  }
  callback();
}

io.on('connection', (socket) => {
  socket.on('presenter:join', () => {
    socket.data.isPresenter = true;
    socket.join('presenters');
    socket.emit('presenter:ready', { ok: true });
    socket.emit('classroom:update', publicState(true));
  });

  socket.on('student:join', ({ roomCode, participantId } = {}) => {
    if (String(roomCode || '').toUpperCase() !== ROOM_CODE) {
      socket.emit('student:joined', { ok: false, message: 'Código de sala inválido.' });
      return;
    }
    const safeId = String(participantId || '').slice(0, 80);
    if (!safeId) {
      socket.emit('student:joined', { ok: false, message: 'No se pudo identificar este dispositivo. Recarga la página.' });
      return;
    }
    socket.data.participantId = safeId;
    socket.join('participants');
    state.onlineParticipants.add(socket.id);
    socket.emit('student:joined', { ok: true, hasVoted: Boolean(state.votes[safeId]), selectedOption: state.votes[safeId] || null });
    broadcastState();
  });

  socket.on('vote:cast', (optionId) => {
    if (!socket.data.participantId) return;
    if (state.phase !== 'voting') {
      socket.emit('vote:ack', { ok: false, message: 'La votación está cerrada.' });
      return;
    }
    if (!['A', 'B', 'C'].includes(optionId)) {
      socket.emit('vote:ack', { ok: false, message: 'Opción no válida.' });
      return;
    }
    state.votes[socket.data.participantId] = optionId;
    socket.emit('vote:ack', { ok: true, selectedOption: optionId, message: 'Voto registrado. Puedes cambiarlo mientras la votación siga abierta.' });
    broadcastState();
  });

  socket.on('control:start', () => presenterOnly(socket, () => {
    if (state.phase === 'intro') state.phase = 'question';
    broadcastState();
  }));
  socket.on('control:open-vote', () => presenterOnly(socket, () => {
    if (state.phase === 'question') state.phase = 'voting';
    broadcastState();
  }));
  socket.on('control:close-vote', () => presenterOnly(socket, () => {
    if (state.phase === 'voting') state.phase = 'results';
    broadcastState();
  }));
  socket.on('control:show-explanation', () => presenterOnly(socket, () => {
    if (state.phase === 'results') state.phase = 'explanation';
    broadcastState();
  }));
  socket.on('control:next', () => presenterOnly(socket, () => {
    if (state.phase !== 'explanation') return;
    if (state.currentIndex >= rounds.length - 1) {
      state.phase = 'finished';
    } else {
      state.currentIndex += 1;
      state.votes = {};
      state.phase = 'question';
    }
    broadcastState();
  }));
  socket.on('control:restart', () => presenterOnly(socket, () => {
    state.phase = 'intro';
    state.currentIndex = 0;
    state.votes = {};
    broadcastState();
  }));
  socket.on('disconnect', () => {
    state.onlineParticipants.delete(socket.id);
    broadcastState();
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('\nAula de Capacidades está lista.');
  console.log(`Panel de presentadores: http://localhost:${PORT}/presenter`);
  console.log(`Dirección para celulares: ${PUBLIC_URL || `http://${getLanIp()}:${PORT}`}/v/${ROOM_CODE}`);
  console.log(`Sala: ${ROOM_CODE}`);
  console.log('La cabina de presentadores no requiere PIN.\n');
});
