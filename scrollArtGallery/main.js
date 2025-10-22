// I tried the method which contained in the reference video
// sadly it didn't work well, it's not smooth at all.

// -----------------------------------1st method tried--------------------------------------------------------
// let imgs = document.querySelector(`.imgs`);

// function next() {
//   let img = documents.querySelectorAll(`img`);
//   imgs.appendChild(img[0]);
// }

// function prev() {
//   let img = document.querySelector(`img`);
//   imgs.appendChild(img[imgs.length - 1]);
// }

// window.addEventListener("wheel", function (event) {
//   if (event.deltaY > 0) {
//     next();
//   } else {
//     prev();
//   }
// });

// -------------2nd method --------------
// const imgContainer = document.querySelector(".imgs");
// let imgs = Array.from(imgContainer.querySelectorAll("img"));

// imgContainer.prepend(...imgs.map((img) => img.cloneNode(true)));
// imgContainer.append(...imgs.map((img) => img.cloneNode(true)));
// imgs = Array.from(imgContainer.querySelectorAll("img"));

// const groupCount = imgs.length / 3;

// const left0 = imgs[0].offsetLeft;
// const left1 = imgs[1].offsetLeft;
// const gap = Math.max(0, left1 - left0 - imgs[0].offsetWidth);
// const imgWidth = imgs[0].offsetWidth + gap;
// const groupWidth = imgWidth * groupCount;

// // setting default shows the second group
// imgContainer.scrollLeft = groupWidth;

// let isJumping = false;

// //   make vertical scroll can control the picture's horizontal scroll

// // scroll to the edge of the 3rd / 1st group, jump to 2nd group
// function scrollEffect() {
//   if (isJumping) return;

//   const leftThreshold = groupWidth * 0.5;
//   const rightThreshold = groupWidth * 1.5;
//   if (imgContainer.scrollLeft < leftThreshold) {
//     isJumping = true;
//     imgContainer.style.scrollBehavior = "auto";
//     imgContainer.scrollLeft += groupWidth;
//     imgContainer.style.scrollBehavior = "smooth";
//     setTimeout(() => (isJumping = false), 0);
//   } else if (imgContainer.scrollLeft > rightThreshold) {
//     isJumping = true;
//     imgContainer.style.scrollBehavior = "auto";
//     imgContainer.scrollLeft -= groupWidth;
//     imgContainer.style.scrollBehavior = "smooth";
//     setTimeout(() => (isJumping = false), 0);
//   }

//   // find where the center is now
//   const centerX = imgContainer.scrollLeft + imgContainer.clientWidth / 2;
//   const halfCWidth = imgContainer.clientWidth / 2;

//   // set the blur, scale and opacity
//   imgs.forEach((img) => {
//     const imgCenter = img.offsetLeft + img.offsetWidth / 2;
//     const distance = Math.abs(centerX - imgCenter);
//     //   ratio of the distance to center and half the container width (for calculate the transition)
//     const ratio = Math.max(0, 1 - distance / halfCWidth);

//     // calculate the scale, opacity and blur's transition based on distance ratio
//     const scale = 0.7 + ratio * 0.5;
//     const opacity = 0.4 + ratio * 0.6;
//     const blurRem = (1 - ratio) * 5;

//     img.style.transform = `scale(${scale})`;
//     img.style.opacity = `${opacity}`;
//     img.style.filter = `blur(${blurRem}rem)`;
//   });
// }

// scrollEffect();

// imgContainer.addEventListener("scroll", () => {
//   scrollEffect();
// });

// I firstly tried to copy 3 groups of pictures to fake the infinite scroll effect
// the core is when scrolling to the bonding of final group, jump to first group;
// however the jumping process is obvious.

// At this stage it looks quite like infinite scroll, except the annoying jumping flash.

// ------------------3rd method----------------------
const imgContainer = document.querySelector(".imgs");
const slider = document.querySelector(".slider");
let imgs = [...document.querySelectorAll(".cards")];
let items = [...document.querySelectorAll(".sliderItem")];

let clones = [];
let containerWidth;
let groupWidth;
let scrollPos = 1;

// imgContainer.prepend(...imgs.map((img) => img.cloneNode(true)));
// imgContainer.append(...imgs.map((img) => img.cloneNode(true)));
// imgs = Array.from(imgContainer.querySelectorAll("img"));
items.forEach((item) => {
  let clone = item.cloneNode(true);
  clone.classList.add("clone");
  slider.appendChild(clone);
  clones.push(clone);
});

const gap = 0.05 * window.innerWidth;
const scrollRatio = 0.5;

function getImgWidth() {
  let width = 0;
  clones.forEach((div) => {
    width += div.offsetWidth;
  });
  return width;
}

function getScrollPosition() {
  return window.scrollY;
}

// map vertical scroll to horizontal scroll
function scrollUpdate() {
  scrollPos = getScrollPosition();

  if (scrollPos + groupWidth >= containerWidth) {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 1 });
    document.documentElement.style.scrollBehavior = "smooth";
    // scrollPos = 1;
    // scrollPos -= groupWidth;
  } else if (scrollPos <= 0) {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: containerWidth - groupWidth - 1 });
    document.documentElement.style.scrollBehavior = "smooth";
    // scrollPos = groupWidth / scrollRatio - 1;
    // scrollPos += groupWidth;
  }

  slider.style.transform = `translateX(${-window.scrollY}px)`;
  //   clone.style.transform = `translateX(${
  //     -scrollPos * scrollRatio + groupWidth
  //   }px) translateY(-50%)`;

  requestAnimationFrame(scrollUpdate);
}

function onLoad() {
  calculateWidth();
  document.body.style.height = `${groupWidth}px`;
  //   window.scrollTo({ top: scrollPos / scrollRatio });
  scrollUpdate();
}

function calculateWidth() {
  groupWidth = slider.getBoundingClientRect().width;
  containerWidth = getImgWidth();
}

// requestAnimationFrame(scrollUpdate);

// window.addEventListener("scroll", () => {
//   scrollPos = window.scrollY;
// });

window.addEventListener("load", onLoad);

console.log(window.scrollY);
console.log(slider.scrollWidth);
console.log(document.body.style.height);
console.log(ratio);
