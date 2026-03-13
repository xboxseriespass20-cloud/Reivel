// Lógica del Modo Examen ECOEMS (128 preguntas)

// Iniciar modo examen
function startExamMode() {
    // Marcar que el examen ha sido iniciado para evitar repeticiones
    localStorage.setItem('examStarted', 'true');

    // Inicializar variables
    currentExamQuestion = 0;
    examAnswers = {};
    currentExamMode = 'exam';

    // Cargar todas las preguntas del examen
    let allExamQuestions = EXAM_QUESTIONS.map(q => createShuffledQuestion(q));

    // Todas las preguntas están disponibles
    examQuestions = allExamQuestions;

    // Mostrar interfaz de examen
    hideElement(modeSelector);
    hideElement(practiceSelector);
    hideElement(practiceInterface);
    hideElement(resultsInterface);
    hideElement(practiceResultsInterface);
    showElement(examInterface);

    // Mostrar primera pregunta
    displayExamQuestion(0);

    // Guardar estado inicial (incluyendo preguntas mezcladas)
    saveState('examState', {
        currentQuestion: 0,
        answers: examAnswers,
        startTime: new Date().getTime(),
        shuffledQuestions: examQuestions
    });
}

// Mostrar pregunta actual del examen
function displayExamQuestion(questionIndex) {
    if (questionIndex < 0 || questionIndex >= examQuestions.length) {
        return;
    }

    currentExamQuestion = questionIndex;
    const question = examQuestions[questionIndex];

    // Actualizar número de pregunta
    document.getElementById('currentQuestion').textContent = questionIndex + 1;
    document.getElementById('totalQuestions').textContent = examQuestions.length;

    // Actualizar barra de progreso
    const percentage = ((questionIndex + 1) / examQuestions.length) * 100;
    document.getElementById('progressBarFill').style.width = percentage + '%';
    document.getElementById('progressPercentage').textContent = Math.round(percentage) + '%';

    // Mostrar materia
    const subjectBadge = document.getElementById('subjectBadge');
    const subjectName = getSubjectName(question.subject);
    subjectBadge.textContent = subjectName;
    subjectBadge.style.backgroundColor = getSubjectColor(question.subject);

    // Mostrar pregunta
    document.getElementById('questionText').textContent = question.question;

    // Renderizar opciones
    renderOptions(question, 'optionsContainer', examAnswers, questionIndex, (selectedIndex) => {
        selectExamAnswer(questionIndex, selectedIndex);
    });

    // Actualizar estado de botones
    document.getElementById('prevBtn').disabled = questionIndex === 0;
    document.getElementById('nextBtn').disabled = questionIndex === examQuestions.length - 1;

    // Cambiar texto del botón siguiente si es la última pregunta
    if (questionIndex === examQuestions.length - 1) {
        document.getElementById('nextBtn').textContent = 'Finalizar Examen →';
        document.getElementById('nextBtn').disabled = false;
        document.getElementById('nextBtn').onclick = finishExam;
    } else {
        document.getElementById('nextBtn').textContent = 'Siguiente →';
        document.getElementById('nextBtn').onclick = nextQuestion;
    }

    // Guardar estado cada vez que se muestra pregunta
    saveState('examState', {
        currentQuestion: questionIndex,
        answers: examAnswers,
        startTime: getState('examState')?.startTime || new Date().getTime(),
        shuffledQuestions: examQuestions
    });
}

// Seleccionar respuesta en examen
function selectExamAnswer(questionIndex, selectedIndex) {
    // determinar ID global del reactivo
    const question = examQuestions[questionIndex];
    const reactivoId = question && question.id ? question.id : `exam-${questionIndex}`;
    // no permitir si ya respondido localmente o en la lista global
    if (examAnswers[questionIndex] !== undefined || isReactivoAnswered(reactivoId)) {
        return;
    }

    // registrar globalmente con respuesta
    addAnsweredReactivo(reactivoId, selectedIndex);

    examAnswers[questionIndex] = selectedIndex;
    saveState('examState', {
        currentQuestion: currentExamQuestion,
        answers: examAnswers,
        startTime: getState('examState')?.startTime || new Date().getTime(),
        shuffledQuestions: examQuestions
    });
}

// Ir a siguiente pregunta del examen
function nextQuestion() {
    if (currentExamQuestion < examQuestions.length - 1) {
        displayExamQuestion(currentExamQuestion + 1);
    }
}

// Ir a pregunta anterior del examen
function previousQuestion() {
    if (currentExamQuestion > 0) {
        displayExamQuestion(currentExamQuestion - 1);
    }
}

// Finalizar examen
function finishExam() {
    // Calcular resultados
    const { correct, incorrect, unanswered } = countAnswers(examAnswers, examQuestions);
    const percentage = (correct / examQuestions.length) * 100;

    // Obtener resultados por materia
    const resultsBySubject = getResultsBySubject(examAnswers, examQuestions);

    // Mostrar interfaz de resultados
    hideElement(examInterface);
    hideElement(practiceInterface);
    hideElement(modeSelector);
    hideElement(practiceSelector);
    hideElement(practiceResultsInterface);
    showElement(resultsInterface);

    // Actualizar datos de resultados
    document.getElementById('scoreText').textContent = Math.round(percentage) + '%';
    document.getElementById('scoreMessage').textContent = getScoreDescription(percentage);

    document.getElementById('correctCount').textContent = correct;
    document.getElementById('incorrectCount').textContent = incorrect;
    document.getElementById('unansweredCount').textContent = unanswered;

    // Mostrar resultados por materia
    const resultsBySubjectContainer = document.getElementById('resultsBySubject');
    resultsBySubjectContainer.innerHTML = '<h3>Resultados por Materia:</h3>';

    Object.keys(resultsBySubject).forEach(subjectId => {
        const data = resultsBySubject[subjectId];
        if (data.total > 0) {
            const subjectPercentage = (data.correct / data.total) * 100;
            const div = document.createElement('div');
            div.className = 'subject-result';
            div.innerHTML = `
                <span class="subject-result-name">${data.name}</span>
                <span class="subject-result-score">${data.correct}/${data.total} (${Math.round(subjectPercentage)}%)</span>
            `;
            resultsBySubjectContainer.appendChild(div);
        }
    });

    // Marcar examen como completado y guardar permanentemente
    examCompleted = true;
    localStorage.setItem('examCompleted', 'true');

    // Limpiar estado
    clearState('examState');
}

// Mostrar revisión de preguntas
function showQuestionReview() {
    const modal = document.getElementById('questionReviewModal');
    const reviewList = document.getElementById('questionReviewList');
    reviewList.innerHTML = '';

    examQuestions.forEach((question, index) => {
        const isAnswered = examAnswers[index] !== undefined;
        let isCorrect = false;
        if (isAnswered) {
            isCorrect = examAnswers[index] === question.correctAnswer;
        }

        const reviewItem = createQuestionReviewItem(index, isAnswered, isCorrect, currentExamQuestion, (idx) => {
            closeQuestionReview();
            displayExamQuestion(idx);
        });

        reviewList.appendChild(reviewItem);
    });

    showElement(modal);
}

// Cerrar revisión de preguntas
function closeQuestionReview() {
    hideElement(document.getElementById('questionReviewModal'));
}
