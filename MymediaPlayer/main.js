/*find the elements i want to interact with */
const videoElement = document.querySelector("#mediaPlayer");
const audioName = document.querySelector("#audioName");
const playPauseButton = document.querySelector("#playPauseButton");
const timeline = document.querySelector("#timelineProgress");
const loopButton = document.querySelector("#loopButton");
const musicList = [
  {
    name: "music1",
    link: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/erokia_ambient-wave-56-msfxp7-78.mp3",
  },
  {
    name: "music2",
    link: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Water-Feature.mp3",
  },
  {
    name: "music3",
    link: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Hes.mp3",
  },
];

/* when js loads remove default controls*/
videoElement.removeAttribute("controls");

/*
play pause button behaviour:
if media is not playing--when I click it begins the playback of the media file
if media is playing---when I click again it pause the playback of the media file
feedback:
toggle icon based on playing state
cursor change on hover
*/

function playPause() {
  if (videoElement.paused || videoElement.ended) {
    videoElement.play();
    playIcon.src = "assets/icons8-pause-60.png";
  } else {
    videoElement.pause();
    playIcon.src = "assets/icons8-play-60.png";
  }
}
playPauseButton.addEventListener("click", playPause);

/* timelinee behavior:
it should update as media playback occurs to show current time
I should be able to click and jump to particular time
*/

function updateTimeline() {
  /*find percentage of total time */
  let timePercent = (videoElement.currentTime / videoElement.duration) * 100;
  console.log(timePercent);
  timeline.value = timePercent;
}

videoElement.addEventListener("timeupdate", updateTimeline);

// find when I click my timeline, then I jump to appropriate time

timeline.addEventListener("click", jumpToTime);

function jumpToTime(ev) {
  // find how far  from the left we clicked
  let clickX = ev.offsetX;
  // fine how wide my timeline is
  let timelineWidth = timeline.offsetWidth;
  // find the ration of click to width
  let clickPercent = clickX / timelineWidth;
  // add current time
  videoElement.currentTime = videoElement.duration * clickPercent;
  console.log(clickPercent);
}

/*volume slider*/
/*A volume slider is necessary 
because different users may require different volume levels for background sounds 
when they are learning or working. */
/*volume slider behavior*/
/*when click and drag the slider bar it will jump to corresponding volume */
let volumeSlider = document.getElementById("volumeSlider");
volumeSlider.addEventListener("input", () => {
  videoElement.volume = volumeSlider.value;
});

// Below is a function I delete. It's a function to unloop the audio.
// I delete it because the website should provide continuous background music,
// when users want to stop the music, they can click pause button.
// NO NEED for an unloop button. I use this icon for musiclist loop function.

//  function unloopAudio() {
//   loop = !loop;
//   if (loop) {
//     loopButton.style.backgroundColor = "#98afba";
//   } else {
//     loopButton.style.backgroundColor = "#ac84ac";
//   }
//   videoElement.loop = loop;
//   console.log("loop is", loop);
// }
// loopButton.addEventListener("click", unloopAudio);

/*playlist*/
/*playlist behavior*/
/*when click the music bar in playlist, it will play the corresponding music*/
/*function to play audio in the audioList array */
function playAudio(no) {
  videoElement.pause();
  videoElement.src = musicList[no].link;
  audioName.textContent = musicList[no].name;
  videoElement.load();
  videoElement.play();
}
/*click musicList buttons to play corresponding music*/
const firstAudioButton = document.querySelector("#audio1");
firstAudioButton.addEventListener("click", function playIt() {
  videoElement.pause();
  playAudio(0);
  playIcon.src = "assets/icons8-pause-60.png";
});

const secondAudioButton = document.querySelector("#audio2");
secondAudioButton.addEventListener("click", function playIt() {
  videoElement.pause();
  playAudio(1);
  playIcon.src = "assets/icons8-pause-60.png";
});

const thirdAudioButton = document.querySelector("#audio3");
thirdAudioButton.addEventListener("click", function playIt() {
  videoElement.pause();
  playAudio(2);
  playIcon.src = "assets/icons8-pause-60.png";
});

/*with playlist, it's important to have an easy way to change to  next or previous music */
/*so "next" and "previous" button is nessesary*/
/*next button*/
/*when click on "next" button, it plays next music in the music list */
const nextButton = document.querySelector("#nextButton");
nextButton.addEventListener("click", nextTrack);

/*previous button*/
/*when click on "previous" button, it plays previous music in the music list*/
const prevButton = document.querySelector("#previousButton");
prevButton.addEventListener("click", prevTrack);

let currentIndex = 0;

function nextTrack() {
  currentIndex = (currentIndex + 1) % musicList.length;
  console.log(currentIndex);
  playAudioAtIndex(currentIndex);
}

function prevTrack() {
  currentIndex = (currentIndex - 1 + musicList.length) % musicList.length;
  playAudioAtIndex(currentIndex);
}

function playAudioAtIndex(index) {
  videoElement.pause();
  videoElement.src = musicList[index].link;
  videoElement.load();
  videoElement.play();
  audioName.textContent = musicList[index].name;
}

// musiclist loop function
// when the button is clicked, loop the whole musiclist
// if not, then loop the music playing now.
function updateCurrentSong(index) {
  currentIndex = index;
  videoElement.src = musicList[index].link;
  videoElement.load();
  videoElement.play();
  audioName.textContent = musicList[index].name;
}

function playNextOnEnd() {
  if (currentIndex < musicList.length - 1) {
    updateCurrentSong(currentIndex + 1);
    currentIndex += 1;
  } else {
    updateCurrentSong(0);
    currentIndex = 0;
  }
}
function loopItself() {
  videoElement.currentTime = 0;
  videoElement.play();
}

function afterEnd() {
  if (isLooping) {
    loopItself();
  } else {
    playNextOnEnd();
  }
}
videoElement.addEventListener("ended", afterEnd);

let isLooping = true;
loopButton.addEventListener("click", listLoop);

function listLoop() {
  if (isLooping) {
    loopButton.style.backgroundColor = "#8ecde6";

    console.log(isLooping);
  } else {
    loopButton.style.backgroundColor = "#fadda2";
    videoElement.loop = false;
  }
  isLooping = !isLooping;
}
console.log(isLooping);
