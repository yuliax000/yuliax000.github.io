// find my elements
const appBody = document.querySelector("body");
const scoreInput = document.querySelector("#scoreInput");
const scoreReturnText = document.querySelector("#scoreReturn");

function interpretScore() {
  console.log(scoreInput.value);
  let inputScore = scoreInput.value;
  if (inputScore < 50) {
    scoreReturnText.textContent = "fail";
    appBody.style.backgroundColor = "red";
  } else if (inputScore < 60) {
    scoreReturnText.textContent = "pass";
    appBody.style.backgroundColor = "tomato";
  } else if (inputScore < 70) {
    scoreReturnText.textContent = "good";
    appBody.style.backgroundColor = "yellow";
  } else if (inputScore < 80) {
    scoreReturnText.textContent = "distinction";
    appBody.style.backgroundColor = "skyblue";
  } else if (inputScore <= 100) {
    scoreReturnText.textContent = "high distinction";
    appBody.style.backgroundColor = "blue";
  }
}

// score 0 - 50 : fail
// score 50 - 60 : pass
// score 60 - 70 : good
// score 70 - 80 : distinction
// temp 80 + : high distinction
// this is a function call
// interpretTemp();
