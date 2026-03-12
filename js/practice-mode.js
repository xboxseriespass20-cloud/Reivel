// Lógica del Modo Práctica por Materia

// Iniciar modo práctica para una materia específica
function startPracticeMode(subjectId) {
    // Inicializar variables
    currentPracticeQuestion = 0;
    practiceAnswers = {};
    currentPracticeSubject = subjectId;
    currentExamMode = 'practice';

    // Cargar preguntas de práctica de la materia
    let practiceQuestionsArray = getPracticeQuestionsBySubject(subjectId);

    if (!practiceQuestionsArray || practiceQuestionsArray.length === 0) {
        alert('No hay preguntas de práctica disponibles para esta materia.');
        return;
    }

    // Mezclar preguntas
    practiceQuestions = shuffleQuestions(practiceQuestionsArray);

    // Mostrar interfaz de práctica
    hideElement(modeSelector);
    hideElement(practiceSelector);
    hideElement(examInterface);
    hideElement(resultsInterface);
    hideElement(practiceResultsInterface);
    showElement(practiceInterface);

    // Mostrar primera pregunta
    displayPracticeQuestion(0);

    // Guardar estado inicial
    saveState('practiceState', {
        subjectId: subjectId,
        currentQuestion: 0,
        answers: practiceAnswers
    });
}

// Mostrar pregunta actual de práctica
function displayPracticeQuestion(questionIndex) {
    if (questionIndex < 0 || questionIndex >= practiceQuestions.length) {
        return;
    }

    currentPracticeQuestion = questionIndex;
    const question = practiceQuestions[questionIndex];

    // Actualizar número de pregunta
    document.getElementById('practiceCurrentQuestion').textContent = questionIndex + 1;
    document.getElementById('practiceTotalQuestions').textContent = practiceQuestions.length;

    // Actualizar barra de progreso
    const percentage = ((questionIndex + 1) / practiceQuestions.length) * 100;
    document.getElementById('practiceProgressBarFill').style.width = percentage + '%';
    document.getElementById('practiceProgressPercentage').textContent = Math.round(percentage) + '%';

    // Mostrar materia
    const subjectBadge = document.getElementById('practiceSubjectBadge');
    const subjectName = getSubjectName(currentPracticeSubject);
    subjectBadge.textContent = subjectName;
    subjectBadge.style.backgroundColor = getSubjectColor(currentPracticeSubject);

    // Mostrar pregunta
    document.getElementById('practiceQuestionText').textContent = question.question;

    // Renderizar opciones
    const questionWithCorrectAnswer = { ...question, correctAnswer: question.correct };

    renderOptions(questionWithCorrectAnswer, 'practiceOptionsContainer', practiceAnswers, questionIndex, (selectedIndex) => {
        selectPracticeAnswer(questionIndex, selectedIndex);
    });

    // Actualizar estado de botones
    document.getElementById('practicePrevBtn').disabled = questionIndex === 0;
    document.getElementById('practiceNextBtn').disabled = questionIndex === practiceQuestions.length - 1;

    // Cambiar texto del botón siguiente si es la última pregunta
    if (questionIndex === practiceQuestions.length - 1) {
        document.getElementById('practiceNextBtn').textContent = 'Finalizar Práctica →';
        document.getElementById('practiceNextBtn').disabled = false;
        document.getElementById('practiceNextBtn').onclick = finishPractice;
    } else {
        document.getElementById('practiceNextBtn').textContent = 'Siguiente →';
        document.getElementById('practiceNextBtn').onclick = nextPracticeQuestion;
    }

    // Guardar estado
    saveState('practiceState', {
        subjectId: currentPracticeSubject,
        currentQuestion: questionIndex,
        answers: practiceAnswers
    });
}

// Seleccionar respuesta en práctica
function selectPracticeAnswer(questionIndex, selectedIndex) {
    // evitar reescribir si ya se contestó
    if (practiceAnswers[questionIndex] !== undefined) return;

    // registrar ID global con respuesta
    const question = practiceQuestions[questionIndex] || {};
    let reactivoId = question.id;
    if (!reactivoId) {
        reactivoId = `${currentPracticeSubject}-${questionIndex}`;
    }
    addAnsweredReactivo(reactivoId, selectedIndex);

    practiceAnswers[questionIndex] = selectedIndex;

    // Mostrar retroalimentación antes de continuar
    showPracticeFeedback(questionIndex, selectedIndex);

    // Guardar estado
    saveState('practiceState', {
        subjectId: currentPracticeSubject,
        currentQuestion: currentPracticeQuestion,
        answers: practiceAnswers
    });
}

