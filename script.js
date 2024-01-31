let theimages = document.getElementById('theimages');
let time = 30;
let timerInterval;
let isPaused = false;
let exerciseName = document.getElementById('exerciseName');
let nextBtn = document.getElementById('theNextButton');
let PreviousButton = document.getElementById('thePreviousButton');
let progress = 0;
let pagecount = 0 ;
const maxProgress = pages.length;
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
progressText.innerHTML = maxProgress;
// console.log(pages[pagecount].hasOwnProperty('sets'));

function updateTimerDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (time === 18) {
    if(pages[pagecount].hasOwnProperty('sets')){
      clearInterval(timerInterval);
      isPaused = true;
      document.getElementById('pauseButton').innerText = 'RESUME';
      clearInterval(timerInterval);
      speak(`${pages[pagecount].comment} & do it until ${pages[pagecount].sets} times`);
    }else{
      speak(`${pages[pagecount].comment}`);
    }
    
  }

  if (time <= 3 && time > 0) {
    speak(time.toString());
  }
}


function startTimer() {
  timerInterval = setInterval(function () {
    time--;
    updateTimerDisplay();
    if (time === 0) {
      clearInterval(timerInterval);
      const audio = new Audio('audio/bell audio.m4a'); // Replace 'audio1.mp3' with your audio file path
      audio.play();
      nextBtn.onclick();
      time = parseInt(`${pages[pagecount].time}`);
    }
  }, 1000);
}


function togglePause() {
  if (time > 0) {
    if (isPaused) {
      isPaused = false;
      document.getElementById('pauseButton').innerText = 'PAUSE';
      startTimer();
    } else {
      isPaused = true;
      document.getElementById('pauseButton').innerText = 'RESUME';
      clearInterval(timerInterval);
    }
  }
};

function showSecondSection() {
document.getElementById('firstSection').style.display = 'none';
document.getElementById('secondSection').style.visibility = 'visible';
speak(`start. 30 second. ${pages[pagecount].name}`);
startTimer();
}

function speak(text) {
  const speechSynthesis = window.speechSynthesis;
  const speechUtterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(speechUtterance);
};


nextBtn.onclick = ()=> {
  if(pagecount < pages.length - 1){
    clearInterval(timerInterval);
    pagecount++;
    theimages.src = pages[pagecount].image;
    exerciseName.innerHTML = pages[pagecount].name;
    time = pages[pagecount].time;
    isPaused = false;
    document.getElementById('pauseButton').innerText = 'PAUSE';
    startTimer();
    speak(`THE NEXT. ${pages[pagecount].name}`);
    const audio = new Audio('audio/bell audio.m4a');
      audio.play();
      increaseProgress();
  }else{
      clearInterval(timerInterval);
      pagecount = 0 ;
      progress = 0;
      time = 30;
      theimages.src = pages[pagecount].image;
      exerciseName.innerHTML = pages[pagecount].name;
      time = pages[pagecount].time;
      startTimer();
      updateProgressBar();
      speak(`THE NEXT. ${pages[pagecount].name}`);
    const audio = new Audio('audio/bell audio.m4a');
      audio.play();
  }
}


PreviousButton.onclick = ()=> {
if(pagecount > 0){
    pagecount--;
    theimages.src = pages[pagecount].image;
    exerciseName.innerHTML = pages[pagecount].name;
    clearInterval(timerInterval);
    time = pages[pagecount].time;
    startTimer();
    speak(`THE NEXT. ${pages[pagecount].name}`);
    const audio = new Audio('audio/bell audio.m4a');
      audio.play();
      decreaseProgress();
    }else{
      pagecount = pages.length;
      progress = pages.length;
      updateProgressBar();
      theimages.src = pages[pagecount].image;
      exerciseName.innerHTML = pages[pagecount].name;
      speak(`THE NEXT. ${pages[pagecount].name}`);
    const audio = new Audio('audio/bell audio.m4a');
      audio.play(); 
    }
}


function increaseProgress() {
  if (progress < maxProgress) {
    progress++;
    updateProgressBar();
  }
}


function decreaseProgress(){
if(progress > 0){
  progress--;
  updateProgressBar();
  }
}


function updateProgressBar() {
  const percentage = (progress / maxProgress) * 100;
  progressBar.style.width = percentage + '%';
  progressText.textContent = `${progress}/${maxProgress}`;
}


// save it on local storage
var images = document.querySelectorAll('img');
  var imageSources = [];

  images.forEach(function(image) {
    imageSources.push(image.src);
  });

  // Convert the array to a JSON string and save it to localStorage
  var imageData = JSON.stringify(imageSources);
  localStorage.setItem('savedImages', imageData);



  //ensure the load of images
  // List of image sources
  var imageSources = [
    'images/1.gif',
    'images/2.gif',
    'images/3.gif',
    'images/4.gif',
    'images/5.gif',
    'images/6.gif',
    'images/7.gif',
    'images/8.gif',
    'images/9.gif',
    'images/r1.jpg',
    'images/r2.jpg',
    'images/r3.jpg',
    'images/r4.jpg',
    'images/main1.jpg',
    'images/main2.jpg',
    'images/main3.jpg',
    'images/main4.jpg'
  ];


  
  // Function to preload images
  function preloadImages(imageSources, callback) {
    var loadedImages = 0;

    // Loop through each image source
    imageSources.forEach(function(source) {
      var img = new Image();

      // Set up the onload event for each image
      img.onload = function() {
        loadedImages++;

        // Check if all images have been loaded
        if (loadedImages === imageSources.length) {
          // Call the callback function when all images are loaded
          callback();
        }
      };

      // Set the src attribute to trigger image loading
      img.src = source;
    });
  }

  // Callback function to be executed when all images are loaded
  function allImagesLoaded() {
    console.log('All images are loaded. Proceed with other actions.');
    // Add your code to proceed after all images are loaded
  }

  // Initiate the image preloading
  preloadImages(imageSources, allImagesLoaded);