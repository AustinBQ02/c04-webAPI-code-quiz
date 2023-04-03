// quiz vars
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// DOM vars
let questionsEl = document.getElementById("questions");
let timerEl = document.getElementById("time");
let choicesEl = document.getElementById("choices");
let submitBtn = document.getElementById("submit");
let startBtn = document.getElementById("start");
let initialsEl = document.getElementById("initials");
let feedbackEl = document.getElementById("feedback");

// start the quiz
const startQuiz = () => {
  let startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  getQuestion();
};

// display questions from array
const getQuestion = () => {
  let currentQuestion = questions[currentQuestionIndex];
  let titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = "";

  // loop over choices array
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    let choice = currentQuestion.choices[i];
    let choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choicesEl.appendChild(choiceNode);
  }
};

const questionClick = (event) => {
  let buttonEl = event.target;

  if (!buttonEl.matches(".choice")) {
    return;
  }

  // deduct time iff wrong
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;

    feedbackEl.textContent = "Wrong!";
  } else {
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  currentQuestionIndex++;

  // check if end of questions array
  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
};

const quizEnd = () => {
  // stop timer
  clearInterval(timerId);

  let endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  let finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
};

const clockTick = () => {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
};

const saveHighscore = () => {
  let initials = initialsEl.value.trim();

  if (initials !== "") {
    let highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    let newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "scores.html";
  }
};

// save if enter key is pressed
const checkForEnter = (event) => {
  if (event.key === "Enter") {
    saveHighscore();
  }
};

// call functions on events
submitBtn.onclick = saveHighscore;

startBtn.onclick = startQuiz;

choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;
