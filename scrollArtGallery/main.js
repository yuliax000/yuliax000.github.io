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
const imgContainer = document.querySelector(".imgs");
let imgs = Array.from(imgContainer.querySelectorAll("img"));

imgContainer.prepend(...imgs.map((img) => img.cloneNode(true)));
imgContainer.append(...imgs.map((img) => img.cloneNode(true)));
imgs = Array.from(imgContainer.querySelectorAll("img"));

const groupCount = imgs.length / 3;

const left0 = imgs[0].offsetLeft;
const left1 = imgs[1].offsetLeft;
const gap = Math.max(0, left1 - left0 - imgs[0].offsetWidth);
const imgWidth = imgs[0].offsetWidth + gap;
const groupWidth = imgWidth * groupCount;

// setting default shows the second group
imgContainer.scrollLeft = groupWidth;

let isJumping = false;
// scroll to certain distance, jump to another group
function scrollEffect() {
  if (isJumping) return;

  // set the blur, scale and opacity
  imgs.forEach((img) => {
    const imgCenter = img.offsetLeft + img.offsetWidth / 2;
    const distance = Math.abs(centerX - imgCenter);
    //   ratio of the distance to center and half the container width (for calculate the transition)
    const ratio = Math.max(0, 1 - distance / halfCWidth);

    // calculate the scale, opacity and blur's transition based on distance ratio
    const scale = 0.7 + ratio * 0.5;
    const opacity = 0.4 + ratio * 0.6;
    const blurRem = (1 - ratio) * 5;

    img.style.transform = `scale(${scale})`;
    img.style.opacity = `${opacity}`;
    img.style.filter = `blur(${blurRem}rem)`;
  });
}

scrollEffect();

imgContainer.addEventListener("scroll", () => {
  scrollEffect();
});

// I firstly tried to copy 3 groups of pictures to fake the infinite scroll effect
// the core is when scrolling to the bonding of final group, jump to first group;
// however the jumping process is obvious.
// I decide to use Js to clone the group (I recogonize that its the same effect as I copy them manually).
// At this stage it looks quite like infinite scroll, except the annoying jumping flash.
