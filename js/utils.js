<<<<<<< HEAD
// Utilidades y funciones generales

// Elementos del DOM
const modeSelector = document.getElementById('modeSelector');
const practiceSelector = document.getElementById('practiceSelector');
const examInterface = document.getElementById('examInterface');
const practiceInterface = document.getElementById('practiceInterface');
const resultsInterface = document.getElementById('resultsInterface');
const practiceResultsInterface = document.getElementById('practiceResultsInterface');

// Variables globales del examen
let currentExamQuestion = 0;
let examAnswers = {};
let examQuestions = [];
let currentExamMode = 'mode-selector'; // Modo actual
let examCompleted = localStorage.getItem('examCompleted') === 'true'; // Cargar estado persistente

// Variables globales de práctica
let currentPracticeQuestion = 0;
let practiceAnswers = {};
let practiceQuestions = [];
let currentPracticeSubject = null;

// Función para navegar entre páginas
function navigateTo(page) {
    if (page === 'index') {
        window.location.href = 'index.html';
    } else if (page === 'ecoems') {
        window.location.href = 'ecoems.html';
    }
}

// Función para mostrar/ocul elementos
function showElement(element) {
    if (element) element.classList.remove('hidden');
}

function hideElement(element) {
    if (element) element.classList.add('hidden');
}

// Función para mostrar selector de modo
function showModeSelector() {
    // Ocultar autenticación
    const authContainer = document.getElementById('authContainer');
    if (authContainer) hideElement(authContainer);

    hideElement(practiceSelector);
    hideElement(examInterface);
    hideElement(practiceInterface);
    hideElement(resultsInterface);
    hideElement(practiceResultsInterface);
    showElement(modeSelector);
    currentExamMode = 'mode-selector';
    renderModeSelector(); // Renderizar dinámicamente el selector
}

// Guardar automáticamente el estado actual al salir de la página
window.addEventListener('beforeunload', () => {
    // Dependiendo del modo activo, resguardar su estado actual en localStorage
    if (currentExamMode === 'exam') {
        // ya se guarda en displayExamQuestion y selectExamAnswer, pero reforzamos
        const existing = getState('examState') || {};
        saveState('examState', {
            currentQuestion: currentExamQuestion,
            answers: examAnswers,
            startTime: existing.startTime || new Date().getTime(),
            shuffledQuestions: examQuestions
        });
    } else if (currentExamMode === 'practice') {
        const existing = getState('practiceState') || {};
        saveState('practiceState', {
            subjectId: currentPracticeSubject,
            currentQuestion: currentPracticeQuestion,
            answers: practiceAnswers
        });
    }
});

// Función para renderizar el selector de modo
// Función para mostrar selector de modo
function renderModeSelector() {
    const modeCards = document.querySelector('.mode-cards');
    modeCards.innerHTML = '';

    // Verificar si hay una sesión de práctica guardada
    const savedPracticeState = getState('practiceState');
    const hasSavedPractice = savedPracticeState && Object.keys(savedPracticeState.answers || {}).length > 0;

    // Verificar si hay una sesión de examen guardada
    const savedExamState = getState('examState');
    const hasSavedExam = savedExamState && Object.keys(savedExamState.answers || {}).length > 0;
    const hasUnansweredExam = hasSavedExam && Object.keys(savedExamState.answers).length < EXAM_QUESTIONS.length;

    // Card de recuperación de examen si hay sesión guardada y preguntas no contestadas
    if (hasSavedExam && hasUnansweredExam) {
        const answeredCount = Object.keys(savedExamState.answers).length;
        const totalQuestions = EXAM_QUESTIONS.length;
        const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

        const examRecoveryCard = document.createElement('div');
        examRecoveryCard.className = 'card mode-card recovery-card';
        examRecoveryCard.innerHTML = `
            <div class="card-icon">🔄</div>
            <h3>Continuar Examen</h3>
            <p>${answeredCount}/${totalQuestions} preguntas (${progressPercent}%)</p>
            <button class="btn btn-success" onclick="recoverExamSession(${JSON.stringify(savedExamState).replace(/"/g, '&quot;')})">
                Continuar donde lo dejaste
            </button>
        `;
        modeCards.appendChild(examRecoveryCard);
    }

    // Card de recuperación de práctica si hay sesión guardada
    if (hasSavedPractice) {
        const subject = SUBJECTS_ARRAY.find(s => s.id === savedPracticeState.subjectId);
        const answeredCount = Object.keys(savedPracticeState.answers).length;
        const totalQuestions = subject ? subject.practiceCount : 50;
        const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

        const recoveryCard = document.createElement('div');
        recoveryCard.className = 'card mode-card recovery-card';
        recoveryCard.innerHTML = `
            <div class="card-icon">🔄</div>
            <h3>Continuar Práctica</h3>
            <p>${subject ? subject.name : 'Materia'} - ${answeredCount}/${totalQuestions} preguntas (${progressPercent}%)</p>
            <button class="btn btn-success" onclick="recoverPracticeSession(${JSON.stringify(savedPracticeState).replace(/"/g, '&quot;')})">
                Continuar donde lo dejaste
            </button>
        `;
        modeCards.appendChild(recoveryCard);
    }

   // Solo mostrar modo examen si no está completado
if (!examCompleted) {
        const examCard = document.createElement('div');
        examCard.className = 'card mode-card';
        examCard.innerHTML = `
            <div class="card-icon">🎯</div>
            <h3>Modo Examen</h3>
            <p>128 preguntas - Simula el examen completo</p>
            <button class="btn btn-primary" onclick="startExamMode()">Iniciar Examen</button>
        `;
        modeCards.appendChild(examCard);
    }

    // Card de práctica (siempre disponible si hay preguntas definidas)
    const hasPracticeQuestions = SUBJECTS_ARRAY.some(subject => getPracticeQuestionsBySubject(subject.id).length > 0);
    if (hasPracticeQuestions) {
        const practiceCard = document.createElement('div');
        practiceCard.className = 'card mode-card';
        practiceCard.innerHTML = `
            <div class="card-icon">💪</div>
            <h3>Modo Práctica</h3>
            <p>Practica por materia - 50 reactivos</p>
            <button class="btn btn-primary" onclick="showPracticeSelector()">Práctica por Materia</button>
        `;
        modeCards.appendChild(practiceCard);
    }
}

