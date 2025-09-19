/*find the elements i want to interact with */
const videoElement = document.querySelector("#mediaPlayer");
const playPauseButton = document.querySelector("#playPauseButton");
const playPauseIcon = document.querySelector("#playPauseIcon");
const timeline = document.querySelector("#timelineProgress");
const currentTimeText = document.querySelector("#currentTimeFeedback");
const totalTimeText = document.querySelector("#totalTimeFeedback");
const mediaSource = document.querySelector("#mediaSource");

/* when js loads remove default controls*/
videoElement.removeAttribute("controls");

// I want to update total time based on the currently loaded media file
// this willl run when page lodas, but if I wanted to change the file afterwards, I'd have to
// update there too
videoElement.addEventListener("canplay", updateTotalTime);

function updateTotalTime() {
  let videoSeconds = videoElement.duration;
  let totalMin = Math.floor(videoSeconds / 60);
  let totalSeconds = videoSeconds % 60;
  if (totalSeconds < 10) {
    totalSeconds = "0" + totalSeconds;
  }
  console.log(totalMin, totalSeconds);
  totalTimeText.textContent = `${totalMin}:${totalSeconds}`;
}

function updateCurrentTime() {
  let videoSeconds = videoElement.currentTime;
  let totalMin = Math.floor(videoSeconds / 60);
  let totalSeconds = Math.floor(videoSeconds % 60);
  if (totalSeconds < 10) {
    totalSeconds = "0" + totalSeconds;
  }
  console.log(totalMin, totalSeconds);
  currentTimeText.textContent = `${totalMin}:${totalSeconds}`;
}

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
    playPauseIcon.src = "assetsicons8-pause-60.png";
    playPauseIcon.id = "pauseIcon";
  } else {
    videoElement.pause();
    playPauseButton.textContent = "▶";
  }
}
playPauseButton.addEventListener("click", playPause);

/* timelinee behavior:
it should update as media playback occurss to show current time
I should be able to click and jump to particular time
*/

function updateTimeline() {
  /*find percentage of total time */
  let timePercent = (videoElement.currentTime / videoElement.duration) * 100;
  timeline.value = timePercent;
  updateCurrentTime();
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

// add feature to play next song after current on finished

let currentSongNumber = 0;

const songArray = [
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Hes.mp3",

  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Dry-Down-feat-Ben-Snaath.mp3",

  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Leapt.mp3",

  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Water-Feature.mp3",
];

function updateCurrentSong(songNumber) {
  //based on the input number, change out the src of our source
  mediaSource.src = songArray[songNumber];
  videoElement.load();
  videoElement.play();
}

videoElement.addEventListener("ended", playNextOnEnd);

function playNextOnEnd() {
  if (currentSongNumber < songArray.length - 1) {
    updateCurrentSong(currentSongNumber + 1);
    currentSongNumber += 1;
  } else {
    // loop back to start of array
    updateCurrentSong(0);
    currentSongNumber = 0;
  }
}
