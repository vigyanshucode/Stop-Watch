let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let timer;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
const progressBar = document.getElementById('progressBar');

function startStopwatch() {
    if (!isRunning) {
        timer = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Pause';
        playSound('start');
    } else {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
        playSound('pause');
    }
    isRunning = !isRunning;
}

function updateTime() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
    updateProgressBar();
}

function updateDisplay() {
    millisecondsDisplay.textContent = milliseconds < 100 ? `0${Math.floor(milliseconds / 10)}` : Math.floor(milliseconds / 10);
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
}

function resetStopwatch() {
    clearInterval(timer);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    isRunning = false;
    startStopBtn.textContent = 'Start';
    updateDisplay();
    lapsList.innerHTML = '';
    progressBar.style.width = '0%';
    playSound('reset');
}

function recordLap() {
    const lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapItem.style.color = getRandomColor();
    lapsList.appendChild(lapItem);
}

function updateProgressBar() {
    const totalMilliseconds = (minutes * 60000) + (seconds * 1000) + milliseconds;
    const progress = (totalMilliseconds / 600000) * 100;
    progressBar.style.width = `${progress}%`;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function playSound(action) {
    const sound = new Audio(`sounds/${action}.mp3`);
    sound.play();
}

startStopBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