// Función para mostrar selector de materias
function showPracticeSelector() {
    hideElement(modeSelector);
    hideElement(examInterface);
    hideElement(practiceInterface);
    hideElement(resultsInterface);
    hideElement(practiceResultsInterface);
    showElement(practiceSelector);
    renderPracticeSubjects();
}

// Renderizar selector de materias
function renderPracticeSubjects() {
    const subjectsGrid = document.querySelector('.practice-selector .subjects-grid');
    subjectsGrid.innerHTML = '';

    SUBJECTS_ARRAY.forEach(subject => {
        const questions = getPracticeQuestionsBySubject(subject.id);
        const totalQuestions = questions.length;

        if (totalQuestions > 0) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-icon">${subject.icon}</div>
                <h3>${subject.name}</h3>
                <p>${totalQuestions} preguntas disponibles</p>
                <button class="btn btn-primary" onclick="startPracticeMode('${subject.id}')">
                    Practicar
                </button>
            `;
            subjectsGrid.appendChild(card);
        }
    });
}

// Función para formatear texto de pregunta
function formatQuestionText(text) {
    return text;
}

// Función para obtener letra de opción
function getOptionLetter(index) {
    return String.fromCharCode(65 + index); // A, B, C, D
}

// Función para formatear número de pregunta
function formatQuestionNumber(number) {
    return number + 1;
}

// Función para guardar estado en localStorage
function saveState(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log('Error guardando en localStorage:', e);
    }
}

// Función para recuperar estado de localStorage
function getState(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.log('Error recuperando desde localStorage:', e);
        return null;
    }
}

// Función para limpiar localStorage
function clearState(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.log('Error limpiando localStorage:', e);
    }
}

//==================== GESTIÓN DE USUARIOS ====================
let users = {};           // mapa nombre -> {password, examCompleted, examScore, practiceStats}
let currentUser = null;   // nombre del usuario actual

function loadUsers() {
    const stored = getState('users');
    users = stored || {};
    const storedCurrent = getState('currentUser');
    currentUser = storedCurrent || null;
}

function saveUsers() {
    saveState('users', users);
    saveState('currentUser', currentUser);
}

function registerUser(username, password) {
    if (!username || !password) return false;
    if (users[username]) return false; // ya existe
    users[username] = { password: password, examCompleted: false, examScore: null, practiceStats: {} };
    saveUsers();
    return true;
}

function loginUser(username, password) {
    if (!username || !password) return false;
    const user = users[username];
    if (!user || user.password !== password) return false;
    currentUser = username;
    saveUsers();
    return true;
}

function logoutUser() {
    currentUser = null;
    saveUsers();
}

function getCurrentUser() {
    if (currentUser && users[currentUser]) {
        return users[currentUser];
    }
    return null;
}

function checkExamAvailability() {
    const user = getCurrentUser();
    if (!user) return false;
    return !user.examCompleted;
}

function markExamCompleted(score) {
    const user = getCurrentUser();
    if (!user) return;
    user.examCompleted = true;
    user.examScore = score;
    saveUsers();
}

// funciones para cambiar vistas de autenticación
function showAuthContainer() {
    hideElement(practiceSelector);
    hideElement(examInterface);
    hideElement(practiceInterface);
    hideElement(resultsInterface);
    hideElement(practiceResultsInterface);
    hideElement(modeSelector);
    showElement(document.getElementById('authContainer'));
    showLogin();
}

function showLogin() {
    hideElement(document.getElementById('registerForm'));
    showElement(document.getElementById('loginForm'));
}

function showRegister() {
    hideElement(document.getElementById('loginForm'));
    showElement(document.getElementById('registerForm'));
}

function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Limpiar mensajes de error previos
    hideErrorMessages();

    if (!username || !password) {
        showError('loginForm', 'Por favor, completa todos los campos');
        return;
    }

    if (loginUser(username, password)) {
        // Animación de éxito
        showSuccess('loginForm', '¡Bienvenido de vuelta!');
        setTimeout(() => {
            showModeSelector();
        }, 1000);
    } else {
        showError('loginForm', 'Usuario o contraseña incorrectos');
    }
}

function handleRegister() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;

    // Limpiar mensajes de error previos
    hideErrorMessages();

    if (!username || !password) {
        showError('registerForm', 'Por favor, completa todos los campos');
        return;
    }

    if (username.length < 3) {
        showError('registerForm', 'El usuario debe tener al menos 3 caracteres');
        return;
    }

    if (password.length < 6) {
        showError('registerForm', 'La contraseña debe tener al menos 6 caracteres');
        return;
    }

    if (registerUser(username, password)) {
        showSuccess('registerForm', '¡Cuenta creada exitosamente!');
        setTimeout(() => {
            showLogin();
        }, 1500);
    } else {
        showError('registerForm', 'El usuario ya existe o datos inválidos');
    }
}

function showLogin() {
    hideElement(document.getElementById('registerForm'));
    showElement(document.getElementById('loginForm'));
    hideErrorMessages();
    // Limpiar campos
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
}

function showRegister() {
    hideElement(document.getElementById('loginForm'));
    showElement(document.getElementById('registerForm'));
    hideErrorMessages();
    // Limpiar campos
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}

function showError(formId, message) {
    const form = document.getElementById(formId);
    let errorDiv = form.querySelector('.error-message');

    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        form.appendChild(errorDiv);
    }

    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

function showSuccess(formId, message) {
    const form = document.getElementById(formId);
    let successDiv = form.querySelector('.success-message');

    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        form.appendChild(successDiv);
    }

    successDiv.textContent = message;
    successDiv.classList.add('show');
}

function hideErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    const successMessages = document.querySelectorAll('.success-message');

    errorMessages.forEach(msg => msg.classList.remove('show'));
    successMessages.forEach(msg => msg.classList.remove('show'));
}


// Función para actualizar barra de progreso
function updateProgressBar(current, total, barElementId) {
    const percentage = ((current + 1) / total) * 100;
    const barFill = document.getElementById(barElementId);
    if (barFill) {
        barFill.style.width = percentage + '%';
    }
}

// Función para calcular color de respuesta haya sido correcta
function getAnswerStatusClass(questionId, isCorrect) {
    if (isCorrect === undefined) return 'unanswered';
    return isCorrect ? 'answered' : 'answered';
}

// Función para convertir segundos a minutos y segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Función para obtener descripción de puntuación
function getScoreDescription(percentage) {
    if (percentage >= 90) return 'Excelente';
    if (percentage >= 80) return 'Muy bien';
    if (percentage >= 70) return 'Bien';
    if (percentage >= 60) return 'Aceptable';
    return 'Necesita mejorar';
}

// Función para obtener color de puntuación
function getScoreColor(percentage) {
    if (percentage >= 90) return '#25d60e'; // Verde
    if (percentage >= 80) return '#ad19f1'; // morado
    if (percentage >= 70) return '#e69b1a'; // amarillo
    if (percentage >= 60) return '#fa7318'; // naranja
    if (percentage >= 40) return '#d61b15'; // Rojo
    return '#ef4444'; // Rojo oscuro
}

// Función para contar respuestas correctas por materia
function getResultsBySubject(answers, questions) {
    const results = {};

    // Inicializar objeto de resultados por materia
    SUBJECTS_ARRAY.forEach(subject => {
        results[subject.id] = {
            name: subject.name,
            correct: 0,
            total: 0
        };
    });

    // Contar respuestas
    questions.forEach((question, index) => {
        const subject = question.subject;
        if (results[subject]) {
            results[subject].total++;
            const userAnswer = answers[index];
            if (userAnswer !== undefined && userAnswer !== null && userAnswer === question.correctAnswer) {
                results[subject].correct++;
            }
        }
    });

    return results;
}

// Función para mezclar opciones de una pregunta
function shuffleOptions(question) {
    const optionsWithIndices = question.options.map((opt, idx) => ({
        text: opt,
        originalIndex: idx
    }));

    for (let i = optionsWithIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsWithIndices[i], optionsWithIndices[j]] = [optionsWithIndices[j], optionsWithIndices[i]];
    }

    return optionsWithIndices;
}

// Función para crear objeto de pregunta con opciones mezcladas
function createShuffledQuestion(originalQuestion) {
    const shuffled = { ...originalQuestion };
    const optionsWithIndices = shuffleOptions(originalQuestion);

    // Encontrar el nuevo índice de la respuesta correcta
    const correctOptionText = originalQuestion.options[originalQuestion.correctAnswer];
    const newCorrectIndex = optionsWithIndices.findIndex(opt => opt.text === correctOptionText);

    shuffled.options = optionsWithIndices.map(opt => opt.text);
    shuffled.correctAnswer = newCorrectIndex;

    return shuffled;
}

// Función para validar respuesta
function isAnswerCorrect(questionIndex, selectedAnswer, questions) {
    if (selectedAnswer === undefined || selectedAnswer === null) return false;
    return selectedAnswer === questions[questionIndex].correctAnswer;
}

// Función para contar respuestas
function countAnswers(answers, questions) {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((question, index) => {
        if (answers[index] === undefined || answers[index] === null) {
            unanswered++;
        } else if (answers[index] === question.correctAnswer) {
            correct++;
        } else {
            incorrect++;
        }
    });

    return { correct, incorrect, unanswered };
}

// Función para renderizar opciones de una pregunta
function renderOptions(question, containerId, answersObject, questionIndex, onSelect) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    question.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'option';

        // Marcar opción seleccionada si ya se respondió localmente
        if (answersObject && answersObject[questionIndex] === index) {
            div.classList.add('selected');
        }

        // Si ya se respondió, deshabilitar
        if (answersObject && answersObject[questionIndex] !== undefined) {
            div.classList.add('disabled');
        }

        div.innerHTML = `
            <div class="option-letter">${getOptionLetter(index)}</div>
            <div class="option-text">${option}</div>
        `;

        if (!(answersObject && answersObject[questionIndex] !== undefined)) {
            div.addEventListener('click', () => {
                // Remover selected de todos
                document.querySelectorAll('#' + containerId + ' .option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                // Agregar selected al actual
                div.classList.add('selected');
                // Llamar callback
                if (onSelect) onSelect(index);
            });
        }

        container.appendChild(div);
    });
}

// Función para obtener preguntas de práctica por materia
function getPracticeQuestionsBySubject(subjectId) {
    const questions = PRACTICE_QUESTIONS[subjectId] || [];
    // Agregar IDs si no tienen
    return questions.map((q, idx) => ({
        ...q,
        id: q.id || `${subjectId}-${idx}`,
        correctAnswer: q.correct // normalizar a correctAnswer
    }));
}

// Gestión de reactivos respondidos globalmente
function getAnsweredReactivos() {
    try {
        return JSON.parse(localStorage.getItem('reactivosRespondidos') || '{}');
    } catch (e) {
        return {};
    }
}

function addAnsweredReactivo(id, answer) {
    if (!id) return;
    const list = getAnsweredReactivos();
    list[id] = answer;
    localStorage.setItem('reactivosRespondidos', JSON.stringify(list));
}

function isReactivoAnswered(id) {
    const list = getAnsweredReactivos();
    return list.hasOwnProperty(id);
}

function getReactivoAnswer(id) {
    const list = getAnsweredReactivos();
    return list[id];
}

// Función para crear elemento de revisión de pregunta
function createQuestionReviewItem(index, isAnswered, isCorrect, questionIndex, onClickCallback) {
    const div = document.createElement('div');
    div.className = 'question-review-item';

    if (questionIndex === index) {
        div.classList.add('current');
    } else if (isAnswered === false) {
        div.classList.add('unanswered');
    } else {
        div.classList.add('answered');
    }

    div.textContent = (index + 1);
    div.addEventListener('click', () => {
        if (onClickCallback) onClickCallback(index);
    });

    return div;
}

// Función para mostrar revisión del examen completado
function showExamReview() {
    // Esta función ya no se usa - el examen es de una sola vez
    alert('El examen ya fue completado. Solo puedes acceder al modo práctica.');
}

// Función para mostrar pregunta específica en modo revisión
function displayExamReviewQuestion(index) {
    // Esta función ya no se usa - el examen es de una sola vez
}

// Función para resetear el examen (solo para desarrollo/testing)
// Descomenta la línea siguiente si necesitas resetear: resetExamCompletion();
function resetExamCompletion() {
    examCompleted = false;
    localStorage.removeItem('examCompleted');
    renderModeSelector(); // Actualizar la interfaz
}

// Función para recuperar sesión de práctica guardada
function recoverPracticeSession(practiceState) {
    const { subjectId, currentQuestion, answers } = practiceState;

    // Restaurar variables globales
    currentPracticeSubject = subjectId;
    currentPracticeQuestion = currentQuestion || 0;
    practiceAnswers = answers || {};
    currentExamMode = 'practice';

    // Cargar preguntas de la materia
    let practiceQuestionsArray = getPracticeQuestionsBySubject(subjectId);

    if (!practiceQuestionsArray || practiceQuestionsArray.length === 0) {
        alert('No hay preguntas de práctica disponibles para esta materia.');
        showModeSelector();
        return;
    }

    // Mezclar preguntas (usar el mismo shuffle si es posible)
    practiceQuestions = shuffleQuestions(practiceQuestionsArray);

    // Mostrar interfaz de práctica
    hideElement(modeSelector);
    hideElement(practiceSelector);
    hideElement(examInterface);
    hideElement(resultsInterface);
    hideElement(practiceResultsInterface);
    showElement(practiceInterface);

    // Mostrar la pregunta guardada
    displayPracticeQuestion(currentPracticeQuestion);

    // Mostrar mensaje de recuperación
    const recoveryMsg = document.createElement('div');
    recoveryMsg.className = 'recovery-message';
    recoveryMsg.innerHTML = '<i>✓ Sesión recuperada. Continúa donde lo dejaste.</i>';
    recoveryMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        z-index: 9999;
        animation: slideIn 0.5s ease-out;
        font-size: 14px;
        font-weight: 500;
    `;
    document.body.appendChild(recoveryMsg);

    // Remover mensaje después de 3 segundos
    setTimeout(() => {
        recoveryMsg.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => recoveryMsg.remove(), 500);
    }, 3000);
}

// Función para recuperar sesión de examen guardada
function recoverExamSession(examState) {
    const { currentQuestion, answers, shuffledQuestions } = examState;

    // Restaurar variables globales
    examQuestions = shuffledQuestions || EXAM_QUESTIONS.map(q => createShuffledQuestion(q));
    examAnswers = answers || {};
    currentExamQuestion = currentQuestion || 0;
    currentExamMode = 'exam';

    // Mostrar interfaz de examen con estado recuperado
    hideElement(modeSelector);
    hideElement(practiceSelector);
    hideElement(practiceInterface);
    hideElement(resultsInterface);
    hideElement(practiceResultsInterface);
    showElement(examInterface);

    displayExamQuestion(currentExamQuestion);

    // Mensaje de recuperación
    const recoveryMsg = document.createElement('div');
    recoveryMsg.className = 'recovery-message';
    recoveryMsg.innerHTML = '<i>✓ Examen recuperado. Continúa donde lo dejaste.</i>';
    recoveryMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        z-index: 9999;
        animation: slideIn 0.5s ease-out;
        font-size: 14px;
        font-weight: 500;
    `;
    setTimeout(() => {
        recoveryMsg.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => recoveryMsg.remove(), 500);
    }, 3000);
}

// ==================== AUTENTICACIÓN ====================

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
    return localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('currentUser');
}

// Función para obtener usuario actual
function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

// Función para manejar login
function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        alert('Por favor, ingresa usuario y contraseña.');
        return;
    }

    // Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');

    if (users[username] && users[username] === password) {
        // Login exitoso
        currentUser = username;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);

        // Ocultar login y mostrar contenido
        hideElement(document.getElementById('authContainer'));

        const path = window.location.pathname;
        if (path.includes('index.html') || path === '/') {
            showElement(document.getElementById('mainContent'));
        } else if (path.includes('ecoems.html')) {
            showModeSelector();
        }

        // Limpiar formulario
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
}

// Función para manejar registro
function handleRegister() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;

    if (!username || !password) {
        alert('Por favor, ingresa usuario y contraseña.');
        return;
    }

    if (password.length < 4) {
        alert('La contraseña debe tener al menos 4 caracteres.');
        return;
    }

    // Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');

    if (users[username]) {
        alert('Este usuario ya existe. Elige otro nombre.');
        return;
    }

    // Registrar usuario
    users[username] = password;
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    // Auto-login
    currentUser = username;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', username);

    // Ocultar registro y mostrar contenido
    hideElement(document.getElementById('authContainer'));

    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/') {
        showElement(document.getElementById('mainContent'));
    } else if (path.includes('ecoems.html')) {
        showModeSelector();
    }

    // Limpiar formulario
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';

    alert('¡Cuenta creada exitosamente! Bienvenido a REIVEL.');
}

// Función para mostrar formulario de login
function showLogin() {
    hideElement(document.getElementById('registerForm'));
    showElement(document.getElementById('loginForm'));
}

// Función para mostrar formulario de registro
function showRegister() {
    hideElement(document.getElementById('loginForm'));
    showElement(document.getElementById('registerForm'));
}

// Función para cerrar sesión
function logout() {
    currentUser = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');

    // Mostrar login
    showElement(document.getElementById('authContainer'));
    hideElement(document.getElementById('modeSelector'));
    hideElement(document.getElementById('practiceSelector'));
    hideElement(document.getElementById('examInterface'));
    hideElement(document.getElementById('practiceInterface'));
    hideElement(document.getElementById('resultsInterface'));
    hideElement(document.getElementById('practiceResultsInterface'));

    showLogin();
}

// Función para inicializar autenticación
function initAuth() {
    if (isAuthenticated()) {
        currentUser = getCurrentUser();
        hideElement(document.getElementById('authContainer'));
        const path = window.location.pathname;
        if (path.includes('index.html') || path === '/') {
            showElement(document.getElementById('mainContent'));
        } else if (path.includes('ecoems.html')) {
            hideElement(document.getElementById('mainContent'));
            showModeSelector();
        }
    } else {
        showElement(document.getElementById('authContainer'));
        const path = window.location.pathname;
        if (path.includes('index.html') || path === '/') {
            hideElement(document.getElementById('mainContent'));
        } else if (path.includes('ecoems.html')) {
            hideElement(document.getElementById('modeSelector'));
        }
        showLogin();
    }
}
function logout() {
    // Eliminar sesión guardada
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');

    currentUser = null;

    // Mostrar contenedor de login
    const authContainer = document.getElementById('authContainer');
    if (authContainer) authContainer.classList.remove('hidden');

    // Ocultar interfaces del sistema
    const elementsToHide = [
        'modeSelector',
        'practiceSelector',
        'examInterface',
        'practiceInterface',
        'resultsInterface',
        'practiceResultsInterface'
    ];

    elementsToHide.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    // Recargar página para limpiar estado
    location.reload();
}
function login() {
  const username = document.getElementById("usernameInput").value;

  if (!username) {
    alert("Escribe un nombre");
    return;
  }

  localStorage.setItem("currentUser", username);

  location.reload();
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
=======
// Utilidades y funciones generales

// Elementos del DOM
const modeSelector = document.getElementById('modeSelector');
const practiceSelector = document.getElementById('practiceSelector');
const examInterface = document.getElementById('examInterface');
const practiceInterface = document.getElementById('practiceInterface');
const resultsInterface = document.getElementById('resultsInterface');
const practiceResultsInterface = document.getElementById('practiceResultsInterface');

// Variables globales del examen
let currentExamQuestion = 0;
let examAnswers = {};
let examQuestions = [];
let currentExamMode = 'mode-selector'; // Modo actual
let examCompleted = localStorage.getItem('examCompleted') === 'true'; // Cargar estado persistente

// Variables globales de práctica
let currentPracticeQuestion = 0;
let practiceAnswers = {};
let practiceQuestions = [];
let currentPracticeSubject = null;

// Función para navegar entre páginas
function navigateTo(page) {
    if (page === 'index') {
        window.location.href = 'index.html';
    } else if (page === 'ecoems') {
        window.location.href = 'ecoems.html';
    }
}

// Función para mostrar/ocul elementos
function showElement(element) {
    if (element) element.classList.remove('hidden');
}

function hideElement(element) {
    if (element) element.classList.add('hidden');
}

// Función para mostrar selector de modo
function showModeSelector() {
    // Ocultar autenticación
    const authContainer = document.getElementById('authContainer');
    if (authContainer) hideElement(authContainer);

    hideElement(practiceSelector);
    hideElement(examInterface);
    hideElement(practiceInterface);
    hideElement(resultsInterface);
    hideElement(practiceResultsInterface);
    showElement(modeSelector);
    currentExamMode = 'mode-selector';
    renderModeSelector(); // Renderizar dinámicamente el selector
}

// Guardar automáticamente el estado actual al salir de la página
window.addEventListener('beforeunload', () => {
    // Dependiendo del modo activo, resguardar su estado actual en localStorage
    if (currentExamMode === 'exam') {
        // ya se guarda en displayExamQuestion y selectExamAnswer, pero reforzamos
        const existing = getState('examState') || {};
        saveState('examState', {
            currentQuestion: currentExamQuestion,
            answers: examAnswers,
            startTime: existing.startTime || new Date().getTime(),
            shuffledQuestions: examQuestions
        });
    } else if (currentExamMode === 'practice') {
        const existing = getState('practiceState') || {};
        saveState('practiceState', {
            subjectId: currentPracticeSubject,
            currentQuestion: currentPracticeQuestion,
            answers: practiceAnswers
        });
    }
});

// Función para renderizar el selector de modo
// Función para mostrar selector de modo
function renderModeSelector() {
    const modeCards = document.querySelector('.mode-cards');
    modeCards.innerHTML = '';

    // Verificar si hay una sesión de práctica guardada
    const savedPracticeState = getState('practiceState');
    const hasSavedPractice = savedPracticeState && Object.keys(savedPracticeState.answers || {}).length > 0;

    // Verificar si hay una sesión de examen guardada
    const savedExamState = getState('examState');
    const hasSavedExam = savedExamState && Object.keys(savedExamState.answers || {}).length > 0;
    const hasUnansweredExam = hasSavedExam && Object.keys(savedExamState.answers).length < EXAM_QUESTIONS.length;

    // Card de recuperación de examen si hay sesión guardada y preguntas no contestadas
    if (hasSavedExam && hasUnansweredExam) {
        const answeredCount = Object.keys(savedExamState.answers).length;
        const totalQuestions = EXAM_QUESTIONS.length;
        const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

        const examRecoveryCard = document.createElement('div');
        examRecoveryCard.className = 'card mode-card recovery-card';
        examRecoveryCard.innerHTML = `
            <div class="card-icon">🔄</div>
            <h3>Continuar Examen</h3>
            <p>${answeredCount}/${totalQuestions} preguntas (${progressPercent}%)</p>
            <button class="btn btn-success" onclick="recoverExamSession(${JSON.stringify(savedExamState).replace(/"/g, '&quot;')})">
                Continuar donde lo dejaste
            </button>
        `;
        modeCards.appendChild(examRecoveryCard);
    }

    // Card de recuperación de práctica si hay sesión guardada
    if (hasSavedPractice) {
        const subject = SUBJECTS_ARRAY.find(s => s.id === savedPracticeState.subjectId);
        const answeredCount = Object.keys(savedPracticeState.answers).length;
        const totalQuestions = subject ? subject.practiceCount : 50;
        const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

        const recoveryCard = document.createElement('div');
        recoveryCard.className = 'card mode-card recovery-card';
        recoveryCard.innerHTML = `
            <div class="card-icon">🔄</div>
            <h3>Continuar Práctica</h3>
            <p>${subject ? subject.name : 'Materia'} - ${answeredCount}/${totalQuestions} preguntas (${progressPercent}%)</p>
            <button class="btn btn-success" onclick="recoverPracticeSession(${JSON.stringify(savedPracticeState).replace(/"/g, '&quot;')})">
                Continuar donde lo dejaste
            </button>
        `;
        modeCards.appendChild(recoveryCard);
    }

   // Solo mostrar modo examen si no está completado
if (!examCompleted) {
        const examCard = document.createElement('div');
        examCard.className = 'card mode-card';
        examCard.innerHTML = `
            <div class="card-icon">🎯</div>
            <h3>Modo Examen</h3>
            <p>128 preguntas - Simula el examen completo</p>
            <button class="btn btn-primary" onclick="startExamMode()">Iniciar Examen</button>
        `;
        modeCards.appendChild(examCard);
    }

    // Card de práctica (siempre disponible si hay preguntas definidas)
    const hasPracticeQuestions = SUBJECTS_ARRAY.some(subject => getPracticeQuestionsBySubject(subject.id).length > 0);
    if (hasPracticeQuestions) {
        const practiceCard = document.createElement('div');
        practiceCard.className = 'card mode-card';
        practiceCard.innerHTML = `
            <div class="card-icon">💪</div>
            <h3>Modo Práctica</h3>
            <p>Practica por materia - 50 reactivos</p>
            <button class="btn btn-primary" onclick="showPracticeSelector()">Práctica por Materia</button>
        `;
        modeCards.appendChild(practiceCard);
    }
}

// Función para mostrar selector de materias
function showPracticeSelector() {
    hideElement(modeSelector);
    hideElement(examInterface);
    hideElement(practiceInterface);
    hideElement(resultsInterface);
    hideElement(practiceResultsInterface);
    showElement(practiceSelector);
    renderPracticeSubjects();
}

// Renderizar selector de materias
function renderPracticeSubjects() {
    const subjectsGrid = document.querySelector('.practice-selector .subjects-grid');
    subjectsGrid.innerHTML = '';

    SUBJECTS_ARRAY.forEach(subject => {
        const questions = getPracticeQuestionsBySubject(subject.id);
        const totalQuestions = questions.length;

        if (totalQuestions > 0) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-icon">${subject.icon}</div>
                <h3>${subject.name}</h3>
                <p>${totalQuestions} preguntas disponibles</p>
                <button class="btn btn-primary" onclick="startPracticeMode('${subject.id}')">
                    Practicar
                </button>
            `;
            subjectsGrid.appendChild(card);
        }
    });
}

