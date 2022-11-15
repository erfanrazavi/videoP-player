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
let progressRange = progressBar.querySelector('.progress_range')
let Timer = playArea.querySelector('.timer');
let current = Timer.querySelector('.currentTime')
let videoTime = Timer.querySelector('.videoTime')

media.volume = .5
play.addEventListener('click' , function(){
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

volume.addEventListener('mouseenter' , function(){
    volumeProgress.classList.toggle('active')
    volumeProgress.style.color = 'black'
})
volume.addEventListener('mouseleave' , function(){
    volumeProgress.classList.toggle('active')
})

volumeProgressInput.addEventListener('input' , function(){
    media.volume = this.value / 100
    this.style = ` background: linear-gradient(90deg, rgb(54, 53, 52) ${this.value}%, #e1e1e1 0%);`
})

media.addEventListener('timeupdate' , function(){
   current.textContent = getTime(media.currentTime)
   let barLength = (media.currentTime / media.duration) * 100
   progressRange.style = ` background: linear-gradient(90deg, rgb(20, 12, 4) ${barLength}%, #e1e1e1 0%);`
})

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

progressRange.addEventListener('input' , function(){
    media.currentTime = (this.value / 100) * media.duration
})


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