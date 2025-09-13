//Select needed elements
let questions = document.getElementById("questions");
let options = document.getElementById("options");
let timer = document.getElementById("timer");
let nextbtn = document.getElementById("nextbtn");
let finalscore = document.getElementById("finalscore");
let startquizbtn =document.getElementById("startquizbtn")
let backbtn = document.getElementById("backbtn")
let restartbtn = document.getElementById("restartbtn")

//manually set some questions 
const qs = [
  { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Markup Language", "Hyper Text Making Language"], ans: 0 },
  { q: "Which element is used to display an image in HTML?", options: ["img", "image", "src", "pic"], ans: 0 },
  { q: "Which CSS property is used to change the background color?", options: ["color", "background-color", "bgcolor", "background"], ans: 1 },
  { q: "Which symbol is used for comments in JavaScript?", options: ["//", "##", "!!", "**"], ans: 0 },
  { q: "Which element is used for the largest heading in HTML?", options: ["h6", "h3", "h1", "heading"], ans: 2 }
];



// declaration of needed variables
let current = 0;
let selected = null; // foe store options
let score = 0;
let timerId;
let remaintime = 10;

// initially hide restart btn
restartbtn.style.display="none"

// show questions fn
function showqsfn() {
    startquizbtn.style.display="none"
    backbtn.style.display="none"
    nextbtn.style.display = "none";
    
  //show final score
  if (current >= qs.length) {
    showFinalScore();
    questions.style.display="none"
    backbtn.style.display="block"
    restartbtn.style.display="block"
  }

  // Show current question
  questions.innerText =` Questions :${qs[current].q}`;

  // Show options
  options.innerHTML = qs[current].options.map((values, index) => `<input type="radio" name="question" value=${index}> ${values}<br>`).join("");

   
  // get the answer selection by user
  document.querySelectorAll("input[name='question']").forEach((radio, index) => {
    radio.addEventListener("change", () => {
      selected = index;
      nextbtn.style.display = "block";
      clearInterval(timerId);
      
      //disable the options after select a values
      document.querySelectorAll("input[name='question']").forEach(btn => {
      btn.disabled = true;
      
    });


      // If user answer is correct, increment the score
      if (selected === qs[current].ans) {
        score += 1;
      }


    });
  });

  // call the timer fn
  setTimer();
}



// Timer function
function setTimer() {
  clearInterval(timerId);
  remaintime = 10;
  timer.innerText = `Remaining Time: ${remaintime}s`;

  timerId = setInterval(() => {
    remaintime -= 1;
    timer.innerText = `Remaining Time: ${remaintime}s`;

    if (remaintime <= 0) {
      clearInterval(timerId);
      timer.innerText = "Oops! Time up!";
      nextbtn.style.display = "block";
    }
  }, 1000);
}

// Next question fn
function nextqs() {
  current++;
  showqsfn();
}

// Show final score
function showFinalScore() {
  questions.innerText = "Quiz Completed!";
  options.innerHTML = "";
  timer.innerText = "";
  nextbtn.style.display = "none";
  finalscore.innerText = `Your Final Score: ${score} / ${qs.length}`;
}