// Función para formatear texto de pregunta
function formatQuestionText(text) {
    return text;
}

// Función para obtener letra de opción
function getOptionLetter(index) {
    return String.fromCharCode(65 + index); // A, B, C, D
}

// Función para formatear número de pregunta
function formatQuestionNumber(number) {
    return number + 1;
}

// Función para guardar estado en localStorage
function saveState(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log('Error guardando en localStorage:', e);
    }
}

// Función para recuperar estado de localStorage
function getState(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.log('Error recuperando desde localStorage:', e);
        return null;
    }
}

// Función para limpiar localStorage
function clearState(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.log('Error limpiando localStorage:', e);
    }
}

//==================== GESTIÓN DE USUARIOS ====================
let users = {};           // mapa nombre -> {password, examCompleted, examScore, practiceStats}
let currentUser = null;   // nombre del usuario actual

function loadUsers() {
    const stored = getState('users');
    users = stored || {};
    const storedCurrent = getState('currentUser');
    currentUser = storedCurrent || null;
}

function saveUsers() {
    saveState('users', users);
    saveState('currentUser', currentUser);
}

function registerUser(username, password) {
    if (!username || !password) return false;
    if (users[username]) return false; // ya existe
    users[username] = { password: password, examCompleted: false, examScore: null, practiceStats: {} };
    saveUsers();
    return true;
}

