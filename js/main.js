// Lógica General y Navegación de REIVEL

// Inicializar la página cuando carga
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Función de inicialización principal
function initializePage() {
    const path = window.location.pathname;

    // Detectar si estamos en la página principal o en ECOEMS
    if (path.includes('ecoems.html')) {
        // Inicializar página ECOEMS
        initializeECOEMSPage();
    } else if (path.includes('index.html') || path === '/') {
        // Inicializar página principal
        initializeMainPage();
    }
}

// Inicializar página principal
function initializeMainPage() {
    // Inicializar autenticación
    initAuth();
}

// Inicializar página ECOEMS
function initializeECOEMSPage() {
    // Inicializar autenticación
    initAuth();
}

// ===================== SECCIÓN PARA MODO EXAMEN =====================

// Renderizar interfaz del examen
function renderExamInterface() {
    // Cargar las primeras preguntas
    if (examQuestions.length > 0) {
        displayExamQuestion(0);
    }
}

// ===================== SECCIÓN PARA MODO PRÁCTICA =====================

// Renderizar interfaz de práctica
function renderPracticeInterface() {
    // Cargar las primeras preguntas
    if (practiceQuestions.length > 0) {
        displayPracticeQuestion(0);
    }
}

// ===================== FUNCIONES DE NAVEGACIÓN =====================

// Función para ir a página principal
function goToHome() {
    window.location.href = 'index.html';
}

// Función para ir a ECOEMS
function goToECOEMS() {
    window.location.href = 'ecoems.html';
}

// ===================== VISTA PREVIA DE RESPUESTAS =====================

// Mostrar resumen de respuestas antes de finalizar
function showAnswersSummary() {
    let answeredCount = 0;
    let unansweredCount = 0;

    Object.keys(examAnswers).forEach(key => {
        if (examAnswers[key] !== undefined) {
            answeredCount++;
        } else {
            unansweredCount++;
        }
    });

    const confirmation = confirm(
        `Resumen:\n\n` +
        `Total de preguntas: ${examQuestions.length}\n` +
        `Respondidas: ${answeredCount}\n` +
        `Sin responder: ${unansweredCount}\n\n` +
        `¿Deseas finalizar el examen?`
    );

    if (confirmation) {
        finishExam();
    }
}

// ===================== MANEJO DE STORAGE =====================

// Cargar sesión previa del examen
function loadPreviousExamSession() {
    const savedState = getState('examState');
    if (savedState && savedState.answers && Object.keys(savedState.answers).length > 0) {
        examAnswers = savedState.answers;
        currentExamQuestion = savedState.currentQuestion || 0;

        // Reconstruir preguntas del examen si no existen
        if (examQuestions.length === 0) {
            examQuestions = EXAM_QUESTIONS.map(q => createShuffledQuestion(q));
        }

        // Restaurar visualización de pregunta
        displayExamQuestion(currentExamQuestion);
    }
}

// Cargar sesión previa de práctica
function loadPreviousPracticeSession() {
    const savedState = getState('practiceState');
    if (savedState && savedState.subjectId) {
        currentPracticeSubject = savedState.subjectId;
        practiceAnswers = savedState.answers || {};
        currentPracticeQuestion = savedState.currentQuestion || 0;

        // Reconstruir preguntas de práctica si no existen
        if (practiceQuestions.length === 0) {
            let practiceQuestionsArray = getPracticeQuestionsBySubject(currentPracticeSubject);
            practiceQuestions = shuffleQuestions(practiceQuestionsArray);
        }

        // Restaurar visualización de pregunta
        displayPracticeQuestion(currentPracticeQuestion);
    }
}

// ===================== FUNCIONES AUXILIARES =====================

// Validar que una pregunta tenga respuesta
function isQuestionAnswered(questionIndex, answers) {
    return answers[questionIndex] !== undefined && answers[questionIndex] !== null;
}

// Obtener número de preguntas respondidas
function getAnsweredCount(answers) {
    return Object.keys(answers).filter(key => answers[key] !== undefined).length;
}

// Obtener número de preguntas sin responder
function getUnansweredCount(answers, totalCount) {
    return totalCount - getAnsweredCount(answers);
}

