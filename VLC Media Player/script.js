const speedUp = document.querySelector("#speedUp");
const speedDown = document.querySelector("#speedDown");
const volumeUp = document.querySelector("#volumeUp");
const volumeDown = document.querySelector("#volumeDown");
const videoBtn = document.querySelector("#videoBtn");
const videoInput = document.querySelector("#videoInput");
const videoPlayer = document.querySelector("#main");
const backwardButton = document.querySelector("#backward");
const forwardButton = document.querySelector("#forward");
const pauseButton = document.getElementById('pause');
const fullscreenButton = document.getElementById('fullscreenButton');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const volumeSlider = document.querySelector("#volumeSlider");
const volumeBtn = document.querySelector(".volume i");
const progressTime = document.querySelector('.progress');
const progressBar = document.querySelector("#progress-bar")
const toast = document.querySelector(".toast")

const speedUpHandler = () => {
    // alert("hello")
    const videoElement = document.querySelector("video");
    if (videoElement == null) {
        return;
    }
    if (videoElement.playbackRate > 3) {
        return;
    }
    const increasedSpeed = videoElement.playbackRate + 0.5;
    //   console.log(increasedSpeed);
    videoElement.playbackRate = increasedSpeed;
    showToast(increasedSpeed + "X")
}
const speedDownHandler = () => {
    // alert("hello")
    const videoElement = document.querySelector("video");
    if (videoElement == null) {
        return;
    }
    if (videoElement.playbackRate > 0) {
        const decreasedSpeed = videoElement.playbackRate - 0.5;
        //   console.log(decreasedSpeed);
        videoElement.playbackRate = decreasedSpeed;
        showToast(decreasedSpeed + "X")
    }
}
const handleInput = () => {
    videoInput.click();
}
const acceptInputHandler = (obj) => {
    const selectedVideo = obj.target.files[0];
    const link = URL.createObjectURL(selectedVideo);
    const videoElement = document.createElement("video");
    videoElement.src = link;
    videoElement.setAttribute("class", "video");
    // videoElement.controls= "true";
    videoPlayer.appendChild(videoElement);
    videoElement.play();
    videoElement.volume = 0.3;

    /****VIDEO BACKWARD AND FORWARD AND PAUSE USING THIS CODE  ***** */

    backwardButton.addEventListener('click', () => {
        videoElement.currentTime -= 10;
    });
    forwardButton.addEventListener('click', () => {
        videoElement.currentTime += 10;
    });
    pauseButton.addEventListener('click', () => {
        if (videoElement.paused) {
            videoElement.play();
            pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            videoElement.pause();
            pauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    /*******FOR FULLSCREEN VIDEO****** */
    //   const fullscreen = () =>{
    fullscreenButton.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
        }
        else {
            videoElement.requestFullscreen();
            fullscreenButton.innerHTML = '<i class="fas fa-compress"></i>';
        }
    });
    videoElement.addEventListener('loadedmetadata', function () {
        const duration = formatTime(videoElement.duration);
        durationDisplay.textContent = duration;
    });
    videoElement.addEventListener('timeupdate', function () {
        const currentTime = formatTime(videoElement.currentTime);
        currentTimeDisplay.textContent = currentTime;

        const progressPercent = (videoElement.currentTime / videoElement.duration) * 100;
        progressBar.style.width = progressPercent + '%';
    });
    // Format time in minutes and seconds
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
}
const volumeUpHandler = () => {
    const videoElement = document.querySelector("video");
    if (videoElement == null) {
        return;
    }
    if (videoElement.volume >= 0.99) {
        videoElement.volume = 1;
        return;
    }
    const increasedVolume = videoElement.volume + 0.1;
    videoElement.volume = increasedVolume;
    const percentage = Math.floor(increasedVolume * 100) + "%"
    showToast(percentage)
    //    console.log("increased volume",videoElement.volume);
}
const volumeDownHandler = () => {
    const videoElement = document.querySelector("video");
    if (videoElement == null) {
        return;
    }
    if (videoElement.volume <= 0.1) {
        videoElement.volume = 0;
        return
    }
    // videoElement.volume = videoElement.volume - 0.1;
    const decreasedVolume = videoElement.volume - 0.1;
    videoElement.volume = decreasedVolume;

    const percentage = Math.floor(decreasedVolume * 100) + "%";
    showToast(percentage)
}
function showToast(message) {
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none"
    }, 1000)
}
speedUp.addEventListener("click", speedUpHandler);
speedDown.addEventListener("click", speedDownHandler);
videoBtn.addEventListener("click", handleInput);
videoInput.addEventListener("change", acceptInputHandler);
volumeUp.addEventListener("click", volumeUpHandler);
volumeDown.addEventListener("click", volumeDownHandler);