function loginUser(username, password) {
    if (!username || !password) return false;
    const user = users[username];
    if (!user || user.password !== password) return false;
    currentUser = username;
    saveUsers();
    return true;
}

function logoutUser() {
    currentUser = null;
    saveUsers();
}

function getCurrentUser() {
    if (currentUser && users[currentUser]) {
        return users[currentUser];
    }
    return null;
}

function checkExamAvailability() {
    const user = getCurrentUser();
    if (!user) return false;
    return !user.examCompleted;
}

function markExamCompleted(score) {
    const user = getCurrentUser();
    if (!user) return;
    user.examCompleted = true;
    user.examScore = score;
    saveUsers();
}

// funciones para cambiar vistas de autenticación
function showAuthContainer() {
    hideElement(practiceSelector);
    hideElement(examInterface);
    hideElement(practiceInterface);
    hideElement(resultsInterface);
    hideElement(practiceResultsInterface);
    hideElement(modeSelector);
    showElement(document.getElementById('authContainer'));
    showLogin();
}

function showLogin() {
    hideElement(document.getElementById('registerForm'));
    showElement(document.getElementById('loginForm'));
}

function showRegister() {
    hideElement(document.getElementById('loginForm'));
    showElement(document.getElementById('registerForm'));
}

function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Limpiar mensajes de error previos
    hideErrorMessages();

    if (!username || !password) {
        showError('loginForm', 'Por favor, completa todos los campos');
        return;
    }

    if (loginUser(username, password)) {
        // Animación de éxito
        showSuccess('loginForm', '¡Bienvenido de vuelta!');
        setTimeout(() => {
            showModeSelector();
        }, 1000);
    } else {
        showError('loginForm', 'Usuario o contraseña incorrectos');
    }
}

