const socket = io();
const $ = (id) => document.getElementById(id);
const roomCode = (location.pathname.split('/').filter(Boolean)[1] || '').toUpperCase();
let currentState = null;
let selectedOption = null;
let joined = false;
let acknowledgement = '';
let participantId = localStorage.getItem('aula-capacidades-participant');
if (!participantId) {
  participantId = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : `p-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem('aula-capacidades-participant', participantId);
}
$('room-code').textContent = roomCode || '—';

socket.on('connect', () => {
  socket.emit('student:join', { roomCode, participantId });
});
socket.on('student:joined', (result) => {
  joined = Boolean(result.ok);
  if (!result.ok) {
    $('vote-content').innerHTML = `<div class="state-card"><div class="big-mark">!</div><h1>No pudimos entrar</h1><p>${result.message || 'Revisa el enlace del QR.'}</p></div>`;
    return;
  }
  selectedOption = result.selectedOption || null;
  if (currentState) render(currentState);
});
socket.on('classroom:update', (state) => {
  currentState = state;
  render(state);
});
socket.on('vote:ack', (result) => {
  acknowledgement = result.message || '';
  if (result.ok) selectedOption = result.selectedOption;
  if (currentState) render(currentState);
});
socket.on('disconnect', () => {
  acknowledgement = 'Se perdió la conexión. La página intentará conectarse de nuevo.';
  if (currentState) render(currentState);
});

function render(state) {
  if (!joined) return;
  if (state.phase === 'intro') {
    $('vote-content').innerHTML = `<div class="waiting-card"><div class="big-mark">✦</div><h1>¡Ya estás en la sala!</h1><p class="muted">La actividad todavía no comienza. Cuando el equipo expositor inicie, aparecerá aquí la primera situación.</p></div>`;
    return;
  }
  if (state.phase === 'finished') {
    $('vote-content').innerHTML = `<div class="state-card finished-mobile"><div class="big-mark">✓</div><div class="mobile-round">Actividad terminada</div><h1>Gracias por participar</h1><p>La pobreza no se entiende solo por los ingresos: también importa qué oportunidades reales tienen las personas para vivir la vida que valoran.</p><div class="mobile-explain"><b>Para recordar:</b><br>Recursos + condiciones de conversión + reconocimiento y participación = una mirada más completa sobre la justicia y el desarrollo.</div></div>`;
    return;
  }
  const round = state.round;
  if (!round) return;
  if (state.phase === 'question') {
    $('vote-content').innerHTML = `<div class="waiting-card"><div class="mobile-round">Ronda ${state.currentIndex + 1} de ${state.totalRounds}</div><h1>${round.title}</h1><p class="muted">El equipo está presentando el caso. Las opciones aparecerán cuando abra la votación.</p></div>`;
    return;
  }
  if (state.phase === 'voting') {
    const choices = round.options.map(o => `<button class="vote-choice ${selectedOption === o.id ? 'selected' : ''}" data-option="${o.id}"><span class="choice-letter">${o.id}</span><span class="choice-text">${o.label}</span></button>`).join('');
    $('vote-content').innerHTML = `<div class="question-card-mobile"><div class="mobile-round">Ronda ${state.currentIndex + 1} de ${state.totalRounds} · votación abierta</div><h1>${round.title}</h1><div class="mobile-scenario">${round.scenario}</div><div class="mobile-question">${round.question}</div>${choices}<div class="vote-status">${acknowledgement || (selectedOption ? `Tu voto actual es ${selectedOption}. Puedes cambiarlo hasta que cierre la votación.` : 'Elige una opción. Tu respuesta se registra al tocarla.')}</div></div>`;
    document.querySelectorAll('.vote-choice').forEach(button => {
      button.addEventListener('click', () => {
        selectedOption = button.dataset.option;
        acknowledgement = 'Registrando tu respuesta…';
        render(currentState);
        socket.emit('vote:cast', selectedOption);
      });
    });
    return;
  }
  if (state.phase === 'results') {
    const counts = state.counts || {A:0,B:0,C:0};
    const total = state.totalVotes || 0;
    const cards = round.options.map(o => {
      const n = counts[o.id] || 0; const pct = total ? Math.round(n / total * 100) : 0;
      return `<div class="mobile-result"><div class="mobile-result-top"><span>${o.id} · ${o.label}</span><span>${pct}%</span></div><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div><div class="result-consequence">${o.consequence}</div></div>`;
    }).join('');
    $('vote-content').innerHTML = `<div class="question-card-mobile"><div class="mobile-round">Resultados de la ronda ${round.id}</div><h1>${round.title}</h1><p class="muted">La clase registró ${total} voto(s). Estas son las respuestas y sus posibles consecuencias.</p><div class="mobile-results">${cards}</div><div class="vote-status">La explicación conceptual aparecerá cuando el equipo expositor avance.</div></div>`;
    return;
  }
  if (state.phase === 'explanation') {
    $('vote-content').innerHTML = `<div class="state-card"><div class="mobile-round">Ronda ${round.id} · explicación</div><h1>${round.insightTitle}</h1><div class="mobile-explain">${round.explanation}</div><p class="takeaway">${round.takeaway}</p><div class="discussion-prompt"><b>Pregunta para pensar:</b> ${round.discussion}</div><p class="tiny muted" style="margin-top:18px">Espera a que el equipo avance a la siguiente ronda.</p></div>`;
  }
}
