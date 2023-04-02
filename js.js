const questions = [
{
    question: "Какое число жизни?",
    answers:[
        {
        text:"11",
        correct: false
    },
    {
        text:"42",
        correct: true
    },
    {
        text:"1941",
        correct: false
    },
    {
        text:"24",
        correct: false
    }
]
},

{
    question: "Реши пример 0^0 ( В степени )",
    answers:[
        {
        text:"1",
        correct: true
    },
    {
        text:"11",
        correct: false
    },
    {
        text:"0",
        correct: false
    },
    {
        text:"1E...",
        correct: false
    }
]
},

{
    question: "Сколько тебе лет?",
    answers:[
        {
        text:"24",
        correct: false
    },
    {
        text:"24",
        correct: false
    },
    {
        text:"24",
        correct: false
    },
    {
        text:"5",
        correct: true
    }
]
},

{
    question: "Что нельзя сломав починить?",
    answers:[
        {
        text:"Да",
        correct: true
    },
    {
        text:"Логику",
        correct: false
    },
    {
        text:"Войну",
        correct: false
    },
    {
        text:"Еду",
        correct: false
    }
]
},

{
    question: "Да",
    answers:[
        {
        text:"Нет",
        correct: false
    },
    {
        text:"No",
        correct: true
    },
    {
        text:"Net",
        correct: false
    },
    {
        text:"Nein",
        correct: true
    }
]
},

{
    question: "Какой сейчас год",
    answers:[
        {
        text:"2023",
        correct: false
    },
    {
        text:"Обычный",
        correct: true
    },
    {
        text:"Новый",
        correct: false
    },
    {
        text:"Старый",
        correct: false
    }
]
},
]

const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Да";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNu = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNu + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnsw);
    })
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
};

function selectAnsw(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerBtns.children).forEach(button =>{
        if (button.dataset.correct === " true"){
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nextBtn.style.display = "block";
};


function showScore(){
    resetState();
    questionElement.innerHTML = `Вы набрали ${score} правильных ответов из ${questions.length}!`;
    nextBtn.innerHTML = "Играть снова!";
    nextBtn.style.display = "block";
};

function handleNExtButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click",() => {
    if (currentQuestionIndex < questions.length) {
        handleNExtButton();
    }else {
        startQuiz();
    }
});


startQuiz();