function handleRegister() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;

    // Limpiar mensajes de error previos
    hideErrorMessages();

    if (!username || !password) {
        showError('registerForm', 'Por favor, completa todos los campos');
        return;
    }

    if (username.length < 3) {
        showError('registerForm', 'El usuario debe tener al menos 3 caracteres');
        return;
    }

    if (password.length < 6) {
        showError('registerForm', 'La contraseña debe tener al menos 6 caracteres');
        return;
    }

    if (registerUser(username, password)) {
        showSuccess('registerForm', '¡Cuenta creada exitosamente!');
        setTimeout(() => {
            showLogin();
        }, 1500);
    } else {
        showError('registerForm', 'El usuario ya existe o datos inválidos');
    }
}

function showLogin() {
    hideElement(document.getElementById('registerForm'));
    showElement(document.getElementById('loginForm'));
    hideErrorMessages();
    // Limpiar campos
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
}

function showRegister() {
    hideElement(document.getElementById('loginForm'));
    showElement(document.getElementById('registerForm'));
    hideErrorMessages();
    // Limpiar campos
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}

function showError(formId, message) {
    const form = document.getElementById(formId);
    let errorDiv = form.querySelector('.error-message');

    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        form.appendChild(errorDiv);
    }

    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

function showSuccess(formId, message) {
    const form = document.getElementById(formId);
    let successDiv = form.querySelector('.success-message');

    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        form.appendChild(successDiv);
    }

    successDiv.textContent = message;
    successDiv.classList.add('show');
}

function hideErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    const successMessages = document.querySelectorAll('.success-message');

    errorMessages.forEach(msg => msg.classList.remove('show'));
    successMessages.forEach(msg => msg.classList.remove('show'));
}


// Función para actualizar barra de progreso
function updateProgressBar(current, total, barElementId) {
    const percentage = ((current + 1) / total) * 100;
    const barFill = document.getElementById(barElementId);
    if (barFill) {
        barFill.style.width = percentage + '%';
    }
}

// Función para calcular color de respuesta haya sido correcta
function getAnswerStatusClass(questionId, isCorrect) {
    if (isCorrect === undefined) return 'unanswered';
    return isCorrect ? 'answered' : 'answered';
}

// Función para convertir segundos a minutos y segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Función para obtener descripción de puntuación
function getScoreDescription(percentage) {
    if (percentage >= 90) return 'Excelente';
    if (percentage >= 80) return 'Muy bien';
    if (percentage >= 70) return 'Bien';
    if (percentage >= 60) return 'Aceptable';
    return 'Necesita mejorar';
}

// Función para obtener color de puntuación
function getScoreColor(percentage) {
    if (percentage >= 90) return '#25d60e'; // Verde
    if (percentage >= 80) return '#ad19f1'; // morado
    if (percentage >= 70) return '#e69b1a'; // amarillo
    if (percentage >= 60) return '#fa7318'; // naranja
    if (percentage >= 40) return '#d61b15'; // Rojo
    return '#ef4444'; // Rojo oscuro
}

