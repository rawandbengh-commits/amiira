
/* =================================
   1. QUESTIONS DU QUIZ
================================= */

const questions = [

    {
        icon: "🛏️",
        question: "Où est-ce qu'on dort la nuit ?",
        answers: ["Dans la cuisine", "Dans la chambre", "Dans le jardin"],
        correct: 1,
        explanation: "Bravo ! On dort dans la chambre. 🛏️"
    },

    {
        icon: "🍳",
        question: "Où prépare-t-on le repas ?",
        answers: ["Dans la cuisine", "Dans le salon", "Dans le garage"],
        correct: 0,
        explanation: "Exact ! On prépare le repas dans la cuisine. 🍳"
    },

    {
        icon: "🚿",
        question: "Où prend-on une douche ?",
        answers: ["Dans le jardin", "Dans la chambre", "Dans la salle de bain"],
        correct: 2,
        explanation: "Super ! La douche se trouve dans la salle de bain. 🚿"
    },

    {
        icon: "🛋️",
        question: "Où regarde-t-on la télévision ?",
        answers: ["Dans le salon", "Dans le garage", "Dans la cuisine"],
        correct: 0,
        explanation: "Bravo ! On regarde souvent la télévision au salon. 📺"
    },

    {
        icon: "🚪",
        question: "Quel objet permet d'entrer dans la maison ?",
        answers: ["Une chaise", "Une porte", "Une lampe"],
        correct: 1,
        explanation: "Très bien ! On entre dans la maison par la porte. 🚪"
    },

    {
        icon: "🪟",
        question: "Par quoi peut-on regarder dehors ?",
        answers: ["Un lit", "Une table", "Une fenêtre"],
        correct: 2,
        explanation: "Bravo ! On regarde dehors par la fenêtre. 🪟"
    },

    {
        icon: "🧊",
        question: "Où garde-t-on les aliments au frais ?",
        answers: ["Dans le réfrigérateur", "Dans le lit", "Dans l'armoire"],
        correct: 0,
        explanation: "Exact ! Le réfrigérateur garde les aliments au frais. 🧊"
    },

    {
        icon: "🪥",
        question: "Où se lave-t-on les dents ?",
        answers: ["Dans le salon", "Dans la salle de bain", "Dans le jardin"],
        correct: 1,
        explanation: "Bravo ! On se lave les dents dans la salle de bain. 🪥"
    },

    {
        icon: "🪑",
        question: "Sur quoi peut-on s'asseoir ?",
        answers: ["Une fenêtre", "Une porte", "Une chaise"],
        correct: 2,
        explanation: "Super ! On peut s'asseoir sur une chaise. 🪑"
    },

    {
        icon: "💡",
        question: "Qu'est-ce qui éclaire une pièce ?",
        answers: ["Une lampe", "Un coussin", "Un tapis"],
        correct: 0,
        explanation: "Très bien ! La lampe éclaire la pièce. 💡"
    },

    {
        icon: "🧹",
        question: "Quel objet utilise-t-on pour nettoyer le sol ?",
        answers: ["Une fourchette", "Un balai", "Un oreiller"],
        correct: 1,
        explanation: "Bravo ! Le balai sert à nettoyer le sol. 🧹"
    },

    {
        icon: "🛁",
        question: "Dans quelle pièce trouve-t-on une baignoire ?",
        answers: ["Dans le salon", "Dans la cuisine", "Dans la salle de bain"],
        correct: 2,
        explanation: "Excellent ! La baignoire est dans la salle de bain. 🛁"
    },

    {
        icon: "🛏️",
        question: "Sur quoi pose-t-on sa tête pour dormir ?",
        answers: ["Un oreiller", "Une table", "Une chaise"],
        correct: 0,
        explanation: "Bravo ! On pose sa tête sur un oreiller. 😴"
    },

    {
        icon: "🌳",
        question: "Où peut-on trouver des fleurs et des arbres ?",
        answers: ["Dans le garage", "Dans le jardin", "Dans la salle de bain"],
        correct: 1,
        explanation: "Génial ! Les fleurs et les arbres poussent dans le jardin. 🌻"
    },

    {
        icon: "🍽️",
        question: "Sur quoi mange-t-on généralement ?",
        answers: ["Sur un lit", "Sur un canapé", "Sur une table"],
        correct: 2,
        explanation: "Félicitations ! On mange généralement à table. 🍽️"
    }

];

