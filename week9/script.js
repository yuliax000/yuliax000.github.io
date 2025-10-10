// find our elements
const transformOuter = document.querySelector(".outer");
const ball = document.querySelector(".ball");
const moveBtn = document.querySelector("#move-button");
const scaleBtn = document.querySelector("#scale-button");
const rotateBtn = document.querySelector("#rotate-button");
const resetBtn = document.querySelector("#reset-button");

// define our transform variables
let ballTranslateX = 0;
let ballRotate = 0;
let ballScale = 1;

// this function will take the current values and apple to ball
function updateTransform() {
  ball.style.transform = `translate(${ballTran}px) rotate(${ballRotate}deg) scale(${ballScale})`;

  // move our ball to the right
  function moveBall() {
    const parentSize = transformOuter.getBoundingClientRect();
    const goal = parentSize.width / 2 - 25;
    ballTranslateX += 10;
    
    updateTransform();
  }
  // attach to button
  moveBtn.addEventListener("click", moveBall);
}

// rotate our ball clockwise
function rotateball() {
  ballRotate += 15;
  updateTransform();
}
// attach to button
rotateball.addEventListener("click", rotateball);
