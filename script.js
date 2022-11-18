// select html element

let playArea = document.querySelector('.myPlayer')
let media = playArea.querySelector('video')
let play = playArea.querySelector('.play')
let iconplay = play.querySelector('i')
let rewind = playArea.querySelector('.rewind')
let forward = playArea.querySelector('.forward')
let volume = playArea.querySelector('.volume')
let fullscreen = playArea.querySelector('.fullscreen')
let fullscreenIcon = fullscreen.querySelector('span')
let volumeProgress = volume.querySelector('.volume_progress')
let volumeProgressInput = volumeProgress.querySelector('input')
let progressBar = playArea.querySelector('.progress_bar')
let inputt = progressBar.querySelector('.progress_bar')
let progressRange = progressBar.querySelector('.progress_range')
let Timer = playArea.querySelector('.timer');
let current = Timer.querySelector('.currentTime')
let videoTime = Timer.querySelector('.videoTime')

// Default volume
media.volume = .5

play.addEventListener('click' , function(){
    //Show original video time
    videoTime.textContent = getTime(media.duration)

    if (media.paused){
        media.play()
        iconplay.textContent = 'pause'
    }else{
        media.pause()
        iconplay.textContent = 'play_arrow'
    }
})

rewind.addEventListener('click' , function(){
    media.currentTime -= 5; 
    
})
forward.addEventListener('click' , function(){
    media.currentTime += 5; 
})

// Video volume input
volume.addEventListener('mouseenter' , function(){
    volumeProgress.classList.toggle('active')
    volumeProgress.style.color = 'black';
    volumeProgressInput.setAttribute('style' , 'transition : 1s')
})
volume.addEventListener('mouseleave' , function(){
    volumeProgress.classList.toggle('active')
})

//Build a progress bar for volume

volumeProgressInput.addEventListener('input' , function(){
    media.volume = this.value / 100
    this.style = ` background: linear-gradient(90deg, rgb(54, 53, 52) ${this.value}%, #e1e1e1 0%);`
})


//get video time to make a progress bar
media.addEventListener('timeupdate' , function(){
   current.textContent = getTime(media.currentTime)
   let barLength = (media.currentTime / media.duration) * 100
   progressRange.style = ` background: linear-gradient(90deg, rgb(20, 12, 4) ${barLength}%, #e1e1e1 0%);`
})

//make fullscreen for video
fullscreen.addEventListener('click' , function(){
    if (!document.fullscreenElement) {
        if(playArea.requestFullscreen){
            playArea.requestFullscreen()  
            fullscreenIcon.textContent = 'fullscreen_exit'
        }else if(playArea.mozFullScreenElement){
            playArea.mozFullScreenElement();
        }else if(playArea.msFullscreenElement){
            playArea.msFullscreenElement()
        }else if(playArea.webkitFullscreenElement){
            playArea.webkitFullscreenElement();
        }
      } else if (document.exitFullscreen) {
        document.exitFullscreen()
        fullscreenIcon.textContent = 'fullscreen'
    }
        
})
//get input value To select the desired time 
progressRange.addEventListener('input' , function(){
    media.currentTime = (this.value / 100) * media.duration
})

//make function for (Show original video time)
function getTime(time){
    let minute = Math.floor(time/ 60)
    let second = Math.floor(time - (minute * 60))
    let minuteValue;
    let secondValue;

    if (minute < 10){
        minuteValue = '0' + minute
    }else{
        minuteValue = minute
    }

    if (second < 10){
        secondValue = '0' + second
    }else{
        secondValue = second
    }
    return `${minuteValue} : ${secondValue}`
}


// Apply the keyboard event on the media player
window.addEventListener('keydown' , function(e){
    
    
    if(e.keyCode === 13 && !document.fullscreenElement){
            playArea.requestFullscreen()  
            fullscreenIcon.textContent = 'fullscreen_exit'
    }else if(playArea.mozFullScreenElement){
        playArea.mozFullScreenElement();
    }else if(playArea.msFullscreenElement){
        playArea.msFullscreenElement()
    }else if(playArea.webkitFullscreenElement){
        playArea.webkitFullscreenElement();
    }
    else if (e.keyCode === 13 && document.exitFullscreen ) {
        document.exitFullscreen()
        fullscreenIcon.textContent = 'fullscreen'
    }

    if (media.paused && e.keyCode === 32){
        media.play()
        iconplay.textContent = 'pause'
    }else{
        media.pause()
        iconplay.textContent = 'play_arrow'
    }
    
})

