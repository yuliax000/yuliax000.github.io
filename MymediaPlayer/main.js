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
  timeline.value = timePercent;
}

videoElement.addEventListener("timeupdate", updateTimeline);

/*volume slider*/
/*A volume slider is necessary 
because different users may require different volume levels for background sounds 
when they are learning or working. */

/*loop*/
/*By default, audio loops so that users do not need to control the audio while they are studying or working*/
/*If users want to stop the loop, they can click on repeat button */

/*playlist*/