// Mostrar retroalimentación de la respuesta
function showPracticeFeedback(questionIndex, selectedIndex) {
    const question = practiceQuestions[questionIndex];
    const isCorrect = selectedIndex === question.correct;
    const correctAnswer = question.options[question.correct];

    // Ocultar opciones y mostrar retroalimentación
    const optionsContainer = document.getElementById('practiceOptionsContainer');
    const feedbackContainer = document.createElement('div');
    feedbackContainer.id = 'practiceFeedback';
    feedbackContainer.className = 'practice-feedback';

    feedbackContainer.innerHTML = `
        <div class="feedback-result ${isCorrect ? 'correct' : 'incorrect'}">
            <div class="feedback-icon">${isCorrect ? '✅' : '❌'}</div>
            <h3>${isCorrect ? '¡Correcto!' : 'Incorrecto'}</h3>
            <p><strong>Tu respuesta:</strong> ${question.options[selectedIndex]}</p>
            <p><strong>Respuesta correcta:</strong> ${correctAnswer}</p>
            <div class="feedback-explanation">
                <strong>Explicación:</strong><br>
                ${question.explanation || 'No hay explicación disponible para esta pregunta.'}
            </div>
            <button class="btn btn-primary" onclick="continuePracticeQuestion()">Continuar →</button>
        </div>
    `;

    // Reemplazar opciones con retroalimentación
    optionsContainer.innerHTML = '';
    optionsContainer.appendChild(feedbackContainer);
}

// Continuar a la siguiente pregunta después de la retroalimentación
function continuePracticeQuestion() {
    const nextIndex = currentPracticeQuestion + 1;

    if (nextIndex >= practiceQuestions.length) {
        // Si es la última pregunta, finalizar
        finishPractice();
    } else {
        // Mostrar siguiente pregunta
        displayPracticeQuestion(nextIndex);
    }
}

// Ir a siguiente pregunta de práctica
function nextPracticeQuestion() {
    if (currentPracticeQuestion < practiceQuestions.length - 1) {
        displayPracticeQuestion(currentPracticeQuestion + 1);
    }
}

// Ir a pregunta anterior de práctica
function previousPracticeQuestion() {
    if (currentPracticeQuestion > 0) {
        displayPracticeQuestion(currentPracticeQuestion - 1);
    }
}

// Finalizar práctica
function finishPractice() {
    // Calcular resultados (mapear correct -> correctAnswer)
    const questionsForCounting = practiceQuestions.map(q => ({
        ...q,
        correctAnswer: q.correct
    }));

    const { correct, incorrect, unanswered } = countAnswers(practiceAnswers, questionsForCounting);
    const percentage = (correct / practiceQuestions.length) * 100;

    // Mostrar interfaz de resultados de práctica
    hideElement(practiceInterface);
    hideElement(examInterface);
    hideElement(modeSelector);
    hideElement(practiceSelector);
    hideElement(resultsInterface);
    showElement(practiceResultsInterface);

    // Actualizar datos de resultados
    document.getElementById('practiceScoreText').textContent = Math.round(percentage) + '%';
    document.getElementById('practiceScoreMessage').textContent = getScoreDescription(percentage);

    document.getElementById('practiceCorrectCount').textContent = correct;
    document.getElementById('practiceIncorrectCount').textContent = incorrect;
    document.getElementById('practiceUnansweredCount').textContent = unanswered;

    // Limpiar estado
    clearState('practiceState');
}

// Mostrar revisión de preguntas de práctica
function showPracticeQuestionReview() {
    const modal = document.getElementById('practiceQuestionReviewModal');
    const reviewList = document.getElementById('practiceQuestionReviewList');
    reviewList.innerHTML = '';

    practiceQuestions.forEach((question, index) => {
        const isAnswered = practiceAnswers[index] !== undefined;
        let isCorrect = false;
        if (isAnswered) {
            isCorrect = practiceAnswers[index] === question.correct;
        }

        const reviewItem = createQuestionReviewItem(index, isAnswered, isCorrect, currentPracticeQuestion, (idx) => {
            closePracticeQuestionReview();
            displayPracticeQuestion(idx);
        });

        reviewList.appendChild(reviewItem);
    });

    showElement(modal);
}

// Cerrar revisión de preguntas de práctica
function closePracticeQuestionReview() {
    hideElement(document.getElementById('practiceQuestionReviewModal'));
}
