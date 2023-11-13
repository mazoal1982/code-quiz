const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("time");
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
const questions = [
  {
    text: "What does CSS stand for?",
    question: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    text: "What is the correct syntax for referring to an external script called 'script.js'?",
    question: ["<script src='script.js'>", "<script href='script.js'>", "<script name='script.js'>", "<script file='script.js'>"],
    answer: "<script src='script.js'>"
  },
  {
    text: "Inside which HTML element do we put the JavaScript?",
    question: ["<script>", "<javascript>", "<scripting>", "<js>"],
    answer: "<script>"
  },
  {
    text: "What is the correct syntax for creating a new array in JavaScript?",
    question: ["var myArray = [];", "var myArray = {};", "var myArray = new array();", "var myArray = array();"],
    answer: "var myArray = [];"
  },

];
function startQuiz() {
  startButton.style.display = "none";
  showQuestion();
  startTimer();
}
function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    return
  } else {
    const question = questions[currentQuestionIndex];
    questionContainer.querySelector("#btn1").textContent = question.question[0]
    questionContainer.querySelector("#btn2").textContent = question.question[1]
    questionContainer.querySelector("#btn3").textContent = question.question[2]
    questionContainer.querySelector("#btn4").textContent = question.question[3]
    questionContainer.querySelector("#question").textContent = question.text;
    const choiceButtons = questionContainer.querySelectorAll(".question");
    if (currentQuestionIndex == 0) {
      choiceButtons.forEach((button, index) => {
        console.log(button)
        console.log(index)
        // button.textContent = question.question[index];
        button.addEventListener("click", (e) => {
          const question = questions[currentQuestionIndex];
          questionContainer.querySelector("#btn1").textContent = question.question[0]
          questionContainer.querySelector("#btn2").textContent = question.question[1]
          questionContainer.querySelector("#btn3").textContent = question.question[2]
          questionContainer.querySelector("#btn4").textContent = question.question[3]
          console.log(e.target.textContent)
          console.log(question.answer)
          if (e.target.textContent === question.answer) {
            score += 10;
            scoreElement.textContent = score;
          } else {
            timeLeft -= 10;
            timerElement.textContent = timeLeft;
          }
          currentQuestionIndex++;
          if (currentQuestionIndex < 4) {
            showQuestion();
          } else {
            endQuiz();
          }
        }

        );
      });
    }
  }
}
// function checkAnswer(choiceIndex) {
//   
// }
function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}
function endQuiz() {

  const timeTaken = 60 - timeLeft;

  questionContainer.style.display = "none";
  timerElement.style.display = "none";

  const gameOverScreen = document.createElement("div");
  gameOverScreen.id = "game-over";
  gameOverScreen.innerHTML = `
<h2>Game Over</h2>
<p>Your score: ${score}</p>
<p>Time taken: ${timeTaken} seconds</p>
<label for="initials">Enter your initials: </label>
<input type="text" id="initials" maxlength="3">
<button id="save-score">Save Score</button>
`;
  document.body.appendChild(gameOverScreen);
  const initialsInput = gameOverScreen.querySelector("#initials");
  const saveScoreButton = gameOverScreen.querySelector("#save-score");
  saveScoreButton.addEventListener("click", () => {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
      saveHighScore(initials, score);
      gameOverScreen.innerHTML = `<p>Score saved!</p>`;
    }
  });
}
function saveHighScore(initials, score) {

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  highScores.push({ initials, score });

  highScores.sort((a, b) => b.score - a.score);

  localStorage.setItem("highScores", JSON.stringify(highScores));
}
startButton.addEventListener("click", startQuiz);