// Función para contar respuestas correctas por materia
function getResultsBySubject(answers, questions) {
    const results = {};

    // Inicializar objeto de resultados por materia
    SUBJECTS_ARRAY.forEach(subject => {
        results[subject.id] = {
            name: subject.name,
            correct: 0,
            total: 0
        };
    });

    // Contar respuestas
    questions.forEach((question, index) => {
        const subject = question.subject;
        if (results[subject]) {
            results[subject].total++;
            const userAnswer = answers[index];
            if (userAnswer !== undefined && userAnswer !== null && userAnswer === question.correctAnswer) {
                results[subject].correct++;
            }
        }
    });

    return results;
}

// Función para mezclar opciones de una pregunta
function shuffleOptions(question) {
    const optionsWithIndices = question.options.map((opt, idx) => ({
        text: opt,
        originalIndex: idx
    }));

    for (let i = optionsWithIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsWithIndices[i], optionsWithIndices[j]] = [optionsWithIndices[j], optionsWithIndices[i]];
    }

    return optionsWithIndices;
}

// Función para crear objeto de pregunta con opciones mezcladas
function createShuffledQuestion(originalQuestion) {
    const shuffled = { ...originalQuestion };
    const optionsWithIndices = shuffleOptions(originalQuestion);

    // Encontrar el nuevo índice de la respuesta correcta
    const correctOptionText = originalQuestion.options[originalQuestion.correctAnswer];
    const newCorrectIndex = optionsWithIndices.findIndex(opt => opt.text === correctOptionText);

    shuffled.options = optionsWithIndices.map(opt => opt.text);
    shuffled.correctAnswer = newCorrectIndex;

    return shuffled;
}

// Función para validar respuesta
function isAnswerCorrect(questionIndex, selectedAnswer, questions) {
    if (selectedAnswer === undefined || selectedAnswer === null) return false;
    return selectedAnswer === questions[questionIndex].correctAnswer;
}

// Función para contar respuestas
function countAnswers(answers, questions) {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((question, index) => {
        if (answers[index] === undefined || answers[index] === null) {
            unanswered++;
        } else if (answers[index] === question.correctAnswer) {
            correct++;
        } else {
            incorrect++;
        }
    });

    return { correct, incorrect, unanswered };
}

// Función para renderizar opciones de una pregunta
function renderOptions(question, containerId, answersObject, questionIndex, onSelect) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    question.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'option';

        // Marcar opción seleccionada si ya se respondió localmente
        if (answersObject && answersObject[questionIndex] === index) {
            div.classList.add('selected');
        }

        // Si ya se respondió, deshabilitar
        if (answersObject && answersObject[questionIndex] !== undefined) {
            div.classList.add('disabled');
        }

        div.innerHTML = `
            <div class="option-letter">${getOptionLetter(index)}</div>
            <div class="option-text">${option}</div>
        `;

        if (!(answersObject && answersObject[questionIndex] !== undefined)) {
            div.addEventListener('click', () => {
                // Remover selected de todos
                document.querySelectorAll('#' + containerId + ' .option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                // Agregar selected al actual
                div.classList.add('selected');
                // Llamar callback
                if (onSelect) onSelect(index);
            });
        }

        container.appendChild(div);
    });
}

// Función para obtener preguntas de práctica por materia
function getPracticeQuestionsBySubject(subjectId) {
    const questions = PRACTICE_QUESTIONS[subjectId] || [];
    // Agregar IDs si no tienen
    return questions.map((q, idx) => ({
        ...q,
        id: q.id || `${subjectId}-${idx}`,
        correctAnswer: q.correct // normalizar a correctAnswer
    }));
}

// Gestión de reactivos respondidos globalmente
function getAnsweredReactivos() {
    try {
        return JSON.parse(localStorage.getItem('reactivosRespondidos') || '{}');
    } catch (e) {
        return {};
    }
}

function addAnsweredReactivo(id, answer) {
    if (!id) return;
    const list = getAnsweredReactivos();
    list[id] = answer;
    localStorage.setItem('reactivosRespondidos', JSON.stringify(list));
}

function isReactivoAnswered(id) {
    const list = getAnsweredReactivos();
    return list.hasOwnProperty(id);
}

function getReactivoAnswer(id) {
    const list = getAnsweredReactivos();
    return list[id];
}

// Función para crear elemento de revisión de pregunta
function createQuestionReviewItem(index, isAnswered, isCorrect, questionIndex, onClickCallback) {
    const div = document.createElement('div');
    div.className = 'question-review-item';

    if (questionIndex === index) {
        div.classList.add('current');
    } else if (isAnswered === false) {
        div.classList.add('unanswered');
    } else {
        div.classList.add('answered');
    }

    div.textContent = (index + 1);
    div.addEventListener('click', () => {
        if (onClickCallback) onClickCallback(index);
    });

    return div;
}

// Función para mostrar revisión del examen completado
function showExamReview() {
    // Esta función ya no se usa - el examen es de una sola vez
    alert('El examen ya fue completado. Solo puedes acceder al modo práctica.');
}

// Función para mostrar pregunta específica en modo revisión
function displayExamReviewQuestion(index) {
    // Esta función ya no se usa - el examen es de una sola vez
}

// Función para resetear el examen (solo para desarrollo/testing)
// Descomenta la línea siguiente si necesitas resetear: resetExamCompletion();
function resetExamCompletion() {
    examCompleted = false;
    localStorage.removeItem('examCompleted');
    renderModeSelector(); // Actualizar la interfaz
}

