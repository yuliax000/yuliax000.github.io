//  I chose the scrolling interaction because it is highly learnable and easy to operate,
// providing a seamless and intuitive user experience.
// Although implementing infinite scrolling can be technically challenging,
// it offers a visually smooth and engaging way to transition between sections.
// This approach creates a strong sense of continuity and movement,
// enhancing the immersive quality of the overall gallery experience.

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
const snapClass = "noSnap";
/*As I mentioned in the presentation,
 my goal was to create an immersive gallery experience that simulates the feeling of walking through a real exhibition space. 
In a physical gallery, a viewer’s gaze naturally moves from one artwork to another, focusing on a single piece at a time. 
To replicate this behavior, I adjusted the opacity and scale of the surrounding images and applied a slight blur effect, 
highlighting only the image at the center. 
Each image is also given a shadow and rounded corners to simulate the look of floating gallery cards, 
adding a subtle sense of visual feedback. 
In future implementations, when overlapping images become necessary, 
these visual effects can also help clarify the spatial relationship between foreground and background artworks. 
*/

// scroll to certain distance, jump to another group
function scrollEffect() {
  if (isJumping) return;

  const leftThreshold = groupWidth * 0.5;
  const rightThreshold = groupWidth * 1.5;
  if (imgContainer.scrollLeft < leftThreshold) {
    isJumping = true;
    imgContainer.classList.add(snapClass);
    const offset = imgContainer.scrollLeft + groupWidth;
    imgContainer.scrollLeft = offset;
    imgContainer.classList.remove(snapClass);
    // imgContainer.style.scrollBehavior = "smooth";
    requestAnimationFrame(() => (isJumping = false));
  } else if (imgContainer.scrollLeft > rightThreshold) {
    isJumping = true;
    imgContainer.classList.add(snapClass);
    // imgContainer.style.scrollBehavior = "auto";
    const offset = imgContainer.scrollLeft - groupWidth;
    imgContainer.scrollLeft = offset;
    // imgContainer.style.scrollBehavior = "smooth";
    imgContainer.classList.remove(snapClass);
    requestAnimationFrame(() => (isJumping = false));
  }

  // find where the center is now
  const centerX = imgContainer.scrollLeft + imgContainer.clientWidth / 2;
  const halfCWidth = imgContainer.clientWidth / 2;

  // set the blur, scale and opacity
  imgs.forEach((img) => {
    const imgCenter = img.offsetLeft + img.offsetWidth / 2;
    const distance = Math.abs(centerX - imgCenter);
    //   ratio of the distance to center and half the container width (for calculate the transition)
    const ratio = Math.max(0, 1 - distance / halfCWidth);

    // calculate the scale, opacity and blur's transition based on distance ratio
    const scale = 0.7 + ratio * 0.5;
    const opacity = 0.4 + ratio * 0.6;
    const blurRem = (1 - ratio) * 40;

    img.style.transform = `scale(${scale})`;
    img.style.opacity = `${opacity}`;
    img.style.filter = `blur(${blurRem}px)`;
  });
}

scrollEffect();

// since scroll-snap-type will cause jumping animation when reset group,
// I have to write snap effect manually;

// I added a snapping effect as a form of scrolling feedback.
// On one hand, it reinforces a clear sense of position when the scroll stops at a specific artwork,
// enhancing the feeling of precision and control.
// On the other hand, it prevents users from stopping at awkward in-between positions
// where artworks might appear partially blurred or misaligned.
// This ensures that each piece is clearly displayed and visually complete when viewed,
// maintaining both usability and aesthetic consistency.
function snap() {
  const containerCenter =
    imgContainer.scrollLeft + imgContainer.clientWidth / 2;
  let closest = imgs[0];
  let minDist = Infinity;

  imgs.forEach((img) => {
    const imgCenter = img.offsetLeft + img.offsetWidth / 2;
    const distance = Math.abs(containerCenter - imgCenter);
    // Find closest img(the smallest distance).
    if (distance < minDist) {
      minDist = distance;
      closest = img;
    }
  });
  const target =
    closest.offsetLeft + closest.offsetWidth / 2 - imgContainer.clientWidth / 2;

  imgContainer.scrollTo({
    left: target,
    behavior: "smooth",
  });
}

let scrollTimeout;
const scrollSpeed = 0.3;
imgContainer.addEventListener("wheel", (e) => {
  // map vertical scroll to horizontal
  e.preventDefault();
  imgContainer.scrollLeft += e.deltaY * scrollSpeed;
  scrollEffect();

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    snap();
  }, 1);
});

imgContainer.addEventListener("scroll", () => {
  scrollEffect();
});

// I firstly tried to copy 3 groups of pictures to fake the infinite scroll effect
// the core is when scrolling to the bonding of final group, jump to first group;
// however the jumping process is obvious.

// At this stage it looks quite like infinite scroll, except the annoying jumping flash.
// I finally find the problem comes from scroll-snap, so I turn it off.

// For future implementation, one major challenge lies in balancing aesthetics and information.
// A minimalist and visually clean interface often provides limited information —
// artists may need space to include textual descriptions of their works and contact details.
// While this could be achieved through page navigation, doing so might reduce the website’s intuitive quality.
// Another challenge concerns performance: as the number of images increases, the website’s loading speed may decrease.
// The current version already shows a slight delay due to the existing image quantity.
// The main strength of the website lies in its immersive, intuitive experience and its simplicity.
// In future applications, artists could customize the background and artwork according to their own visual style.
// The design maintains sufficient clarity and learnability, so replacing assets would not compromise the site’s immersive quality,
//  ensuring a degree of stability and adaptability.
