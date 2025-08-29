// keep track of possible selections
const options = ["ROCK", "PAPER", "SCISSORS"];
//find user selection buttons
const rockButton = document.querySelector("#rock-button");
const paperButton = document.querySelector("#paper-button");
const scissorsButton = document.querySelector("#scissors-button");
//find selection and result sections
const selection = document.querySelector("#selection");
const result = document.querySelector("#result");

//write event listeners for user selection
//when they click we want to send the correct array index
rockButton.addEventListener("click", function () {
  checkResult(0);
});
paperButton.addEventListener("click", function () {
  checkResult(1);
});
scissorsButton.addEventListener("click", function () {
  checkResult(2);
});

//find user seleciton from array
function checkResult(mySelection) {
  let userSelection = options[mySelection];
  console.log(userSelection);

  // find computer selection
  //random select generates randomw number between 0-1, then multiplies by 3, then rounds down
  let randomSelect = Math.floor(Math.random() * 3);
  console.log(randomSelect);
  let computerSelection = options[randomSelect];

  // display both users and computers selection in the DOM
  selection.innerHTML = `
<p id="my-choice">
<span class="${userSelection.toLowerCase()}">You picked:${userSelection}</span>
</p>
<p id="computer-choice">
<span class="${computerSelection.toLowerCase()}">Computer picked:${computerSelection}</span>
</p>
`;
  result.innerHTML = `<p class="tie"> It was a tie :| </p>`;
  if (userSelection === computerSelection) {
  } else if (
    (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (userSelection === "PAPER" && computerSelection === "ROCK") ||
    (userSelection === "SCISSORS" && computerSelection === "PAPER")
  ) {
    result.innerHTML = `<p class="win"> you win :) </p>`;
  } else {
    result.innerHTML = `<p class="lose"> you lose :( </p>`;
  }
}
