const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hypertext Markup Language", "Hyper Tool Markup Language", "Hyperlink Text Markup Language", "Home Tool Markup Language"],
    answer: "Hypertext Markup Language"
  },
  {
    question: "What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "1993"],
    answer: "1995"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

const quizContainer = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("time");
const progressEl = document.getElementById("progress");

function loadQuestion() {
  if (currentQuestion >= quizData.length) {
    endQuiz();
    return;
  }

  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <h2>${q.question}</h2>
    ${q.options.map(opt => 
      `<button class="option" onclick="selectAnswer(this)">${opt}</button>`
    ).join("")}
  `;

  updateProgress();
}

function selectAnswer(button) {
  const q = quizData[currentQuestion];
  if (button.innerText === q.answer) {
    score++;
    button.style.background = "green";
  } else {
    button.style.background = "red";
  }
  disableOptions();
}

function disableOptions() {
  const options = document.querySelectorAll(".option");
  options.forEach(opt => opt.disabled = true);
}

function nextQuestion() {
  currentQuestion++;
  loadQuestion();
}

function updateProgress() {
  const progressPercent = ((currentQuestion + 1) / quizData.length) * 100;
  progressEl.style.width = progressPercent + "%";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);
  localStorage.setItem("score", score);

  let highScore = localStorage.getItem("highScore") || 0;
  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }

  window.location.href = "result.html";
}

window.onload = () => {
  if (quizContainer) {
    loadQuestion();
    startTimer();
  }
};
