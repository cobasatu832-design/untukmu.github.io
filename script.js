
const questions = [
  { question: "Apa ibu kota Indonesia?", answers: ["Jakarta", "Bandung", "Surabaya", "Medan"], correct: "Jakarta" },
  { question: "Planet terbesar di tata surya?", answers: ["Mars", "Jupiter", "Venus", "Saturnus"], correct: "Jupiter" },
  { question: "Warna primer yang bukan termasuk?", answers: ["Merah", "Kuning", "Hijau", "Biru"], correct: "Hijau" },
  { question: "Gunung tertinggi di Indonesia?", answers: ["Rinjani", "Semeru", "Kerinci", "Puncak Jaya"], correct: "Puncak Jaya" },
  { question: "Hewan tercepat di darat?", answers: ["Cheetah", "Kuda", "Singa", "Rusa"], correct: "Cheetah" },
  { question: "Simbol kimia untuk air?", answers: ["O2", "H2", "H2O", "HO2"], correct: "H2O" },
  { question: "Presiden pertama Indonesia?", answers: ["Soekarno", "Soeharto", "Habibie", "Jokowi"], correct: "Soekarno" },
  { question: "Alat musik dari Minang?", answers: ["Angklung", "Saluang", "Gamelan", "Sasando"], correct: "Saluang" },
  { question: "Waktu satu jam adalah?", answers: ["30 menit", "90 menit", "60 menit", "45 menit"], correct: "60 menit" },
  { question: "Binatang melompat dan membawa anak di kantong?", answers: ["Kanguru", "Panda", "Koala", "Beruang"], correct: "Kanguru" }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const scoreText = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

startButton.addEventListener('click', startGame);

function startGame() {
  startButton.classList.add('hide');
  score = 0;
  scoreText.innerText = 0;
  scoreContainer.classList.remove('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 10);
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  startTimer();
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer;
    button.classList.add('btn');
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearInterval(timer);
  timeLeft = 10;
  timerDisplay.innerText = `🕒 ${timeLeft}`;
  answerButtons.innerHTML = '';
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `🕒 ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(null);
    }
  }, 1000);
}

function selectAnswer(e) {
  clearInterval(timer);
  const selectedButton = e ? e.target : null;
  const correct = shuffledQuestions[currentQuestionIndex].correct;

  Array.from(answerButtons.children).forEach(button => {
    const isCorrect = button.innerText === correct;
    button.classList.add(isCorrect ? 'correct' : 'wrong');
  });

  if (selectedButton && selectedButton.innerText === correct) {
    score++;
    scoreText.innerText = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      setNextQuestion();
    } else {
      questionElement.innerText = "Quiz selesai! 🎉";
      answerButtons.innerHTML = '';
      startButton.innerText = "Main Lagi";
      startButton.classList.remove('hide');
    }
  }, 1000);
}
