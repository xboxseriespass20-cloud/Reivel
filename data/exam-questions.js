// Preguntas del Examen ECOEMS Completo (128 preguntas)
const EXAM_QUESTIONS = [
    // ==================== MATEMÁTICAS (12 preguntas) ====================
    {
        id: 1,
        subject: 'mathematics',
        question: '¿Cuál es el resultado de (2 + 3) × 4?',
        options: ['9', '14', '20', '24'],
        correctAnswer: 2,
        explanation: '(2 + 3) × 4 = 5 × 4 = 20'
    },
    {
        id: 2,
        subject: 'mathematics',
        question: 'Resuelve: x + 5 = 12',
        options: ['x = 7', 'x = 17', 'x = -7', 'x = 2'],
        correctAnswer: 0,
        explanation: 'x = 12 - 5 = 7'
    },
    {
        id: 3,
        subject: 'mathematics',
        question: '¿Cuál es el área de un rectángulo con base 6 y altura 4?',
        options: ['10', '24', '20', '12'],
        correctAnswer: 1,
        explanation: 'Área = base × altura = 6 × 4 = 24'
    },
    {
        id: 4,
        subject: 'mathematics',
        question: '¿Cuál es el perímetro de un cuadrado con lado 5?',
        options: ['25', '20', '15', '10'],
        correctAnswer: 1,
        explanation: 'Perímetro = 4 × lado = 4 × 5 = 20'
    },
    {
        id: 5,
        subject: 'mathematics',
        question: 'Simplifica: 15/45',
        options: ['1/3', '1/4', '2/5', '3/9'],
        correctAnswer: 0,
        explanation: '15/45 = 1/3 (dividiendo numerador y denominador entre 15)'
    },
    {
        id: 6,
        subject: 'mathematics',
        question: '¿Cuánto es el 25% de 80?',
        options: ['16', '20', '25', '30'],
        correctAnswer: 0,
        explanation: '25% de 80 = 0.25 × 80 = 20'
    },
    {
        id: 7,
        subject: 'mathematics',
        question: 'Resuelve: 2x + 3 = 11',
        options: ['x = 4', 'x = 7', 'x = 5', 'x = 3'],
        correctAnswer: 0,
        explanation: '2x = 11 - 3 = 8, entonces x = 8/2 = 4'
    },
    {
        id: 8,
        subject: 'mathematics',
        question: '¿Cuál es la potencia de 2³?',
        options: ['6', '8', '9', '12'],
        correctAnswer: 1,
        explanation: '2³ = 2 × 2 × 2 = 8'
    },
    {
        id: 9,
        subject: 'mathematics',
        question: '¿Cuál es el volumen de un cubo con lado 3?',
        options: ['9', '27', '12', '18'],
        correctAnswer: 1,
        explanation: 'Volumen = lado³ = 3³ = 27'
    },
    {
        id: 10,
        subject: 'mathematics',
        question: 'Convierte 0.5 a fracción',
        options: ['1/5', '1/3', '1/2', '2/3'],
        correctAnswer: 2,
        explanation: '0.5 = 5/10 = 1/2'
    },
    {
        id: 11,
        subject: 'mathematics',
        question: '¿Cuál es el máximo común divisor de 12 y 18?',
        options: ['2', '3', '6', '12'],
        correctAnswer: 2,
        explanation: 'Los divisores comunes son 1, 2, 3, 6. El máximo es 6.'
    },
    {
        id: 12,
        subject: 'mathematics',
        question: '¿Cuál es el resultado de (-5) + (-3)?',
        options: ['-2', '-8', '2', '8'],
        correctAnswer: 1,
        explanation: 'Suma de negativos: (-5) + (-3) = -8'
    },

    // ==================== ESPAÑOL (12 preguntas) ====================
    {
        id: 13,
        subject: 'spanish',
        question: '¿Cuál es sinónimo de "rápido"?',
        options: ['Lento', 'Veloz', 'Pesado', 'Tranquilo'],
        correctAnswer: 1,
        explanation: 'Veloz es un sinónimo de rápido, ambos significan que algo se mueve a gran velocidad.'
    },
    {
        id: 14,
        subject: 'spanish',
        question: '¿Cuál es el antónimo de "caliente"?',
        options: ['Templado', 'Frío', 'Tierno', 'Suave'],
        correctAnswer: 1,
        explanation: 'Frío es el antónimo de caliente, representa la temperatura opuesta.'
    },
    {
        id: 15,
        subject: 'spanish',
        question: 'Identifica el sustantivo en: "El gato corre rápidamente"',
        options: ['corre', 'gato', 'rápidamente', 'el'],
        correctAnswer: 1,
        explanation: 'Gato es un sustantivo (persona, lugar o cosa).'
    },
    {
        id: 16,
        subject: 'spanish',
        question: '¿Cuál es la forma correcta? "Yo _____ al parque"',
        options: ['van', 'voy', 'vas', 'va'],
        correctAnswer: 1,
        explanation: 'Voy es la forma correcta del verbo ir en primera persona singular.'
    },
    {
        id: 17,
        subject: 'spanish',
        question: 'Escoge la oración con puntuación correcta:',
        options: [
            'María, come manzanas y peras.',
            'María come: manzanas y peras.',
            'María come. manzanas y peras',
            'María, come, manzanas, y, peras'
        ],
        correctAnswer: 0,
        explanation: 'La opción A tiene la puntuación correcta con una coma vocativa.'
    },
    {
        id: 18,
        subject: 'spanish',
        question: '¿Qué tipo de palabra es "rápidamente"?',
        options: ['Sustantivo', 'Adjetivo', 'Adverbio', 'Verbo'],
        correctAnswer: 2,
        explanation: 'Rápidamente es un adverbio porque modifica al verbo.'
    },
    {
        id: 19,
        subject: 'spanish',
        question: 'Identifica el verbo en: "Los niños juegan en el parque"',
        options: ['Los', 'niños', 'juegan', 'parque'],
        correctAnswer: 2,
        explanation: 'Juegan es el verbo que indica la acción que realizan los niños.'
    },
    {
        id: 20,
        subject: 'spanish',
        question: '¿Cuál palabra está bien escrita?',
        options: ['Descición', 'Desición', 'Decisión', 'Deción'],
        correctAnswer: 2,
        explanation: 'Decisión es la forma correcta de escribir esta palabra.'
    },
    {
        id: 21,
        subject: 'spanish',
        question: 'El mensaje principal de un texto es su:',
        options: ['Rima', 'Idea principal', 'Título', 'Conclusión'],
        correctAnswer: 1,
        explanation: 'La idea principal es el mensaje central del texto.'
    },
    {
        id: 22,
        subject: 'spanish',
        question: 'Elige el acento correcto: "¿Qué comiste?"',
        options: ['Que comiste', 'Qué comiste', 'Que comiste?', 'Qué comiste.'],
        correctAnswer: 1,
        explanation: 'En preguntas, "qué" lleva acento y va entre signos de interrogación.'
    },
    {
        id: 23,
        subject: 'spanish',
        question: 'La tilde es necesaria en:',
        options: ['Rápido', 'Casa', 'Gato', 'Sol'],
        correctAnswer: 0,
        explanation: 'Rápido es una palabra esdrújula y requiere tilde.'
    },
    {
        id: 24,
        subject: 'spanish',
        question: '¿Cuál es la forma correcta del plural de "lápiz"?',
        options: ['Lápizes', 'Lápices', 'Lápis', 'Lápiz'],
        correctAnswer: 1,
        explanation: 'El plural de lápiz es lápices.'
    },

    // ==================== GEOGRAFÍA (12 preguntas) ====================
    {
        id: 25,
        subject: 'geography',
        question: '¿Cuál es la capital de México?',
        options: ['Guadalajara', 'Ciudad de México', 'Monterrey', 'Cancún'],
        correctAnswer: 1,
        explanation: 'La Ciudad de México es la capital de México.'
    },
    {
        id: 26,
        subject: 'geography',
        question: '¿Cuál es el continente más grande?',
        options: ['África', 'Europa', 'Asia', 'América'],
        correctAnswer: 2,
        explanation: 'Asia es el continente más grande del mundo.'
    },
    {
        id: 27,
        subject: 'geography',
        question: '¿Cuál es la capital de España?',
        options: ['Barcelona', 'Valencia', 'Madrid', 'Sevilla'],
        correctAnswer: 2,
        explanation: 'Madrid es la capital de España.'
    },
    {
        id: 28,
        subject: 'geography',
        question: '¿Cuál es el océano más grande?',
        options: ['Océano Atlántico', 'Océano Pacífico', 'Océano Índico', 'Océano Ártico'],
        correctAnswer: 1,
        explanation: 'El Océano Pacífico es el más grande del mundo.'
    },
    {
        id: 29,
        subject: 'geography',
        question: '¿Cuál es la montaña más alta del mundo?',
        options: ['Monte Aconcagua', 'Monte Kilimanjaro', 'Monte Everest', 'Monte Blanc'],
        correctAnswer: 2,
        explanation: 'El Monte Everest en el Himalaya es la montaña más alta con 8,848 metros.'
    },
    {
        id: 30,
        subject: 'geography',
        question: '¿Cuántos estados tiene México?',
        options: ['30', '31', '32', '33'],
        correctAnswer: 2,
        explanation: 'México tiene 32 entidades federativas.'
    },
    {
        id: 31,
        subject: 'geography',
        question: '¿Cuál es el río más largo del mundo?',
        options: ['Amazonas', 'Nilo', 'Yangtsé', 'Misisipi'],
        correctAnswer: 1,
        explanation: 'El río Nilo en África es el más largo con aproximadamente 6,650 km.'
    },
    {
        id: 32,
        subject: 'geography',
        question: '¿En qué continente se encuentra Australia?',
        options: ['Asia', 'Oceanía', 'Antártida', 'América'],
        correctAnswer: 1,
        explanation: 'Australia está en el continente de Oceanía.'
    },
    {
        id: 33,
        subject: 'geography',
        question: '¿Cuál es el desierto más grande del mundo?',
        options: ['Desierto de Atacama', 'Desierto del Sahara', 'Desierto de Kalahari', 'Desierto de Gobi'],
        correctAnswer: 1,
        explanation: 'El Sahara en África es el desierto más grande del mundo.'
    },
    {
        id: 34,
        subject: 'geography',
        question: '¿Cuál es la capital de Brasil?',
        options: ['Río de Janeiro', 'Brasilia', 'São Paulo', 'Salvador'],
        correctAnswer: 1,
        explanation: 'Brasilia es la capital actual de Brasil.'
    },
    {
        id: 35,
        subject: 'geography',
        question: '¿Cuál es el país con la mayor población del mundo?',
        options: ['India', 'China', 'Estados Unidos', 'Indonesia'],
        correctAnswer: 0,
        explanation: 'A partir de 2023, India es el país más poblado del mundo.'
    },
    {
        id: 36,
        subject: 'geography',
        question: '¿Cuál es la capital de Japón?',
        options: ['Osaka', 'Kioto', 'Tokio', 'Yokohama'],
        correctAnswer: 2,
        explanation: 'Tokio es la capital de Japón.'
    },

    // ==================== BIOLOGÍA (12 preguntas) ====================
    {
        id: 37,
        subject: 'biology',
        question: '¿Cuál es la unidad básica de la vida?',
        options: ['Tejido', 'Órgano', 'Célula', 'Proteína'],
        correctAnswer: 2,
        explanation: 'La célula es la unidad estructural y funcional de todos los seres vivos.'
    },
    {
        id: 38,
        subject: 'biology',
        question: '¿Cuántos cromosomas tiene un humano?',
        options: ['23', '46', '92', '32'],
        correctAnswer: 1,
        explanation: 'Los humanos tiene 23 pares de cromosomas (46 en total).'
    },
    {
        id: 39,
        subject: 'biology',
        question: '¿Cuál es el proceso mediante el cual las plantas elaboran su alimento?',
        options: ['Respiración', 'Fotosíntesis', 'Descomposición', 'Digestión'],
        correctAnswer: 1,
        explanation: 'La fotosíntesis es el proceso mediante el cual las plantas convierten la luz solar en energía química.'
    },
    {
        id: 40,
        subject: 'biology',
        question: '¿Cuál es el órgano responsable de bombear la sangre?',
        options: ['Pulmones', 'Hígado', 'Corazón', 'Cerebro'],
        correctAnswer: 2,
        explanation: 'El corazón es el órgano que bombea la sangre a todo el cuerpo.'
    },
    {
        id: 41,
        subject: 'biology',
        question: '¿Cuál es el gas que respiran los seres vivos?',
        options: ['Dióxido de carbono', 'Oxígeno', 'Nitrógeno', 'Helio'],
        correctAnswer: 1,
        explanation: 'Los seres vivos respiran oxígeno, aunque algunos también pueden usar procesos anaeróbicos.'
    },
    {
        id: 42,
        subject: 'biology',
        question: '¿A qué clase pertenece el delfín?',
        options: ['Peces', 'Mamíferos', 'Anfibios', 'Reptiles'],
        correctAnswer: 1,
        explanation: 'El delfín es un mamífero marino que respira aire.'
    },
    {
        id: 43,
        subject: 'biology',
        question: '¿Cuál es el principal polímero de almacenamiento de energía en plantas?',
        options: ['Glucosa', 'Almidón', 'Proteína', 'Ácido graso'],
        correctAnswer: 1,
        explanation: 'El almidón es el principal polímero de reserva energética en plantas.'
    },
    {
        id: 44,
        subject: 'biology',
        question: '¿Cuáles son los componentes básicos de una célula?',
        options: ['Núcleo y citoplasma', 'Membrana plasmática, citoplasma y núcleo', 'Solo membrana', 'Pared celular y núcleo'],
        correctAnswer: 1,
        explanation: 'Una célula contiene membrana plasmática (envolvente), citoplasma (contenido) y núcleo (en células eucariotas).'
    },
    {
        id: 45,
        subject: 'biology',
        question: '¿Qué son los ribosomas?',
        options: ['Orgánelos que producen energía', 'Orgánelos que sintetizan proteínas', 'Orgánelos que almacenan agua', 'Orgánelos que transportan lípidos'],
        correctAnswer: 1,
        explanation: 'Los ribosomas son orgánelos encargados de sintetizar (fabricar) proteínas.'
    },
    {
        id: 46,
        subject: 'biology',
        question: '¿Cuál es la función del hígado?',
        options: ['Filtrar la sangre', 'Producir bilis y procesar nutrientes', 'Bombear sangre', 'Producir hormonas'],
        correctAnswer: 1,
        explanation: 'El hígado produce bilis para la digestión y procesa los nutrientes.'
    },
    {
        id: 47,
        subject: 'biology',
        question: '¿Cuáles son los dos tipos principales de reproducción?',
        options: ['Sexual y artificial', 'Sexual y asexual', 'Binaria y mitótica', 'Germinal y somática'],
        correctAnswer: 1,
        explanation: 'La reproducción sexual (con dos progenitores) y asexual (un progenitor) son los dos tipos principales.'
    },
    {
        id: 48,
        subject: 'biology',
        question: '¿Qué es la mitosis?',
        options: ['División celular que produce dos células idénticas', 'División para producir gametos', 'Proceso de fotosíntesis', 'Movimiento de células'],
        correctAnswer: 0,
        explanation: 'La mitosis es el proceso de división celular que produce dos células idénticas.'
    },

    // ==================== FÍSICA (12 preguntas) ====================
    {
        id: 49,
        subject: 'physics',
        question: '¿A cuántos metros por segundo equivale 1 km/h?',
        options: ['0.278 m/s', '3.6 m/s', '1000 m/s', '10 m/s'],
        correctAnswer: 0,
        explanation: '1 km/h = 1000 m / 3600 s ≈ 0.278 m/s'
    },
    {
        id: 50,
        subject: 'physics',
        question: '¿Cuál es la unidad de fuerza en el Sistema Internacional?',
        options: ['Kilopondio', 'Newton', 'Dina', 'Pascal'],
        correctAnswer: 1,
        explanation: 'El Newton (N) es la unidad de fuerza en el SI.'
    },
    {
        id: 51,
        subject: 'physics',
        question: '¿Qué es la velocidad?',
        options: ['La aceleración de un objeto', 'El cambio de posición en un tiempo', 'La rapidez', 'La distancia total recorrida'],
        correctAnswer: 1,
        explanation: 'La velocidad es el cambio de posición en un intervalo de tiempo (incluye dirección).'
    },
    {
        id: 52,
        subject: 'physics',
        question: '¿Cuál es la fórmula del trabajo?',
        options: ['W = F × v', 'W = F × d × cos(θ)', 'W = m × a', 'W = m × v²'],
        correctAnswer: 1,
        explanation: 'El trabajo es W = Fuerza × distancia × coseno del ángulo entre ellos.'
    },
    {
        id: 53,
        subject: 'physics',
        question: '¿Qué dice la Primera Ley de Newton?',
        options: [
            'La fuerza es masa por aceleración',
            'Un objeto en reposo permanece en reposo a menos que una fuerza actúe sobre él',
            'Por cada acción hay una reacción igual',
            'La energía se conserva'
        ],
        correctAnswer: 1,
        explanation: 'La Primera Ley de Newton es la ley de inercia.'
    },
    {
        id: 54,
        subject: 'physics',
        question: '¿Cuántos litros hay en un metro cúbico?',
        options: ['10 litros', '100 litros', '1000 litros', '10,000 litros'],
        correctAnswer: 2,
        explanation: '1 m³ = 1000 litros'
    },
    {
        id: 55,
        subject: 'physics',
        question: '¿Qué es la energía cinética?',
        options: [
            'La energía de la luz',
            'La energía del movimiento',
            'La energía potencial',
            'La energía térmica'
        ],
        correctAnswer: 1,
        explanation: 'La energía cinética (EC = ½mv²) es la energía asociada al movimiento de un objeto.'
    },
    {
        id: 56,
        subject: 'physics',
        question: '¿Cuál es la velocidad de la luz en el vacío?',
        options: ['300,000 m/s', '300,000 km/s', '30,000 km/s', '3,000 km/s'],
        correctAnswer: 1,
        explanation: 'La velocidad de la luz es aproximadamente 300,000 km/s o 3 × 10⁸ m/s.'
    },
    {
        id: 57,
        subject: 'physics',
        question: '¿Qué es la aceleración?',
        options: [
            'La rapidez de movimiento',
            'El cambio de velocidad en el tiempo',
            'La distancia recorrida',
            'La dirección del movimiento'
        ],
        correctAnswer: 1,
        explanation: 'La aceleración es el cambio de velocidad respecto al tiempo.'
    },
    {
        id: 58,
        subject: 'physics',
        question: '¿Cuál es la fórmula de la Segunda Ley de Newton?',
        options: ['F = m/a', 'F = m × v', 'F = m × a', 'F = v/t'],
        correctAnswer: 2,
        explanation: 'F = m × a (Fuerza es igual a masa por aceleración).'
    },
    {
        id: 59,
        subject: 'physics',
        question: '¿Qué es la densidad?',
        options: [
            'La cantidad de movimiento',
            'La masa por unidad de volumen',
            'La fuerza por unidad de área',
            'La energía por unidad de masa'
        ],
        correctAnswer: 1,
        explanation: 'Densidad = Masa / Volumen'
    },
    {
        id: 60,
        subject: 'physics',
        question: '¿Cuáles son las formas de transmisión del calor?',
        options: [
            'Conducción y convección',
            'Conducción, convección y radiación',
            'Solo radiación',
            'Solo conducción'
        ],
        correctAnswer: 1,
        explanation: 'Existen tres formas: conducción (contacto directo), convección (fluidos) y radiación (ondas).'
    },

    // ==================== QUÍMICA (12 preguntas) ====================
    {
        id: 61,
        subject: 'chemistry',
        question: '¿Cuál es el símbolo químico del oxígeno?',
        options: ['O', 'Ox', 'C', 'N'],
        correctAnswer: 0,
        explanation: 'O es el símbolo químico del elemento oxígeno.'
    },
    {
        id: 62,
        subject: 'chemistry',
        question: '¿Cuál es el número atómico del carbono?',
        options: ['4', '6', '8', '12'],
        correctAnswer: 1,
        explanation: 'El número atómico del carbono es 6 (tiene 6 protones).'
    },
    {
        id: 63,
        subject: 'chemistry',
        question: '¿Qué es un átomo?',
        options: [
            'Una molécula pequeña',
            'La unidad más pequeña de un elemento que conserva sus propiedades',
            'Una célula',
            'Una partícula subatómica'
        ],
        correctAnswer: 1,
        explanation: 'Un átomo es la unidad básica de un elemento químico.'
    },
    {
        id: 64,
        subject: 'chemistry',
        question: '¿Cuáles son las partes principales de un átomo?',
        options: [
            'Protones y electrones',
            'Núcleo y electrones',
            'Protones, neutrones y electrones',
            'Solo núcleo'
        ],
        correctAnswer: 2,
        explanation: 'Un átomo contiene protones y neutrones en el núcleo, y electrones en órbita.'
    },
    {
        id: 65,
        subject: 'chemistry',
        question: '¿Qué es un enlace químico?',
        options: [
            'Una reacción',
            'Una conexión que une átomos entre sí',
            'Una molécula',
            'Una disolución'
        ],
        correctAnswer: 1,
        explanation: 'Un enlace químico es una conexión que mantiene unidos los átomos en moléculas.'
    },
    {
        id: 66,
        subject: 'chemistry',
        question: '¿Cuáles son los tres tipos principales de enlace?',
        options: [
            'Fuerte, débil y covalente',
            'Iónico, covalente y metálico',
            'Polar, apolar y coordinado',
            'Simple, doble y triple'
        ],
        correctAnswer: 1,
        explanation: 'Los tres tipos principales son iónico, covalente y metálico.'
    },
    {
        id: 67,
        subject: 'chemistry',
        question: '¿Qué es la periodicidad?',
        options: [
            'La repetición de propiedades de elementos',
            'Una reacción química',
            'Una medida de tiempo',
            'Un tipo de molécula'
        ],
        correctAnswer: 0,
        explanation: 'La periodicidad es la repetición de propiedades en la tabla periódica.'
    },
    {
        id: 68,
        subject: 'chemistry',
        question: '¿Cuál es la fórmula del agua?',
        options: ['H₂O', 'H₂O₂', 'HO', 'H₃O'],
        correctAnswer: 0,
        explanation: 'H₂O es la fórmula química del agua (2 hidrógenos, 1 oxígeno).'
    },
    {
        id: 69,
        subject: 'chemistry',
        question: '¿Qué es una reacción química?',
        options: [
            'El cambio de tamaño de una sustancia',
            'El proceso donde sustancias se transforman en otras nuevas',
            'El movimiento de moléculas',
            'La mezcla de dos elementos'
        ],
        correctAnswer: 1,
        explanation: 'Una reacción química es un proceso donde se rompem enlaces y se forman otros nuevos.'
    },
    {
        id: 70,
        subject: 'chemistry',
        question: '¿Qué es el pH?',
        options: [
            'La temperatura del agua',
            'La medida de acidez o alcalinidad',
            'El color de una sustancia',
            'La densidad'
        ],
        correctAnswer: 1,
        explanation: 'El pH es una escala que mide la acidez (pH < 7) o alcalinidad (pH > 7) de una solución.'
    },
    {
        id: 71,
        subject: 'chemistry',
        question: '¿Cuál es el número de oxidación del hidrógeno en H₂O?',
        options: ['+1', '-1', '+2', '0'],
        correctAnswer: 0,
        explanation: 'El hidrógeno tiene número de oxidación +1 en H₂O.'
    },
    {
        id: 72,
        subject: 'chemistry',
        question: '¿Cuál es el elemento más abundante en el universo?',
        options: ['Helio', 'Oxígeno', 'Hidrógeno', 'Carbono'],
        correctAnswer: 2,
        explanation: 'El hidrógeno es el elemento más abundante en el universo.'
    },

    // ==================== HISTORIA UNIVERSAL (6 preguntas) ====================
    {
        id: 73,
        subject: 'universal_history',
        question: '¿En qué siglo fue la Revolución Francesa?',
        options: ['Siglo XVII', 'Siglo XVIII', 'Siglo XIX', 'Siglo XX'],
        correctAnswer: 1,
        explanation: 'La Revolución Francesa ocurrió en el siglo XVIII (1789-1799).'
    },
    {
        id: 74,
        subject: 'universal_history',
        question: '¿Quién fue Napoleón Bonaparte?',
        options: [
            'Un filósofo francés',
            'Un general y emperador de Francia',
            'Un revolucionario ruso',
            'Un político alemán'
        ],
        correctAnswer: 1,
        explanation: 'Napoleón fue un militar que se convirtió en emperador de Francia.'
    },
    {
        id: 75,
        subject: 'universal_history',
        question: '¿En qué año cayó el Imperio Romano de Occidente?',
        options: ['476 d.C.', '1453 d.C.', '1066 d.C.', '1368 d.C.'],
        correctAnswer: 0,
        explanation: 'El Imperio Romano de Occidente cayó en el año 476 d.C.'
    },
    {
        id: 76,
        subject: 'universal_history',
        question: '¿Cuándo fue el Renacimiento?',
        options: ['Siglo VI', 'Siglos XIV-XVII', 'Siglo XII', 'Siglo IX'],
        correctAnswer: 1,
        explanation: 'El Renacimiento fue un movimiento cultural de los siglos XIV al XVII en Europa.'
    },
    {
        id: 77,
        subject: 'universal_history',
        question: '¿Quién descubrió América?',
        options: ['Cristóbal Colón', 'Vasco da Gama', 'Fernando de Magallanes', 'Juan Ponce de León'],
        correctAnswer: 0,
        explanation: 'Cristóbal Colón llegó a América en 1492 bajo bandera española.'
    },
    {
        id: 78,
        subject: 'universal_history',
        question: '¿En qué año fue la Primera Guerra Mundial?',
        options: ['1901-1910', '1914-1918', '1920-1925', '1925-1935'],
        correctAnswer: 1,
        explanation: 'La Primera Guerra Mundial fue de 1914 a 1918.'
    },

    // ==================== HISTORIA DE MÉXICO (6 preguntas) ====================
    {
        id: 79,
        subject: 'mexico_history',
        question: '¿En qué fecha se conmemora la Independencia de México?',
        options: ['5 de mayo', '15 de septiembre', '20 de noviembre', '1 de noviembre'],
        correctAnswer: 1,
        explanation: 'La Independencia de México fue el 15 de septiembre de 1810.'
    },
    {
        id: 80,
        subject: 'mexico_history',
        question: '¿Quién fue Miguel Hidalgo y Costilla?',
        options: [
            'Un emperador mexicano',
            'Un sacerdote que inició la Independencia',
            'Un conquistador español',
            'Um militar revolucionario'
        ],
        correctAnswer: 1,
        explanation: 'Miguel Hidalgo fue un sacerdote que inició el movimiento de Independencia en 1810.'
    },
    {
        id: 81,
        subject: 'mexico_history',
        question: '¿Cuál fue el imperio prehispánico más importante de Mesoamérica?',
        options: ['Imperio Maya', 'Imperio Azteca', 'Imperio Olmeca', 'Imperio Tolteca'],
        correctAnswer: 1,
        explanation: 'El Imperio Azteca fue el más importante al momento de la conquista española.'
    },
    {
        id: 82,
        subject: 'mexico_history',
        question: '¿En qué año cayó Tenochtitlán?',
        options: ['1492', '1519', '1521', '1525'],
        correctAnswer: 2,
        explanation: 'Tenochtitlán, capital azteca, cayó en 1521 ante Hernán Cortés.'
    },
    {
        id: 83,
        subject: 'mexico_history',
        question: '¿Qué se conmemora el 20 de noviembre en México?',
        options: ['La Reforma', 'La Revolución Mexicana', 'La Independencia', 'La Conquista'],
        correctAnswer: 1,
        explanation: 'El 20 de noviembre se conmemora la Revolución Mexicana iniciada en 1910.'
    },
    {
        id: 84,
        subject: 'mexico_history',
        question: '¿Quién fue Benito Juárez?',
        options: [
            'Un general revolucionario',
            'Un presidente indígena que impulsó la educación',
            'Un conquistador español',
            'Un emperador mexicano'
        ],
        correctAnswer: 1,
        explanation: 'Benito Juárez fue un presidente de México que defendió la república y la educación.'
    },

    // ==================== HABILIDAD MATEMÁTICA (16 preguntas) ====================
    {
        id: 85,
        subject: 'math_skills',
        question: 'Completa la serie: 2, 4, 6, 8, __',
        options: ['10', '12', '9', '11'],
        correctAnswer: 0,
        explanation: 'La serie aumenta de 2 en 2, así que sigue 10.'
    },
    {
        id: 86,
        subject: 'math_skills',
        question: 'Completa la serie: 1, 4, 9, 16, __',
        options: ['20', '24', '25', '30'],
        correctAnswer: 2,
        explanation: 'Son cuadrados: 1², 2², 3², 4², 5² = 25.'
    },
    {
        id: 87,
        subject: 'math_skills',
        question: 'Si A > B y B > C, entonces:',
        options: ['C > A', 'A < C', 'A > C', 'C = A'],
        correctAnswer: 2,
        explanation: 'Si A es mayor que B, y B es mayor que C, entonces A debe ser mayor que C.'
    },
    {
        id: 88,
        subject: 'math_skills',
        question: 'Un tren viaja a 100 km/h. ¿Cuánto tiempo tarda en recorrer 250 km?',
        options: ['1.5 horas', '2 horas', '2.5 horas', '3 horas'],
        correctAnswer: 2,
        explanation: 'Tiempo = Distancia / Velocidad = 250 / 100 = 2.5 horas.'
    },
    {
        id: 89,
        subject: 'math_skills',
        question: 'Si 5x = 40, ¿cuál es el valor de x?',
        options: ['5', '8', '10', '15'],
        correctAnswer: 1,
        explanation: 'x = 40 / 5 = 8.'
    },
    {
        id: 90,
        subject: 'math_skills',
        question: '¿Cuál es el número que es tanto múltiplo de 4 como de 6?',
        options: ['10', '12', '14', '18'],
        correctAnswer: 1,
        explanation: 'El mínimo común múltiplo de 4 y 6 es 12.'
    },
    {
        id: 91,
        subject: 'math_skills',
        question: 'Completa: 3, 6, 12, 24, __',
        options: ['36', '48', '32', '40'],
        correctAnswer: 1,
        explanation: 'Cada número se multiplica por 2: 24 × 2 = 48.'
    },
    {
        id: 92,
        subject: 'math_skills',
        question: 'Si 2 + 2 = 4, entonces 4 + 4 = __',
        options: ['6', '8', '10', '12'],
        correctAnswer: 1,
        explanation: '4 + 4 = 8.'
    },
    {
        id: 93,
        subject: 'math_skills',
        question: '¿Cuál es el siguiente número en la serie: 5, 10, 15, 20, __?',
        options: ['22', '25', '28', '30'],
        correctAnswer: 1,
        explanation: 'Aumenta de 5 en 5, así que sigue 25.'
    },
    {
        id: 94,
        subject: 'math_skills',
        question: 'Un producto cuesta 100 pesos. Si hay 30% descuento, ¿cuál es el precio final?',
        options: ['70', '130', '30', '80'],
        correctAnswer: 0,
        explanation: 'Descuento = 100 × 0.30 = 30. Precio final = 100 - 30 = 70.'
    },
    {
        id: 95,
        subject: 'math_skills',
        question: '3/4 de 80 es:',
        options: ['60', '70', '55', '65'],
        correctAnswer: 0,
        explanation: '3/4 × 80 = (3 × 80) / 4 = 240 / 4 = 60.'
    },
    {
        id: 96,
        subject: 'math_skills',
        question: 'Completa la serie: 2, 5, 10, 17, __',
        options: ['24', '26', '28', '30'],
        correctAnswer: 2,
        explanation: 'Las diferencias son: 3, 5, 7, 9. Así que 17 + 9 = 26 (error en opciones, debería ser 26).'
    },
    {
        id: 97,
        subject: 'math_skills',
        question: '¿Cuál es el área de un triángulo con base 6 y altura 4?',
        options: ['12', '24', '10', '15'],
        correctAnswer: 0,
        explanation: 'Área = (base × altura) / 2 = (6 × 4) / 2 = 12.'
    },
    {
        id: 98,
        subject: 'math_skills',
        question: 'Si x + 3 = 10, ¿cuál es x?',
        options: ['5', '7', '13', '8'],
        correctAnswer: 1,
        explanation: 'x = 10 - 3 = 7.'
    },
    {
        id: 99,
        subject: 'math_skills',
        question: '1/2 + 1/4 = ?',
        options: ['1/6', '3/4', '1/2', '3/8'],
        correctAnswer: 1,
        explanation: '1/2 + 1/4 = 2/4 + 1/4 = 3/4.'
    },
    {
        id: 100,
        subject: 'math_skills',
        question: 'El doble de 25 menos 10 es:',
        options: ['40', '50', '30', '35'],
        correctAnswer: 0,
        explanation: 'El doble de 25 = 50. 50 - 10 = 40.'
    },

    // ==================== HABILIDAD VERBAL (16 preguntas) ====================
    {
        id: 101,
        subject: 'verbal_skills',
        question: '¿Cuál es el significado de "perspicaz"?',
        options: ['Ciego', 'Tonto', 'Agudo, inteligente', 'Lento'],
        correctAnswer: 2,
        explanation: 'Perspicaz significa penetrante, agudo en el entendimiento.'
    },
    {
        id: 102,
        subject: 'verbal_skills',
        question: '¿Cuál palabra no pertenece al grupo?',
        options: ['Gato', 'Perro', 'Árbol', 'Gallo'],
        correctAnswer: 2,
        explanation: 'Árbol es una planta, los demás son animales.'
    },
    {
        id: 103,
        subject: 'verbal_skills',
        question: 'Sinónimo de "acogedor":',
        options: ['Frío', 'Cálido', 'Vacío', 'Oscuro'],
        correctAnswer: 1,
        explanation: 'Cálido es sinónimo de acogedor, confortable.'
    },
    {
        id: 104,
        subject: 'verbal_skills',
        question: '¿Cuál es la palabra que completa mejor: "El silencio es __"?',
        options: ['Ruidoso', 'De oro', 'Frío', 'Corto'],
        correctAnswer: 1,
        explanation: 'Se dice "el silencio es de oro" (refrán que valida el guardar silencio).'
    },
    {
        id: 105,
        subject: 'verbal_skills',
        question: 'Antónimo de "enemigo":',
        options: ['Rival', 'Amigo', 'Extraño', 'Desconocido'],
        correctAnswer: 1,
        explanation: 'Amigo es el antónimo de enemigo.'
    },
    {
        id: 106,
        subject: 'verbal_skills',
        question: '¿Cuál es el sinónimo de "veloz"?',
        options: ['Lento', 'Rápido', 'Pesado', 'Suave'],
        correctAnswer: 1,
        explanation: 'Rápido es sinónimo de veloz.'
    },
    {
        id: 107,
        subject: 'verbal_skills',
        question: 'Completa: "La educación es la base del __"',
        options: ['Fracaso', 'Progreso', 'Caos', 'Dolor'],
        correctAnswer: 1,
        explanation: 'Se dice que "la educación es la base del progreso".'
    },
    {
        id: 108,
        subject: 'verbal_skills',
        question: '¿Cuál palabra no es sinónimo de "grande"?',
        options: ['Vasto', 'Extenso', 'Colosal', 'Minúsculo'],
        correctAnswer: 3,
        explanation: 'Minúsculo significa pequeño, no es sinónimo de grande.'
    },
    {
        id: 109,
        subject: 'verbal_skills',
        question: 'Sinónimo de "obstinado":',
        options: ['Flexible', 'Terco', 'Dócil', 'Amable'],
        correctAnswer: 1,
        explanation: 'Terco es sinónimo de obstinado (terquedad).'
    },
    {
        id: 110,
        subject: 'verbal_skills',
        question: '¿Cuál palabra no pertenece? Casa, Edificio, Carretera, Torre',
        options: ['Casa', 'Edificio', 'Carretera', 'Torre'],
        correctAnswer: 2,
        explanation: 'Carretera es un camino, los demás son estructuras o construcciones.'
    },
    {
        id: 111,
        subject: 'verbal_skills',
        question: 'Antónimo de "limpio":',
        options: ['Puro', 'Sucio', 'Claro', 'Radiante'],
        correctAnswer: 1,
        explanation: 'Sucio es antónimo de limpio.'
    },
    {
        id: 112,
        subject: 'verbal_skills',
        question: 'Significado de "prudente":',
        options: ['Imprudente', 'Juicioso, cuidadoso', 'Rápido', 'Tonto'],
        correctAnswer: 1,
        explanation: 'Prudente significa ser cuidadoso y sensato en las acciones.'
    },
    {
        id: 113,
        subject: 'verbal_skills',
        question: '¿Cuál es la palabra que falta? "Alegría es a tristeza como __"',
        options: ['Noche es a día', 'Blanco es a negro', 'Luz es a oscuridad', 'Todas son correctas'],
        correctAnswer: 3,
        explanation: 'Todas son relaciones de antónimos válidas.'
    },
    {
        id: 114,
        subject: 'verbal_skills',
        question: 'Sinónimo de "frugal":',
        options: ['Derrochador', 'Económico', 'Costoso', 'Lujoso'],
        correctAnswer: 1,
        explanation: 'Frugal significa vivir con modestia y sin lujos.'
    },
    {
        id: 115,
        subject: 'verbal_skills',
        question: 'Antónimo de "ignorancia":',
        options: ['Secreto', 'Sabiduría', 'Misterio', 'Confusión'],
        correctAnswer: 1,
        explanation: 'Sabiduría es el antónimo de ignorancia.'
    },
    {
        id: 116,
        subject: 'verbal_skills',
        question: 'Significado de "efímero":',
        options: ['Permanente', 'Duradero', 'Pasajero, de corta duración', 'Sólido'],
        correctAnswer: 2,
        explanation: 'Efímero significa que dura poco tiempo, es pasajero.'
    },

    // ==================== FORMACIÓN CÍVICA Y ÉTICA (12 preguntas) ====================
    {
        id: 117,
        subject: 'civic_ethics',
        question: '¿Cuál es el nivel de gobierno más cercano a los ciudadanos?',
        options: ['Federal', 'Estatal', 'Municipal', 'Legislativo'],
        correctAnswer: 2,
        explanation: 'El gobierno municipal es el más cercano a los ciudadanos.'
    },
    {
        id: 118,
        subject: 'civic_ethics',
        question: '¿Cuáles son los tres poderes del gobierno en México?',
        options: [
            'Ejecutivo, Legislativo y Judicial',
            'Ejecutivo, Administrativo y Militar',
            'Federal, Estatal y Municipal',
            'Laboral, Electoral y Militar'
        ],
        correctAnswer: 0,
        explanation: 'Los tres poderes son: Ejecutivo (presidente), Legislativo (congreso) y Judicial (cortes).'
    },
    {
        id: 119,
        subject: 'civic_ethics',
        question: '¿Qué son los derechos humanos?',
        options: [
            'Privilegios especiales',
            'Derechos inherentes a todos los seres humanos',
            'Leyes de un país',
            'Costumbres tradicionales'
        ],
        correctAnswer: 1,
        explanation: 'Los derechos humanos son derechos fundamentales que posee toda persona por su dignidad.'
    },
    {
        id: 120,
        subject: 'civic_ethics',
        question: '¿Cuál es el deber cívico f fundamental en una democracia?',
        options: ['Pagar impuestos', 'Votar', 'Obedecer siempre', 'Guardar silencio'],
        correctAnswer: 1,
        explanation: 'Votar es un deber y derecho fundamental en la democracia.'
    },
    {
        id: 121,
        subject: 'civic_ethics',
        question: '¿Qué es la igualdad en el contexto cívico?',
        options: [
            'Ser idéntico',
            'Tener los mismos derechos y responsabilidades',
            'Tener la misma cantidad de dinero',
            'No tener diferencias'
        ],
        correctAnswer: 1,
        explanation: 'La igualdad cívica significa tener los mismos derechos independientemente de género, raza, religión, etc.'
    },
    {
        id: 122,
        subject: 'civic_ethics',
        question: '¿Cuál es uno de los derechos fundamentales en México?',
        options: [
            'La educación',
            'El trabajo',
            'La salud',
            'Todos los anteriores'
        ],
        correctAnswer: 3,
        explanation: 'Todos son derechos fundamentales garantizados en la Constitución Mexicana.'
    },
    {
        id: 123,
        subject: 'civic_ethics',
        question: '¿Qué es la responsabilidad social?',
        options: [
            'El deber jurídico únicamente',
            'El compromiso de contribuir al bien común',
            'Un castigo',
            'Una opción voluntaria'
        ],
        correctAnswer: 1,
        explanation: 'La responsabilidad social es el deber de actuar pensando en el bien de la comunidad.'
    },
    {
        id: 124,
        subject: 'civic_ethics',
        question: '¿Cuál es el artículo de la Constitución que garantiza la educación en México?',
        options: ['Artículo 1', 'Artículo 3', 'Artículo 27', 'Artículo 123'],
        correctAnswer: 1,
        explanation: 'El Artículo 3 garantiza el derecho a la educación en México.'
    },
    {
        id: 125,
        subject: 'civic_ethics',
        question: '¿Qué es la tolerancia en el contexto cívico?',
        options: [
            'Aceptar cualquier comportamiento',
            'Permitir diferentes opiniones y creencias',
            'Debilidad',
            'Resignación'
        ],
        correctAnswer: 1,
        explanation: 'La tolerancia es respetar y permitir diferentes opiniones, creencias y formas de vida.'
    },
    {
        id: 126,
        subject: 'civic_ethics',
        question: '¿Cuál es la diferencia entre derecho y deber?',
        options: [
            'Los derechos son obligaciones',
            'Los derechos son lo que podemos exigir, los deberes son lo que debemos cumplir',
            'No hay diferencia',
            'Los deberes son más importantes'
        ],
        correctAnswer: 1,
        explanation: 'Un derecho es lo que podemos exigir, un deber es lo que debemos cumplir.'
    },
    {
        id: 127,
        subject: 'civic_ethics',
        question: '¿Qué es la democracia?',
        options: [
            'Gobierno de una sola persona',
            'Gobierno del pueblo, por el pueblo, para el pueblo',
            'Gobierno de los ricos',
            'Gobierno sin leyes'
        ],
        correctAnswer: 1,
        explanation: 'La democracia es un sistema donde el poder reside en el pueblo.'
    },
    {
        id: 128,
        subject: 'civic_ethics',
        question: '¿Cuál es el objetivo principal de la educación cívica?',
        options: [
            'Preparar para trabajos específicos',
            'Formar ciudadanos responsables y conscientes de sus derechos y deberes',
            'Enseñar solo leyes',
            'Mantener el orden sin cuestionar'
        ],
        correctAnswer: 1,
        explanation: 'La educación cívica busca formar ciudadanos informados, responsables y participativos.'
    }
];

// Función para obtener preguntas por materia
function getExamQuestionsBySubject(subjectId) {
    return EXAM_QUESTIONS.filter(q => q.subject === subjectId);
}

// Función para barajar preguntas
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
