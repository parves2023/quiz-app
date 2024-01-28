let time = 30;
let timerInterval;

function updateTimerDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  timerInterval = setInterval(function () {
    time--;
    updateTimerDisplay();
    if (time === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

document.getElementById('pauseButton').addEventListener('click', function () {
  pauseTimer();
});

// Start the timer when the page loads
startTimer();