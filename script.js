const questions = [
    {
        question: "What is the capital of France?",
        answer: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "What is the capital of Germany?",
        answer: [
            { text: "Berlin", correct: true },
            { text: "Paris", correct: false },
            { text: "London", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "What is the capital of Italy?",
        answer: [
            { text: "Rome", correct: true },
            { text: "Paris", correct: false },
            { text: "London", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "What is the capital of Spain?",
        answer: [
            { text: "Madrid", correct: true },
            { text: "Paris", correct: false },
            { text: "London", correct: false },
            { text: "Berlin", correct: false }
        ]
    },
    {
        question: "What is the capital of England?",
        answer: [
            { text: "London", correct: true },
            { text: "Paris", correct: false },
            { text: "Madrid", correct: false },
            { text: "Berlin", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answersBtns = document.getElementById('answers-btns');
const nextBtn = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    resetState();
    currentQuestionIndex = 0;
    score = 0; 
    nextBtn.innerHTML = 'Next Question';
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let QuestionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = QuestionNo + '. ' + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answersBtns.appendChild(button);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answersBtns.firstChild) {
        answersBtns.removeChild(answersBtns.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;

    if (correct) {
        score++;
    }

    Array.from(answersBtns.children).forEach(button => {
        if (button.dataset.correct) {
            button.style.backgroundColor = 'lightgreen';
        } else {
            button.style.backgroundColor = 'crimson';
        }
        button.disabled = true;
    });

    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        resetState();
        showQuestion();
    } else {
        alert(`Quiz finished! Your score is ${score} out of ${questions.length}`);
        startQuiz();
    }
});

startQuiz();