# Aula de Capacidades — juego de votación en vivo

Aplicación web para una exposición de 30 minutos sobre Amartya Sen, capítulo 4 de *Desarrollo y libertad* (“Poverty as Capability Deprivation”), con dos interfaces separadas:

- **Cabina de presentadores** (`/presenter`): controla la presentación, abre y cierra votaciones y muestra los resultados en vivo.
- **Votación del público** (`/v/CODIGO`): los compañeros entran desde el QR, votan y esperan. No pueden avanzar diapositivas.

El servidor sincroniza ambas pantallas mediante Socket.IO. Puedes ejecutarlo en una red local o publicarlo una sola vez en internet; cuando esté publicado, nadie tendrá que instalar nada en los computadores o celulares de los participantes.

## 1. Requisitos

- **Si la publicas en internet:** una cuenta de GitHub y una de Render para realizar el despliegue inicial. Después, basta con un navegador y conexión a internet en el computador expositor y los celulares.
- **Si la ejecutas localmente:** un computador con Node.js 18 o superior y todos los celulares conectados a la misma red Wi‑Fi. La red debe permitir que los dispositivos se comuniquen entre sí.

## 2. Publicarla en internet (recomendado si expondrán desde otro computador)

La aplicación incluye `render.yaml` para facilitar el alojamiento gratuito inicial en Render. Se publica una sola vez y después todos entran con enlaces web; no necesitan instalar Node.js ni descargar este ZIP.

