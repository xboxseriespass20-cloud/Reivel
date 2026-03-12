// Configuración de las materias para ECOEMS
const SUBJECTS = {
    // Materias del examen
    MATHEMATICS: {
        id: 'mathematics',
        name: 'Matemáticas',
        color: '#3dadee',
        icon: '🔢',
        examCount: 12,
        practiceCount: 50
    },
    SPANISH: {
        id: 'spanish',
        name: 'Español',
        color: '#fcf700',
        icon: '📖',
        examCount: 12,
        practiceCount: 50
    },
    GEOGRAPHY: {
        id: 'geography',
        name: 'Geografía',
        color: '#f5690b',
        icon: '🌍',
        examCount: 12,
        practiceCount: 50
    },
    BIOLOGY: {
        id: 'biology',
        name: 'Biología',
        color: '#1ada14',
        icon: '🔬',
        examCount: 12,
        practiceCount: 50
    },
    PHYSICS: {
        id: 'physics',
        name: 'Física',
        color: '#e71f1f',
        icon: '⚛️',
        examCount: 12,
        practiceCount: 50
    },
    CHEMISTRY: {
        id: 'chemistry',
        name: 'Química',
        color: '#7706d4',
        icon: '🧪',
        examCount: 12,
        practiceCount: 50
    },
    UNIVERSAL_HISTORY: {
        id: 'universal_history',
        name: 'Historia Universal',
        color: '#10ce49',
        icon: '🏛️',
        examCount: 6,
        practiceCount: 50
    },
    MEXICO_HISTORY: {
        id: 'mexico_history',
        name: 'Historia de México',
        color: '#0801015d',
        icon: '🇲🇽',
        examCount: 6,
        practiceCount: 50
    },
    MATH_SKILLS: {
        id: 'math_skills',
        name: 'Habilidad Matemática',
        color: '#1410ec',
        icon: '📊',
        examCount: 16,
        practiceCount: 50
    },
    VERBAL_SKILLS: {
        id: 'verbal_skills',
        name: 'Habilidad Verbal',
        color: '#f5109d',
        icon: '💬',
        examCount: 16,
        practiceCount: 50
    },
    CIVIC_ETHICS: {
        id: 'civic_ethics',
        name: 'Formación Cívica y Ética',
        color: '#ec0c4f',
        icon: '⚖️',
        examCount: 12,
        practiceCount: 50
    },

};

// Array de materias en orden
const SUBJECTS_ARRAY = [
    SUBJECTS.MATHEMATICS,
    SUBJECTS.SPANISH,
    SUBJECTS.GEOGRAPHY,
    SUBJECTS.BIOLOGY,
    SUBJECTS.PHYSICS,
    SUBJECTS.CHEMISTRY,
    SUBJECTS.UNIVERSAL_HISTORY,
    SUBJECTS.MEXICO_HISTORY,
    SUBJECTS.MATH_SKILLS,
    SUBJECTS.VERBAL_SKILLS,
    SUBJECTS.CIVIC_ETHICS,
];

// Función para obtener colorida materia
function getSubjectColor(subjectId) {
    const subject = Object.values(SUBJECTS).find(s => s.id === subjectId);
    return subject ? subject.color : '#6366f1';
}

// Función para obtener nombre de materia
function getSubjectName(subjectId) {
    const subject = Object.values(SUBJECTS).find(s => s.id === subjectId);
    return subject ? subject.name : 'Desconocido';
}

// Función para obtener icono de materia
function getSubjectIcon(subjectId) {
    const subject = Object.values(SUBJECTS).find(s => s.id === subjectId);
    return subject ? subject.icon : '📚';
}
