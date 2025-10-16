import questions from "../json/quiz.json";
import "../scss/style.scss";


// const API_URL = `${process.env.API_URL}?apiKey=${process.env.API_KEY}&limit=10&category=code`;


// const fetchData = fetch(API_URL)
// .then((response)=>{
//   return response.json();
// })
// .then((data)=>{
//   return data;
// });

// console.log(fetchData);


document.addEventListener("DOMContentLoaded", () => {
  let score = 0;
  let questionNo = 0;
  let timerId = null;
  let total = questions.length;
  const totalElement = document.getElementById("total");
  const scoreElement = document.getElementById("score");
  const secondsElement = document.getElementById("seconds");
  const questionElement = document.querySelector(".question-element");
  const quizBoxWrapperElement = document.querySelector(".quiz-box-wrapper");
  const optionsContainer = document.querySelector(".answer-element");
  const optionA = document.querySelector(".option-a");
  const optionB = document.querySelector(".option-b");
  const optionC = document.querySelector(".option-c");
  const optionD = document.querySelector(".option-d");

  totalElement.textContent = total;

  function currentQuestion() {
    const q = questions[questionNo];
    questionElement.textContent = q.question;
    optionA.textContent = q.options[0];
    optionB.textContent = q.options[1];
    optionC.textContent = q.options[2];
    optionD.textContent = q.options[3];
    timer(10);
    return q.answer;
  }

  let currentQuestionAnswer = currentQuestion();

  function questionSkipper() {
    if (questionNo < questions.length) {
      currentQuestionAnswer = currentQuestion();
    } else {
      questionElement.textContent = "🎉 Quiz Completed!";
      quizBoxWrapperElement.classList.add("done-quiz");
      document.querySelector(".answer-element").style.display = "none";
      clearInterval(timer());
    }
  }

  optionsContainer.addEventListener("click", function (e) {
    const selectedOption = e.target.textContent;
    if (!selectedOption) return;

    if (selectedOption === currentQuestionAnswer) {
      questionNo++;
      score++;
      scoreElement.textContent = score;
      questionSkipper();
    } else {
      questionNo++;
      score;
      scoreElement.textContent = score;
      questionSkipper();
      console.log("Wrong answer!");
    }
  });

  function nextQuestion() {
    questionNo++;
    questionSkipper();
  }

  function timer(duration) {
    let time = duration;
    secondsElement.textContent = time;
    clearInterval(timerId);
    timerId = setInterval(() => {
      time--;
      secondsElement.textContent = time;

      if (time < 0) {
        clearInterval(timerId);
        // questionSkipper();
        nextQuestion();
      }
    }, 1000);
    return timerId;

    // if (time < 0) {
    //   clearInterval(id);
    // }
  }
});

// timer(10)
