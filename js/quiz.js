const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
localStorage.setItem("focus", "true");

let questions = [];

fetch("questions.json").then(res => {
    return res.json();
})
.then(loadedQuestions => {
    questions = loadedQuestions;
    startQuiz();
})
.catch(err => {
    console.log(err);
});

//CONSTANTS
const CORRECT_SCORE = 4;
const INCORRECT_SCORE = -1;
const MAX_QUESTIONS = 3;

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const scoreCal = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(scoreCal == 'correct') {
            incrementScore(CORRECT_SCORE);
        } else if(scoreCal == 'incorrect') {
            incrementScore(INCORRECT_SCORE);
        }

        getNewQuestion();
    });
});

incrementScore = num => {
    score += num;
}

passFunction = () => {
    getNewQuestion();
}

//TIMER FUNCTION
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            localStorage.setItem('mostRecentScore', score);
            return window.location.assign('/end.html');
        }
    }, 1000);
}

function checkPageFocus() {
    if (!document.hasFocus()) {
      localStorage.setItem('focus', "false");  
      window.location.assign('/terminated.html');
    }
}
  
window.onload = function () {
    var timerDisplay = 60 * 20,
        display = document.querySelector('#time');
    startTimer(timerDisplay, display);
    setInterval(checkPageFocus, 300);
};

