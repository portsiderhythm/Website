
  (function ($) {
  
  "use strict";

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
  
        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });
  
  })(window.jQuery);



  const podcastContainer = document.getElementById("control-panel");
  const playButton = document.getElementById("play");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const audio = document.getElementById("audio");
  const progress = document.getElementById("bar");
  const progressContainer = document.getElementById("progress-bar");
  const infoBar = document.getElementById('info');
  const title = document.getElementById("track-name");
  const curTime = document.getElementById("curTime")
  const totTime = document.getElementById("totTime")
  
  const podcast = ["And So It Begins", "Blue Boi", "Fashion"];
  let podcastIndex = 0;
  
  function getPodcastTitle(podcast) {
    return podcast.charAt(0).toUpperCase() + podcast.slice(1);
  }

  function loadPodcast(podcast) {
    title.innerText = getPodcastTitle(podcast);
    audio.src = `./audio/${podcast}.mp3`;
  }
  
  function playPodcast() {
    podcastContainer.classList.add("active");
    infoBar.classList.add("active");
    playButton.querySelector("i.fas").classList.remove("fa-play");
    playButton.querySelector("i.fas").classList.add("fa-pause");
    audio.play();
  }
  
  function pausePodcast() {
    podcastContainer.classList.remove("active");
    infoBar.classList.remove("active");
    playButton.querySelector("i.fas").classList.remove("fa-pause");
    playButton.querySelector("i.fas").classList.add("fa-play");
    audio.pause();
  }
  
  function prevPodcast() {
    podcastIndex--;
    if (podcastIndex < 0) podcastIndex = podcast.length - 1;
    loadPodcast(podcast[podcastIndex]);
    playPodcast();
  }
  
  function nextPodcast() {
    podcastIndex++;
    if (podcastIndex > podcast.length - 1) podcastIndex = 0;
    loadPodcast(podcast[podcastIndex]);
    playPodcast();
  }
  
  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    
    progress.style.width = `${progressPercent}%`;
    let minutes = Math.floor(Math.round(currentTime) / 60);
    let seconds = Math.round(currentTime) - minutes * 60;
    if (seconds > 9) {
      seconds = seconds
    } else {
      seconds = "0" + seconds
    }
    if (minutes > 9) {
      minutes = minutes
    } else {
      minutes = "0" + minutes
    }
    let totMinutes = Math.floor(Math.round(duration) / 60);
    let totSeconds = Math.round(duration) - totMinutes * 60;
    if (minutes && seconds === NaN) {
      minutes = "00"
      seconds = "00"
    }
    if (totMinutes === NaN) {
      totMinutes = "00"
      totSeconds = "00"
    }
    curTime.innerHTML = minutes + ":" + seconds
    totTime.innerHTML = "0" + totMinutes + ":" + totSeconds
  }
  
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }
  
  // Event Listeners
  playButton.addEventListener("click", () => {
    const isPlaying = podcastContainer.classList.contains("active");
    isPlaying ? pausePodcast() : playPodcast();
  });
  
  prevButton.addEventListener("click", prevPodcast);
  nextButton.addEventListener("click", nextPodcast);
  
  audio.addEventListener("timeupdate", updateProgress);
  // progress.addEventListener("click", setProgress);
  
  audio.addEventListener("ended", nextPodcast);
  
  // Init
  loadPodcast(podcast[podcastIndex]);