1. Crea una cuenta en [GitHub](https://github.com/) y otra en [Render](https://render.com/).
2. En GitHub, crea un repositorio nuevo (por ejemplo, `aula-capacidades`). Sube **el contenido** de esta carpeta, incluyendo `public/`, `server.js`, `content.js`, `package.json` y `render.yaml`. No subas `node_modules/` ni `.env`.
3. En Render, pulsa **New + → Blueprint** y conecta el repositorio de GitHub. Render detectará `render.yaml` y propondrá crear el servicio web.
4. Revisa la configuración y despliega. En el servicio, espera a que aparezca el estado **Live**. Render asignará una dirección pública parecida a `https://aula-capacidades.onrender.com`.
5. Abre esa dirección y agrega `/presenter`, por ejemplo `https://aula-capacidades.onrender.com/presenter`. Entra con el PIN definido en `render.yaml` (por defecto `2468`; cámbialo en el archivo antes de subirlo).
6. La cabina generará el QR con el dominio público automáticamente. Comparte ese QR: los celulares pueden usar Wi-Fi o datos móviles.

**Importante sobre el plan gratuito:** Render puede suspender un servicio gratis después de 15 minutos sin tráfico entrante y puede reiniciarlo. Al reactivarse puede tardar alrededor de un minuto; como los votos se guardan en memoria, un reinicio borra la sesión. Para una exposición puntual, abre la cabina con anticipación y mantén la sesión conectada; para mayor estabilidad, usa un plan de pago. Consulta [las limitaciones del plan gratuito de Render](https://render.com/docs/free).

## 3. Instalación local en Windows (alternativa)

1. Descarga y descomprime la carpeta `aula_capacidades`.
2. Instala Node.js desde https://nodejs.org/ si aún no está instalado.
3. Dentro de la carpeta, duplica `.env.example` y nombra la copia `.env`.
4. Abre `.env` y cambia `PRESENTER_PIN=2468` por un PIN que solo conozca el equipo expositor. Puedes cambiar también `ROOM_CODE=AULA2026`.
5. Abre una terminal dentro de la carpeta. En Windows puedes hacer clic en la barra de dirección del Explorador, escribir `cmd` y pulsar Enter.
6. Ejecuta:

   ```bash
   npm install
   npm start
   ```

7. En el computador expositor abre `http://localhost:3000/presenter`.
8. Ingresa el PIN. En la cabina aparecerá el QR para los compañeros.
9. Pide al público que escanee el QR desde su celular. Todos deben estar conectados a la misma Wi‑Fi.

Deja la terminal abierta durante toda la actividad. Si la cierras, el servidor se detiene.

## 4. Cómo se usa durante la exposición

1. En la cabina, pulsa **Iniciar presentación**.
2. El expositor presenta el escenario y lee la pregunta.
3. Pulsa **Abrir votación**. En ese momento aparece la pregunta en los celulares.
4. Observa las barras de votos en vivo. Cada dispositivo puede cambiar su voto mientras la votación siga abierta.
5. Pulsa **Cerrar votación**. La pantalla de todos muestra los porcentajes y las consecuencias de las tres opciones.
6. Comenta la distribución y pulsa **Mostrar explicación** para presentar el concepto de Sen y la conexión con las otras lecturas.
7. Cuando termine la explicación, pulsa **Siguiente ronda**.
8. Al finalizar la sexta ronda aparece la síntesis y la bibliografía. **Reiniciar actividad** borra los votos de la sesión y devuelve la presentación al inicio.

El público no tiene botones para iniciar, cerrar ni avanzar las rondas.

## 5. Si el QR no abre en los celulares

- Comprueba que el computador y los celulares estén en la misma Wi‑Fi (no unos en datos móviles y otros en Wi‑Fi).
- Acepta el aviso de Windows Firewall para permitir Node.js en redes privadas.
- En algunas redes de universidades o instituciones está bloqueada la comunicación entre dispositivos. En ese caso, prueba con un punto de acceso/hotspot del teléfono de un integrante y conecta todos los dispositivos a esa red.
- Si el QR muestra una IP incorrecta, abre `cmd`, ejecuta `ipconfig`, identifica la dirección IPv4 del adaptador Wi‑Fi y escribe esa dirección en `.env`, por ejemplo `PUBLIC_URL=http://192.168.1.35:3000`. Reinicia `npm start` y vuelve a cargar la cabina.

Si se aloja la aplicación en Render, el QR detecta automáticamente el dominio público. En otros alojamientos, puedes definir `PUBLIC_URL` con la dirección HTTPS pública, por ejemplo `PUBLIC_URL=https://mi-clase.example.com`. El alojamiento debe soportar aplicaciones Node.js y conexiones WebSocket/Socket.IO.

## 6. Estructura de la actividad (30 minutos)

| Momento | Responsable | Tiempo |
|---|---|---:|
| Presentación del juego y reglas | Integrante 1 | 2 min |
| Ronda 1. Ingresos y capacidades | Integrante 1 | 3 min |
| Ronda 2. Factores de conversión | Integrante 2 | 4 min |
| Ronda 3. Ingreso, salud y educación | Integrante 3 | 4 min |
| Ronda 4. Desempleo y privaciones no monetarias | Integrante 4 | 4 min |
| Ronda 5. Género, redistribución y reconocimiento | Integrante 5 | 5 min |
| Ronda 6. Territorio, Estado y paz en Colombia | Integrante 6 | 5 min |
| Síntesis y reflexión conjunta | Todos | 3 min |
| **Total** |  | **30 min** |

La guía de cada integrante aparece en la cabina y la explicación de cada ronda aparece como una diapositiva independiente después de revelar los resultados.

## 7. Contenido académico

Las seis rondas cubren: pobreza como privación de capacidades; factores de conversión y heterogeneidad; relación bidireccional entre ingreso y capacidades; efectos no monetarios del desempleo; desigualdad de género y distribución intrahogar; y exclusión rural, presencia estatal y justicia transicional en Colombia.

Las lecturas complementarias se integran así:

- **Becerril Velasco**, “El papel del Estado en el alivio a la pobreza en la era neoliberal. Una aproximación teórica”: capacidad institucional, intervención estatal y políticas de alivio a la pobreza.
- **Nancy Fraser**, “De la distribución al reconocimiento” y “La justicia social en la era de la política de identidad: redistribución, reconocimiento y participación”: justicia económica, reconocimiento y paridad de participación.
- **Brookings**, *Peace with Justice: The Colombian Experience with Transitional Justice*: exclusión rural, tierra, reparación a víctimas, servicios y compromisos de desarrollo territorial contemplados en el Acuerdo Final.

La aplicación evita presentar los compromisos del Acuerdo Final como si todos ya estuvieran plenamente ejecutados. También advierte que la cifra de “más de 100 millones” asociada a las “mujeres desaparecidas” pertenece a la discusión histórica de Sen y no es un conteo estadístico actual.

**Importante para la bibliografía:** los datos editoriales exactos (año, revista, volumen, páginas y URL) de los PDF complementarios no se han inferido. Complétalos copiando la referencia de la portada o de la primera página de cada PDF del curso.

## 8. Privacidad y límites

- La aplicación no solicita nombres ni correos. Identifica cada navegador con un identificador aleatorio guardado localmente para permitir que el participante cambie su voto y recupere su selección al reconectarse.
- Los votos se guardan en la memoria del servidor durante la sesión. Si se apaga o reinicia el servidor, se borran.
- El PIN básico protege la cabina frente a accesos casuales, pero esta configuración está pensada para una actividad de aula en una red de confianza; no es un sistema de autenticación empresarial.
- No compartas el PIN con el público.
