/*find the elements i want to interact with */
const videoElement = document.querySelector("#mediaPlayer");
const playPauseButton = document.querySelector("#playPauseButton");
const timeline = document.querySelector("#timelineProgress");

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
    playPauseButton.textContent = "⏸";
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
}

videoElement.addEventListener("timeupdate", updateTimeline);


/* shuffle button behavior */



/*volume slider behavior */




// playlist behavior


