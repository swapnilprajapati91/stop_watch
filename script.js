let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let intervalId = null;
let isRunning = false;
let lapCount = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimes = document.getElementById('lapTimes');

function updateDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    millisecondsDisplay.textContent = milliseconds.toString().padStart(2, '0');
}

function formatTime() {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function addLapTime() {
    if (isRunning) {
        lapCount++;
        const lapTime = document.createElement('div');
        lapTime.className = 'lap-time';
        lapTime.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time-value">${formatTime()}</span>
        `;
        lapTimes.insertBefore(lapTime, lapTimes.firstChild);
    }
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(() => {
            milliseconds++;
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
                if (seconds === 60) {
                    seconds = 0;
                    minutes++;
                }
            }
            updateDisplay();
        }, 10);
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
    }
}

function resetTimer() {
    stopTimer();
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    lapCount = 0;
    updateDisplay();
    lapTimes.innerHTML = ''; // Clear lap history
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLapTime); 