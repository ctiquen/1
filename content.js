const rounds = [
  {
    id: 1,
    title: '¿Basta con tener ingresos?',
    speaker: 'Integrante 1',
    time: '3 minutos',
    scenario: 'Una familia recibe ingresos que la ubican por encima de la línea monetaria de pobreza. Sin embargo, vive lejos de un hospital, no tiene agua potable continua y sus hijos deben caminar horas para llegar a la escuela.',
    question: '¿Qué decisión reduciría mejor la pobreza de esta familia?',
    options: [
      { id: 'A', label: 'Entregar una transferencia de dinero', consequence: 'Aumenta los recursos disponibles y puede aliviar necesidades urgentes. Pero, si no hay hospital, agua o escuela accesible, el dinero por sí solo no garantiza que la familia pueda convertirlo en salud o educación.' },
      { id: 'B', label: 'Construir y garantizar servicios públicos', consequence: 'Reduce barreras concretas para acceder a salud, agua y educación. Su efecto depende de que los servicios sean de calidad, estén cerca y respondan a las necesidades de la comunidad.' },
      { id: 'C', label: 'Combinar apoyo económico y servicios públicos', consequence: 'Atiende tanto la falta de recursos como las barreras del entorno. Requiere coordinación e inversión sostenida, pero reconoce que las privaciones se relacionan entre sí.' }
    ],
    insightTitle: 'La pobreza no es solamente falta de ingresos',
    explanation: 'Para Amartya Sen, el ingreso es un medio importante, pero no es el fin del desarrollo. Lo central es si las personas cuentan con capacidades reales para alcanzar funcionamientos que valoran: estar bien alimentadas, recibir atención médica, aprender, desplazarse y participar en la sociedad. Dos hogares con el mismo ingreso pueden tener libertades muy distintas.',
    teaching: 'Aclaren la diferencia entre recursos, capacidades y funcionamientos. El ingreso es un recurso; poder llegar a una consulta médica es una oportunidad real; recibir atención y mejorar la salud es un funcionamiento. La línea de pobreza monetaria no muestra por sí sola todas las privaciones.',
    connection: 'La lectura de Becerril Velasco complementa este punto: el papel del Estado y la capacidad institucional importan porque los recursos y las políticas necesitan instituciones que los conviertan en mejoras efectivas.',
    takeaway: 'La pregunta clave no es solo cuánto dinero tiene una persona, sino qué puede hacer y ser realmente con los recursos disponibles.',
    discussion: '¿Puede una persona dejar de ser pobre en términos monetarios y seguir privada de libertades importantes?'
  },
  {
    id: 2,
    title: 'El mismo dinero, ¿las mismas oportunidades?',
    speaker: 'Integrante 2',
    time: '4 minutos',
    scenario: 'Dos personas reciben exactamente el mismo ingreso. Una vive cerca del transporte, trabaja sin barreras físicas y tiene servicios a su alcance. La otra tiene una discapacidad, vive en una zona rural aislada y debe gastar más para trasladarse y acceder a atención.',
    question: '¿Qué política sería más justa?',
    options: [
      { id: 'A', label: 'Entregar exactamente la misma suma a ambas', consequence: 'Trata a las personas de forma idéntica, pero ignora que sus necesidades y costos pueden ser distintos. La igualdad de recursos no asegura igualdad de oportunidades.' },
      { id: 'B', label: 'Dar más dinero a quien tiene mayores costos', consequence: 'Reconoce diferencias personales y puede compensar algunos gastos adicionales. Aun así, no resuelve por sí solo obstáculos como caminos inaccesibles o ausencia de servicios.' },
      { id: 'C', label: 'Combinar apoyo diferenciado con cambios en el entorno', consequence: 'Puede adaptar el apoyo a las necesidades y, al mismo tiempo, reducir barreras de transporte, infraestructura y acceso. Exige identificar las privaciones concretas de cada contexto.' }
    ],
    insightTitle: 'Los recursos se convierten en libertades de manera desigual',
    explanation: 'Sen destaca factores de conversión distintos: heterogeneidad personal (edad, salud o discapacidad), diversidad del ambiente físico y social, y perspectivas relacionales. La misma cantidad de dinero no produce la misma capacidad en todas las personas. También importa cómo se distribuyen los recursos dentro del hogar: recibir una ayuda para la familia no significa que todos sus integrantes puedan decidir sobre ella o beneficiarse por igual.',
    teaching: 'Pueden mencionar la idea de Adam Smith retomada por Sen: tener recursos para “aparecer en público sin vergüenza”. La posibilidad de participar depende de normas sociales y costos que varían entre sociedades y personas.',
    connection: 'Este ejemplo ayuda a explicar por qué una política uniforme puede reproducir desigualdades. La lectura de Fraser permite añadir que la justicia también exige reconocimiento y participación, no solo repartir recursos.',
    takeaway: 'La equidad requiere mirar las condiciones que permiten —o impiden— transformar recursos en oportunidades reales.',
    discussion: '¿Tratar a todos exactamente igual siempre produce un resultado justo?'
  },
  {
    id: 3,
    title: '¿Dinero hoy o capacidades para mañana?',
    speaker: 'Integrante 3',
    time: '4 minutos',
    scenario: 'Un municipio tiene recursos limitados. Muchas familias necesitan ingresos de inmediato, pero también hay escuelas deterioradas, dificultades de acceso a salud y problemas de nutrición infantil.',
    question: '¿En qué debería concentrar su estrategia?',
    options: [
      { id: 'A', label: 'Priorizar transferencias monetarias inmediatas', consequence: 'Puede aliviar privaciones urgentes y dar autonomía para decidir gastos. Si se convierte en la única estrategia, puede dejar intactas las barreras estructurales de salud y educación.' },
      { id: 'B', label: 'Priorizar educación, salud y nutrición', consequence: 'Fortalece capacidades que amplían oportunidades presentes y futuras. Si ignora la urgencia económica de los hogares, puede no responder a necesidades inmediatas.' },
      { id: 'C', label: 'Articular ingresos y servicios básicos', consequence: 'Busca responder a las urgencias y ampliar capacidades de largo plazo. Requiere planificación, financiación y seguimiento para que las medidas se refuercen entre sí.' }
    ],
    insightTitle: 'Ingreso y capacidades se fortalecen mutuamente',
    explanation: 'La relación entre ingreso y capacidades es bidireccional. Un mayor ingreso puede facilitar alimentación, vivienda y acceso a servicios; a su vez, la salud y la educación amplían las posibilidades de trabajar, participar y generar ingresos. Sen utiliza experiencias como Kerala para mostrar que avances importantes en salud y educación pueden lograrse incluso sin niveles extraordinarios de ingreso o crecimiento económico.',
    teaching: 'No presenten el caso de Kerala como una receta automática ni como prueba de que el ingreso no importa. La idea es que la inversión social y la acción pública pueden mejorar capacidades y que esas capacidades también contribuyen al desarrollo económico.',
    connection: 'Becerril Velasco ayuda a discutir la capacidad del Estado para sostener políticas sociales y evitar que el retiro de la intervención pública debilite la atención de la pobreza.',
    takeaway: 'No es una elección simple entre dinero y servicios: una estrategia consistente considera cómo se complementan.',
    discussion: '¿Qué debería atenderse primero cuando las necesidades inmediatas y las inversiones de largo plazo compiten por el presupuesto?'
  },
  {
    id: 4,
    title: '¿Un subsidio compensa el desempleo?',
    speaker: 'Integrante 4',
    time: '4 minutos',
    scenario: 'Una persona pierde su empleo. Recibe una ayuda monetaria temporal, pero lleva meses sin encontrar trabajo, ha perdido rutinas, contactos, confianza y oportunidades para desarrollar sus habilidades.',
    question: '¿Qué respuesta pública reconoce mejor el problema?',
    options: [
      { id: 'A', label: 'Mantener únicamente la transferencia monetaria', consequence: 'Protege parcialmente el consumo y reduce la pérdida inmediata de ingresos. No necesariamente evita el aislamiento, la pérdida de habilidades o la exclusión de espacios laborales y sociales.' },
      { id: 'B', label: 'Retirar la ayuda y exigir que busque empleo', consequence: 'Puede ignorar que las oportunidades laborales no dependen solo del esfuerzo individual. Retirar el ingreso puede agravar la privación y no crea empleos ni elimina barreras.' },
      { id: 'C', label: 'Combinar protección de ingresos, formación y oportunidades de empleo', consequence: 'Atiende la urgencia económica y puede recuperar habilidades, vínculos y participación. Para funcionar, la formación debe conectarse con oportunidades reales y condiciones laborales dignas.' }
    ],
    insightTitle: 'El desempleo produce privaciones más allá del ingreso',
    explanation: 'En el análisis de Sen, el desempleo puede afectar la autoestima, las relaciones sociales, las habilidades, la salud mental y la posibilidad de participar en la vida comunitaria. Por eso, medir únicamente la pérdida monetaria no alcanza para comprender sus efectos. La protección de ingresos importa, pero también las oportunidades reales de empleo y participación.',
    teaching: 'Eviten afirmar que todas las personas desempleadas viven exactamente los mismos efectos. La tesis es que existen consecuencias no monetarias relevantes que deben entrar en el análisis de la pobreza y la política pública.',
    connection: 'La discusión sobre intervención estatal de Becerril Velasco permite preguntar qué instituciones, políticas laborales y servicios pueden evitar que una crisis de empleo se convierta en exclusión prolongada.',
    takeaway: 'Una política contra la pobreza debe mirar también la autonomía, las relaciones, las habilidades y la participación.',
    discussion: '¿Qué dimensiones del bienestar quedan invisibles cuando solo medimos el ingreso mensual?'
  },
  {
    id: 5,
    title: '¿Una política igual para todos es justa?',
    speaker: 'Integrante 5',
    time: '5 minutos',
    scenario: 'En una región, las mujeres rurales tienen menos acceso a tierra, crédito, atención en salud y espacios de decisión. Además, dentro de algunos hogares los alimentos, el tiempo y los recursos no se distribuyen por igual.',
    question: '¿Qué enfoque responde mejor a estas desigualdades?',
    options: [
      { id: 'A', label: 'Entregar la misma ayuda a cada hogar', consequence: 'Puede ampliar los recursos familiares, pero no garantiza que mujeres y hombres se beneficien por igual ni que cambien las barreras de acceso y decisión.' },
      { id: 'B', label: 'Dirigir recursos a las mujeres sin cambiar las reglas', consequence: 'Puede mejorar el acceso directo a recursos, pero tendrá límites si persisten la falta de reconocimiento, la discriminación, la carga desigual de cuidados o la exclusión de decisiones.' },
      { id: 'C', label: 'Combinar redistribución, reconocimiento y participación', consequence: 'Busca cambiar el acceso a recursos y derechos, cuestionar normas discriminatorias y garantizar voz en las decisiones. Requiere transformaciones institucionales y seguimiento.' }
    ],
    insightTitle: 'La justicia exige recursos, reconocimiento y voz',
    explanation: 'Sen analiza la desigualdad dentro del hogar y la discriminación de género, incluida la idea de las “mujeres desaparecidas”: muertes y desventajas asociadas a la desigualdad en nutrición, salud y trato. Fraser complementa este enfoque: la justicia no se agota en la distribución económica; también requiere reconocimiento y paridad de participación. En su lectura, el género tiene dimensiones económicas y de estatus, por lo que necesita respuestas en ambos planos.',
    teaching: 'Expliquen que una transferencia dirigida a una mujer no basta por sí sola si no puede controlar los recursos o participar en las decisiones. La cifra de más de 100 millones aparece en la discusión histórica de Sen; no debe presentarse como un conteo actual.',
    connection: 'Aquí se cruzan Sen y Fraser: las capacidades dependen de recursos y condiciones materiales, pero también de relaciones de poder, reconocimiento social y posibilidad de intervenir en decisiones colectivas.',
    takeaway: 'No basta con preguntar cuánto se reparte: también hay que preguntar quién recibe, quién decide, quién es reconocido y quién puede participar.',
    discussion: '¿Qué desigualdades pueden permanecer ocultas cuando analizamos únicamente el ingreso promedio de un hogar?'
  },
  {
    id: 6,
    title: 'Reconstruir un territorio después del conflicto',
    speaker: 'Integrante 6',
    time: '5 minutos',
    scenario: 'Una región rural afectada por el conflicto tiene concentración de la tierra, vías precarias, servicios de salud y educación insuficientes, víctimas sin reparación y baja confianza en las instituciones.',
    question: '¿Qué estrategia puede ampliar las capacidades de sus habitantes?',
    options: [
      { id: 'A', label: 'Entregar ayudas de emergencia y retirarse', consequence: 'Puede atender necesidades inmediatas, pero no transforma las condiciones territoriales que reproducen exclusión, ni garantiza reparación, servicios o participación.' },
      { id: 'B', label: 'Construir infraestructura y atraer inversión', consequence: 'Puede mejorar conectividad y actividad económica, pero corre el riesgo de dejar por fuera a víctimas y comunidades si no atiende tierra, derechos, servicios y participación.' },
      { id: 'C', label: 'Articular tierra, servicios, reparación, empleo y participación', consequence: 'Aborda varias dimensiones de la exclusión rural y se acerca a una presencia estatal integral. Exige capacidad institucional, coordinación y participación comunitaria sostenida.' }
    ],
    insightTitle: 'La paz también requiere capacidades y presencia estatal',
    explanation: 'La lectura sobre Colombia y justicia transicional presenta la exclusión rural, la concentración de la tierra y la débil presencia estatal como problemas que el Acuerdo Final busca enfrentar mediante desarrollo rural, restitución y acceso a tierras, reparación a víctimas, servicios de salud, crédito, ingresos y bienestar territorial. Se trata de compromisos y objetivos del acuerdo; no debe confundirse su formulación con resultados plenamente alcanzados.',
    teaching: 'Conecten esta ronda con el argumento de Sen: vivir sin servicios, seguridad, medios de vida y posibilidades de participación limita libertades reales. La lectura de Becerril Velasco permite preguntar si el Estado cuenta con capacidad institucional para ejecutar políticas; el documento sobre Colombia muestra por qué la presencia territorial importa.',
    connection: 'La política contra la pobreza no es solo una transferencia: incluye instituciones, derechos, bienes públicos, reparación y capacidad de las comunidades para decidir sobre su futuro.',
    takeaway: 'Reducir la pobreza en territorios excluidos exige transformar las condiciones que impiden a las personas desarrollar sus capacidades.',
    discussion: '¿Cómo se puede evitar que una política diseñada desde el centro ignore las prioridades de las comunidades?'
  }
];

module.exports = { rounds };
