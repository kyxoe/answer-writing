let timer;
let totalTime = 0;
let currentTime = 0;
let phase = "Think"; // Initial phase
let extraTime = 0;
let timerRunning = false;

// References to DOM elements
const timerDisplay = document.getElementById("timer-display");

const progressIndicator = document.getElementById("progress-indicator");
const phaseDisplay = document.getElementById("phase-display"); // Add a new element for phase display
const startButton = document.getElementById("start-btn");
const doneButton = document.getElementById("done-btn");
const resetButton = document.getElementById("reset-btn");


function playAudio(audioFileName) {
  const audio = new Audio(audioFileName);
  audio.play();
}

// Event listeners for buttons
defaultTable();
document.getElementById("btn-7-min").addEventListener("click", () => {setTotalTime(7 * 60); playAudio("button.mp3");});
document.getElementById("btn-11-min").addEventListener("click", () => {setTotalTime(11 * 60); playAudio("button.mp3");});
startButton.addEventListener("click", ()=> {startTimer(); playAudio("start.mp3");});
resetButton.addEventListener("click", resetTimer);
doneButton.addEventListener("click", () => {
    logExtraTime();
    playAudio('start.mp3');
    resetTimer();

  });
function setTotalTime(seconds) {
  totalTime = seconds;
  currentTime = totalTime;
  extraTime = 0;
  updateTimerDisplay();
  updateProgressIndicator();
  phase = "Think";
  doneButton.style.display = "none";
  startButton.disabled = false;
  phaseDisplay.textContent = phase; // Update phase display
}

function startTimer() {
  if (!timerRunning && totalTime > 0) {
      timer = setInterval(updateTimer, 1000);
      startButton.disabled = true;
      timerRunning = true;
      doneButton.style.display = "block"; // Show the "Done" button
  }
}


function updateTimer() {
  if (currentTime > 0) {
    currentTime--;
    updateTimerDisplay();
    updateProgressIndicator();
  } else {
    if (extraTime == 0) {
      // Timer has just reached zero, play the sound
      playAudio('abc.mp3')
    }
    extraTime++;
    updateNegTimerDisplay();
  }
}
  


function updateNegTimerDisplay() {
    const totalSeconds = currentTime + extraTime;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `- ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

function updateTimerDisplay() {
    const totalSeconds = currentTime + extraTime;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  }
  

function updateProgressIndicator() {
  const percentDone = ((totalTime - currentTime) / totalTime) * 100;
  progressIndicator.style.width = `${percentDone}%`;

  if (percentDone <= 10) {
    progressIndicator.className = "progress-bar progress-bar-striped progress-bar-animated bg-warning";
    phase = "Think";
  } else if (percentDone <= 95) {
    progressIndicator.className = "progress-bar progress-bar-striped progress-bar-animated bg-success";
    phase = "Write";
  } else {
    progressIndicator.className = "progress-bar progress-bar-striped progress-bar-animated bg-danger";
    phase = "Conclude";
  }
  
  // Update the phase display
  phaseDisplay.textContent = phase;
}

function resetTimer() {
  clearInterval(timer);
  totalTime = 0;
  currentTime = 0;
  extraTime = 0;
  timerRunning = false;
  updateTimerDisplay();
  progressIndicator.style.width = "0%";
  progressIndicator.className = "progress-bar bg-info";
  doneButton.style.display = "none";
  startButton.disabled = false;
  phaseDisplay.textContent = ""; // Clear phase display
}

function defaultTable(){
  const extraTimeLog = document.getElementById("extra-time-log");
  const newRow = extraTimeLog.insertRow();
  const cell1 = newRow.insertCell(0);
  cell1.textContent = "Sr No.";
  const cell2 = newRow.insertCell(1);
  cell2.textContent = "Time";
  const cell3 = newRow.insertCell(2);
  cell3.textContent = "Time Δ"
}

function logExtraTime() {
  // Log extra time and update the table
  // Example code to log the extra time in a table:
  const extraTimeLog = document.getElementById("extra-time-log");
  const newRow = extraTimeLog.insertRow();

  const cell1 = newRow.insertCell(0);
  cell1.textContent = extraTimeLog.rows.length - 1; // Serial number

  const cell2 = newRow.insertCell(1);
  cell2.textContent = totalTime + "min";

  const cell3 = newRow.insertCell(2);
  if (currentTime<totalTime && currentTime!=0){
    cell3.textContent = "+ " + currentTime + " seconds";
  }
  else if (currentTime==0 && extraTime ==0 ){
    cell3.textContent = extraTime + " seconds"; // Extra time taken

  }
  else if (currentTime == totalTime){
    cell3.textContent = "0 seconds";
  }
  else {
    cell3.textContent = "- " + extraTime + " seconds"; // Extra time taken
}

}
