//获取节点
const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

/**
 * 点击播放或暂停
 */
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

/**
 * 暂停播放按钮
 */
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

/**
 * 更新进度条以及时间戳
 */
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  //计算分钟数
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = `0${mins}`
  }
  //计算秒数
  let seconds = Math.floor(video.currentTime % 60)
  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  timestamp.innerHTML = `${mins}:${seconds}`
}

/**
 * 停止视频
 */
function stopVideo() {
  video.currentTime = 0
  video.pause()
}

/**
 * 拖动进度条的时候改变播放内容和时间戳
 */
function setVideoProgress() {
  video.currentTime = (progress.value * video.duration) / 100
}

//监听事件
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
