// use window to find certain properties
let windowWidth = window.innerWidth;
// console.log(windowWidth);
// find out information about url location
// console.log(window.location);
// document can be used to find html elements
// console.log(document.title);
// set the title
// document.title = "new title";
// can find the body
// document.body.style.backgroundcolor = "red";
// navigator can find more details of hardware/software
// console.log(window.Navigator.userAgent);

const myImage = document.querySelector("#myImage");

console.log(myImage);

const helloParagraph = document.querySelector("#hello");
console.log(helloParagraph);

const myParagraphs = document.querySelectorAll("p");

console.log(myParagraphs);

myParagraphs.forEach(changeParaBG);

function changeParaBG(item) {
  console.log(item);
  item.style.backgroundColor = "red";
}

// first find conten of hello p
console.log(helloParagraph.textContent);
helloParagraph.textContent = `Hi! My name is ${myImage.dataset.catname}`;

function updateCatName() {
  helloParagraph.textContent = `Hi! My name is ${myImage.dataset.catname}`;
  // classlist.add() adds a class
  // classlist.remove() removes a class
  // classlist.toggle() toggles a class
  myImage.classList.toggle("round");
}

// find outer sectiion
const outerSection = document.querySelector(".outer");

const myButton = document.querySelector("#my-button");

//add a eventlistener to button
myButton.addEventListener("click", function () {
  alert("button is clicked");
});
//could be written as and arrow function
//() => {}
// same as function() {}

// create element using document methods
const newPara = document.createElement("p");
newPara.textContent = "I'm a new paragraph";
newPara.classList.add("coral-box");
myButton.appendChild(newPara);

//look at paragraph in console
console.log(newPara);

//add new element to header
const myHeader = document.querySelector("header");
//find my cat name
let catName = myImage.dataset.catname;
myHeader.innerHTML += "<h2>I think ${catName} they're pretty cool</h2>";

//+= works for maths too
let x = 0;
x = x + 2;
//x = x + 4;
x += 4;

// add mouseenter event listener to image
myImage.addEventListener("mouseenter", addRoundClass);

function addRoundClass() {
  myImage.classList.add("round");
}

myImage.addEventListener("mouseleave", removeRoundClass);

function removeRoundClass() {
  myImage.classList.remove("round");
}
//need review and debug!!!!
