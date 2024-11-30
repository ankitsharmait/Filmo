// alert("Js Added");

const videoinput = document.querySelector('#videoinput');
const videobtn = document.querySelector('#videobtn');
const videoPlayer = document.querySelector("#main");

const videoinputhandler = () => {  //you have make it click
    videoinput.click();
}
videobtn.addEventListener("click", videoinputhandler);///jab open par click ho tab videoinputhandler call hoga aur usse video file input bala uske andr jakr click ho jyega

const acceptinputhandler = (obj) => {
    // console.log("file selected");
    // console.log(obj);
    const selectedVideo = obj.target.files[0];//our video file get selected
    //now we have to convert this source video file into base(64)
    const link = URL.createObjectURL(selectedVideo);
    const videoElement = document.createElement("video");
    videoElement.src = link;
    videoElement.setAttribute("class", "video");
    videoPlayer.appendChild(videoElement);

    // Hide the image in the main section
    const mainImage = document.querySelector("#mainimage");
    if (mainImage) {
        mainImage.style.display = "none"; // Hide the image
    }
    //  videoElement.controls="true";//this is default controler provided by js to control audio and video speed
    // console.log(videoElement.duration);
    videoElement.play();
    videoElement.volume = 0.4;//iska matlab jab video on hoga then default volume video ka 40 % rahega

}
//when file is selected
videoinput.addEventListener("change", acceptinputhandler);

/* Volume and Speed  */

//select the element
const volumeup = document.querySelector("#volumeup");
const volumedown = document.querySelector('#volumedown');
const speedup = document.querySelector("#speedup");
const speeddown = document.querySelector("#speeddown");
const toast = document.querySelector('.toast');
const speedUphandler = () => {
    // console.log("sppedup karna hai");   
    //sbse phle video select krnge
    const videoElement = document.querySelector("video");
    //phir check krnge bo video element null to nhi hai
    if (videoElement == null)
        return;
    //ab playback rate apne acccording provide kr skte hain..
    // videoElement.playbackRate=1.25;
    if (videoElement.playbackRate <= 2) {
        const increaseSpeed = videoElement.playbackRate + 0.5;
        videoElement.playbackRate = increaseSpeed;//ab hmlog jab vi playback me speedup to touch karenge then speed 0.5 se har bar increase hoga..

        showToast(increaseSpeed + 'x');//function call for showing toast
    }
}

const speedDownHandler = () => {
    const videoElement = document.querySelector('video');
    if (videoElement == null)
        return;
    if (videoElement.playbackRate >= 0) {
        const decreaseSpeed = videoElement.playbackRate - 0.5;
        videoElement.playbackRate = decreaseSpeed;
        showToast(decreaseSpeed + 'x');
    }//on each click speed of video get decreased by 0.5

}

const volumeUpHandler = () => {
    const videoElement = document.querySelector("video");
    if (videoElement == null)
        return;
    if (videoElement.volume >= 0.9999999999999999)//check max volume
        return;
    const increaseVolume = videoElement.volume + 0.1;//on each click volume increases by 10%
    videoElement.volume = increaseVolume;
    // console.log(increaseVolume);
    showToast(((increaseVolume * 100) + '%'));
}

const volumeDownHandler = () => {
    const videoElement = document.querySelector('video');
    if (videoElement == null)
        return;
    if (videoElement.volume <= 0)
        return;
    const decreaseVolume = videoElement.volume - 0.1;
    videoElement.volume = decreaseVolume;//on each click volume will decrease by 10%
    // console.log(decreaseVolume);
    showToast(((decreaseVolume * 100) + '%'));
}
function showToast(message) {
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(function () {
        toast.style.display = 'none';
    }, 1500);

}
// identify on which element your logic should triger
speedup.addEventListener('click', speedUphandler);
speeddown.addEventListener('click', speedDownHandler);
volumeup.addEventListener('click', volumeUpHandler);
volumedown.addEventListener('click', volumeDownHandler);


/**************controls***********************/
//1:- implementing full screen

const fullscreenhandler = () => {
    videoPlayer.requestFullscreen();//iska mtlb main ke upr full screen ke liye request krega

}
const fullscreen = document.querySelector('#fullscreen');
fullscreen.addEventListener('click', fullscreenhandler);

// 2:-implementing pause button
const handlePause = () => {
    const video = document.querySelector('video');
    video.pause();
}
const pause = document.querySelector('#pause');
pause.addEventListener('click', handlePause);

//  3:-implementing play GamepadButton
const handleplaybutton = () => {
    const video = document.querySelector('video');
    video.play();
}
const play = document.querySelector('#play');
play.addEventListener('click', handleplaybutton);

/*************************************************************/
//  working on the seeking of video


const seekbar = document.querySelector('#seekBar'); // Select the seek bar

const updateSeekBar = () => {
    const videoElement = document.querySelector('video'); // Get the current video element
    if (!videoElement || !videoElement.duration) return; // Ensure the video exists and has a duration
    const seekTo = videoElement.duration * (seekbar.value / 100); // Calculate the new time based on seek bar value
    videoElement.currentTime = seekTo; // Set the video's current time
};

const syncSeekBar = () => {
    const videoElement = document.querySelector('video'); // Get the current video element
    if (!videoElement || !videoElement.duration) return; // Ensure the video exists and has a duration
    const progress = (videoElement.currentTime / videoElement.duration) * 100; // Calculate progress as a percentage
    seekbar.value = progress; // Update the seek bar value
};

// Sync the seek bar as the video plays
document.addEventListener('timeupdate', () => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
        syncSeekBar();
    }
});
// Update video time when the seek bar is changed
seekbar.addEventListener('input', updateSeekBar);





``