/* =================================
   2. VARIABLES DU JEU
================================= */

let currentQuestion = 0;
let score = 0;
let answered = false;

/* =================================
   3. ELEMENTS HTML
================================= */

const homeScreen = document.getElementById("home-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const questionIcon = document.getElementById("question-icon");

const answersContainer =
    document.getElementById("answers-container");

const feedback = document.getElementById("feedback");

const scoreElement = document.getElementById("score");

const progressFill = document.getElementById("progress-fill");

const questionNumber =
    document.getElementById("question-number");

const progressPercent =
    document.getElementById("progress-percent");

/* =================================
   4. CHANGER DE PAGE
================================= */

function showScreen(screen) {

    document.querySelectorAll(".screen").forEach(page => {
        page.classList.remove("active");
    });

    screen.classList.add("active");
}

/* =================================
   5. COMMENCER LE JEU
================================= */

startBtn.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    scoreElement.textContent = score;

    showScreen(quizScreen);

    displayQuestion();

});

/* =================================
   6. AFFICHER UNE QUESTION
================================= */

function displayQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    questionText.textContent = q.question;

    questionIcon.textContent = q.icon;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    const progress = Math.round(
        ((currentQuestion + 1) / questions.length) * 100
    );

    progressFill.style.width = progress + "%";

    progressPercent.textContent = progress + "%";

    feedback.className = "feedback hidden";

    feedback.textContent = "";

    nextBtn.classList.add("hidden");

    answersContainer.innerHTML = "";

    // Création des boutons de réponses

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersContainer.appendChild(button);

    });

}

/* =================================
   7. VERIFIER LA REPONSE
================================= */

function checkAnswer(selectedIndex, selectedButton) {

    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];

    const buttons =
        answersContainer.querySelectorAll(".answer-btn");

    // Désactiver tous les boutons

    buttons.forEach(button => {
        button.disabled = true;
    });

    // Réponse correcte

    if (selectedIndex === q.correct) {

        score++;

        selectedButton.classList.add("correct");

        feedback.className = "feedback success";

        feedback.textContent =
            "🎉 Bravo ! " + q.explanation;

    }

    // Réponse incorrecte

    else {

        selectedButton.classList.add("wrong");

        buttons[q.correct].classList.add("correct");

        feedback.className = "feedback error";

        feedback.textContent =
            "😊 Ce n'est pas grave ! " +
            "La bonne réponse est : " +
            q.answers[q.correct] + ". " +
            q.explanation;

    }

    scoreElement.textContent = score;

    nextBtn.classList.remove("hidden");

}

/* =================================
   8. PASSER A LA QUESTION SUIVANTE
================================= */

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        displayQuestion();

    } else {

        showResults();

    }

});

/* =================================
   9. AFFICHER LES RESULTATS
================================= */

function showResults() {

    showScreen(resultScreen);

    const total = questions.length;

    document.getElementById("final-score").textContent =
        score + " / " + total;

    const percentage = (score / total) * 100;

    let stars;
    let message;
    let description;

    if (percentage >= 80) {

        stars = "⭐⭐⭐";

        message = "Tu es un champion ! 🏆";

        description =
            "Incroyable ! Tu connais très bien la maison. Continue comme ça !";

    }

    else if (percentage >= 50) {

        stars = "⭐⭐";

        message = "Très bon travail ! 🌟";

        description =
            "Tu as bien travaillé ! Encore un petit effort et tu seras un champion !";

    }

    else {

        stars = "⭐";

        message = "Bravo pour tes efforts ! ❤️";

        description =
            "Tu apprends petit à petit ! Rejoue pour devenir encore meilleur !";

    }

    document.getElementById("result-message").textContent =
        message;

    document.getElementById("stars-result").textContent =
        stars;

    document.getElementById("result-description").textContent =
        description;

}

/* =================================
   10. RECOMMENCER LE JEU
================================= */

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    scoreElement.textContent = "0";

    showScreen(homeScreen);

});