// Mostrar alerta de confirmación antes de abandonar examen
window.addEventListener('beforeunload', function(e) {
    if (currentExamMode === 'exam' && Object.keys(examAnswers).length > 0) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
    if (currentExamMode === 'practice' && Object.keys(practiceAnswers).length > 0) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// ===================== MEJORAS DE UX =====================

// Agregar soporte para teclado
document.addEventListener('keydown', function(event) {
    // Solo en modo examen o práctica
    if (currentExamMode !== 'exam' && currentExamMode !== 'practice') {
        return;
    }

    // Teclas de dirección izquierda y derecha
    if (event.key === 'ArrowLeft') {
        if (currentExamMode === 'exam') {
            previousQuestion();
        } else if (currentExamMode === 'practice') {
            previousPracticeQuestion();
        }
    } else if (event.key === 'ArrowRight') {
        if (currentExamMode === 'exam') {
            nextQuestion();
        } else if (currentExamMode === 'practice') {
            nextPracticeQuestion();
        }
    }

    // Números del 1 al 4 para seleccionar opciones
    const keyNum = parseInt(event.key);
    if (keyNum >= 1 && keyNum <= 4) {
        const optionIndex = keyNum - 1;
        const optionsContainer = currentExamMode === 'exam' ? 
            document.getElementById('optionsContainer') : 
            document.getElementById('practiceOptionsContainer');

        if (optionsContainer && optionsContainer.children[optionIndex]) {
            optionsContainer.children[optionIndex].click();
        }
    }
});

// ===================== ESTADÍSTICAS =====================

// Analizar datos de desempeño
function analyzePerformance(answers, questions) {
    const analysis = {
        totalQuestions: questions.length,
        answered: 0,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        bySubject: {}
    };

    questions.forEach((question, index) => {
        const answer = answers[index];
        const correctAnswer = question.correctAnswer || question.correct;

        if (answer === undefined || answer === null) {
            analysis.unanswered++;
        } else {
            analysis.answered++;
            if (answer === correctAnswer) {
                analysis.correct++;
            } else {
                analysis.incorrect++;
            }
        }

        // Agrupar por materia
        const subject = question.subject;
        if (!analysis.bySubject[subject]) {
            analysis.bySubject[subject] = {
                total: 0,
                correct: 0,
                answered: 0
            };
        }

        analysis.bySubject[subject].total++;

        if (answer !== undefined && answer !== null) {
            analysis.bySubject[subject].answered++;
            if (answer === correctAnswer) {
                analysis.bySubject[subject].correct++;
            }
        }
    });

    return analysis;
}

// Exportar resultados a JSON (para análisis futuro)
function exportResults(fileName = 'resultados.json') {
    const data = {
        timestamp: new Date().toISOString(),
        mode: currentExamMode,
        answers: currentExamMode === 'exam' ? examAnswers : practiceAnswers,
        questionsCount: currentExamMode === 'exam' ? examQuestions.length : practiceQuestions.length
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
}

// ===================== INICIALIZACIÓN DE LISTENERS =====================

// Setup listeners cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Agregar listeners a botones si existen
    const modeSelectCards = document.querySelectorAll('.mode-card');
    modeSelectCards.forEach(card => {
        if (!card.onclick) {
            card.addEventListener('click', function() {
                const mode = this.querySelector('.btn').onclick;
                if (mode) {
                    mode();
                }
            });
        }
    });

    // Restaurar sesión previa si existe
    const currentPath = window.location.pathname;
    if (currentPath.includes('ecoems.html')) {
        const savedExamState = getState('examState');
        const savedPracticeState = getState('practiceState');

        if (savedExamState && Object.keys(savedExamState.answers || {}).length > 0) {
            // Mostrar opción para continuar examen anterior
            console.log('Sesión de examen anterior detectada', savedExamState);
        }

        if (savedPracticeState && Object.keys(savedPracticeState.answers || {}).length > 0) {
            // Mostrar opción para continuar sesión anterior
            console.log('Sesión de práctica anterior detectada', savedPracticeState);
        }
    }
});

// ===================== FUNCIONES DE UTILIDAD ADICIONALES =====================

// Obtener tiempo transcurrido en el examen
function getElapsedTime() {
    const savedState = getState('examState');
    if (savedState && savedState.startTime) {
        const elapsed = new Date().getTime() - savedState.startTime;
        return Math.floor(elapsed / 1000); // Convertir a segundos
    }
    return 0;
}

// Validar que el usuario haya completado el examen apropiadamente
function validateExamCompletion() {
    const answers = currentExamMode === 'exam' ? examAnswers : practiceAnswers;
    const totalQuestions = currentExamMode === 'exam' ? 
        examQuestions.length : 
        practiceQuestions.length;

    return {
        isValid: true,
        answeredCount: getAnsweredCount(answers),
        unansweredCount: getUnansweredCount(answers, totalQuestions),
        totalQuestions: totalQuestions
    };
}

// Mostrar propinas de estudio
function showStudyTips(subjectId) {
    const tips = {
        mathematics: 'Tip: Practica problemas similares.',
        spanish: 'Tip: Lee mucho y amplía tu vocabulario.',
        geography: 'Tip: Estudia mapas y ubicaciones.',
        biology: 'Tip: Memoriza términos y procesos biológicos.',
        physics: 'Tip: Comprende bien las fórmulas.',
        chemistry: 'Tip: Practica balanceo de ecuaciones.',
        universal_history: 'Tip: Memoriza fechas importantes.',
        mexico_history: 'Tip: Estudia personajes históricos.',
        math_skills: 'Tip: Resuelve muchos ejercicios de lógica.',
        verbal_skills: 'Tip: Lee comprensivamente.',
        civic_ethics: 'Tip: Conoce la Constitución.'
    };

    return tips[subjectId] || 'Tip: Sigue estudiando.';
}

console.log('✓ REIVEL - Sistema de exámenes iniciado correctamente');