// Función para recuperar sesión de práctica guardada
function recoverPracticeSession(practiceState) {
    const { subjectId, currentQuestion, answers } = practiceState;

    // Restaurar variables globales
    currentPracticeSubject = subjectId;
    currentPracticeQuestion = currentQuestion || 0;
    practiceAnswers = answers || {};
    currentExamMode = 'practice';

    // Cargar preguntas de la materia
    let practiceQuestionsArray = getPracticeQuestionsBySubject(subjectId);

    if (!practiceQuestionsArray || practiceQuestionsArray.length === 0) {
        alert('No hay preguntas de práctica disponibles para esta materia.');
        showModeSelector();
        return;
    }

    // Mezclar preguntas (usar el mismo shuffle si es posible)
    practiceQuestions = shuffleQuestions(practiceQuestionsArray);

    // Mostrar interfaz de práctica
    hideElement(modeSelector);
    hideElement(practiceSelector);
    hideElement(examInterface);
    hideElement(resultsInterface);
    hideElement(practiceResultsInterface);
    showElement(practiceInterface);

    // Mostrar la pregunta guardada
    displayPracticeQuestion(currentPracticeQuestion);

    // Mostrar mensaje de recuperación
    const recoveryMsg = document.createElement('div');
    recoveryMsg.className = 'recovery-message';
    recoveryMsg.innerHTML = '<i>✓ Sesión recuperada. Continúa donde lo dejaste.</i>';
    recoveryMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        z-index: 9999;
        animation: slideIn 0.5s ease-out;
        font-size: 14px;
        font-weight: 500;
    `;
    document.body.appendChild(recoveryMsg);

    // Remover mensaje después de 3 segundos
    setTimeout(() => {
        recoveryMsg.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => recoveryMsg.remove(), 500);
    }, 3000);
}

// Función para recuperar sesión de examen guardada
function recoverExamSession(examState) {
    const { currentQuestion, answers, shuffledQuestions } = examState;

    // Restaurar variables globales
    examQuestions = shuffledQuestions || EXAM_QUESTIONS.map(q => createShuffledQuestion(q));
    examAnswers = answers || {};
    currentExamQuestion = currentQuestion || 0;
    currentExamMode = 'exam';

    // Mostrar interfaz de examen con estado recuperado
    hideElement(modeSelector);
    hideElement(practiceSelector);
    hideElement(practiceInterface);
    hideElement(resultsInterface);
    hideElement(practiceResultsInterface);
    showElement(examInterface);

    displayExamQuestion(currentExamQuestion);

    // Mensaje de recuperación
    const recoveryMsg = document.createElement('div');
    recoveryMsg.className = 'recovery-message';
    recoveryMsg.innerHTML = '<i>✓ Examen recuperado. Continúa donde lo dejaste.</i>';
    recoveryMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        z-index: 9999;
        animation: slideIn 0.5s ease-out;
        font-size: 14px;
        font-weight: 500;
    `;
    setTimeout(() => {
        recoveryMsg.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => recoveryMsg.remove(), 500);
    }, 3000);
}

// ==================== AUTENTICACIÓN ====================

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
    return localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('currentUser');
}

// Función para obtener usuario actual
function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

// Función para manejar login
function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        alert('Por favor, ingresa usuario y contraseña.');
        return;
    }

    // Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');

    if (users[username] && users[username] === password) {
        // Login exitoso
        currentUser = username;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);

        // Ocultar login y mostrar contenido
        hideElement(document.getElementById('authContainer'));

        const path = window.location.pathname;
        if (path.includes('index.html') || path === '/') {
            showElement(document.getElementById('mainContent'));
        } else if (path.includes('ecoems.html')) {
            showModeSelector();
        }

        // Limpiar formulario
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
}

// Función para manejar registro
function handleRegister() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;

    if (!username || !password) {
        alert('Por favor, ingresa usuario y contraseña.');
        return;
    }

    if (password.length < 4) {
        alert('La contraseña debe tener al menos 4 caracteres.');
        return;
    }

    // Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');

    if (users[username]) {
        alert('Este usuario ya existe. Elige otro nombre.');
        return;
    }

    // Registrar usuario
    users[username] = password;
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    // Auto-login
    currentUser = username;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', username);

    // Ocultar registro y mostrar contenido
    hideElement(document.getElementById('authContainer'));

    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/') {
        showElement(document.getElementById('mainContent'));
    } else if (path.includes('ecoems.html')) {
        showModeSelector();
    }

    // Limpiar formulario
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';

    alert('¡Cuenta creada exitosamente! Bienvenido a REIVEL.');
}

// Función para mostrar formulario de login
function showLogin() {
    hideElement(document.getElementById('registerForm'));
    showElement(document.getElementById('loginForm'));
}

// Función para mostrar formulario de registro
function showRegister() {
    hideElement(document.getElementById('loginForm'));
    showElement(document.getElementById('registerForm'));
}

// Función para cerrar sesión
function logout() {
    currentUser = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');

    // Mostrar login
    showElement(document.getElementById('authContainer'));
    hideElement(document.getElementById('modeSelector'));
    hideElement(document.getElementById('practiceSelector'));
    hideElement(document.getElementById('examInterface'));
    hideElement(document.getElementById('practiceInterface'));
    hideElement(document.getElementById('resultsInterface'));
    hideElement(document.getElementById('practiceResultsInterface'));

    showLogin();
}

// Función para inicializar autenticación
function initAuth() {
    if (isAuthenticated()) {
        currentUser = getCurrentUser();
        hideElement(document.getElementById('authContainer'));
        const path = window.location.pathname;
        if (path.includes('index.html') || path === '/') {
            showElement(document.getElementById('mainContent'));
        } else if (path.includes('ecoems.html')) {
            hideElement(document.getElementById('mainContent'));
            showModeSelector();
        }
    } else {
        showElement(document.getElementById('authContainer'));
        const path = window.location.pathname;
        if (path.includes('index.html') || path === '/') {
            hideElement(document.getElementById('mainContent'));
        } else if (path.includes('ecoems.html')) {
            hideElement(document.getElementById('modeSelector'));
        }
        showLogin();
    }
}
function logout() {
    // Eliminar sesión guardada
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');

    currentUser = null;

    // Mostrar contenedor de login
    const authContainer = document.getElementById('authContainer');
    if (authContainer) authContainer.classList.remove('hidden');

    // Ocultar interfaces del sistema
    const elementsToHide = [
        'modeSelector',
        'practiceSelector',
        'examInterface',
        'practiceInterface',
        'resultsInterface',
        'practiceResultsInterface'
    ];

    elementsToHide.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    // Recargar página para limpiar estado
    location.reload();
}
function login() {
  const username = document.getElementById("usernameInput").value;

  if (!username) {
    alert("Escribe un nombre");
    return;
  }

  localStorage.setItem("currentUser", username);

  location.reload();
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
>>>>>>> 78b263f4a9675da64de4831e875036cd7a44d406
}