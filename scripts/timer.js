import { timerSeconds, timerRunning, timerInterval, setTimerSeconds, setTimerRunning, setTimerInterval } from './state.js';

/**
 * Set timer to specific seconds
 * @param {number} seconds - Number of seconds
 */
export function setTimer(seconds) {
  setTimerSeconds(seconds);
  updateTimerDisplay();

  if (timerRunning) {
    pauseTimer();
  }
}

/**
 * Set custom timer from input
 */
export function setCustomTimer() {
  const customSeconds = parseInt(document.getElementById("customTime").value);

  if (customSeconds && customSeconds > 0) {
    setTimer(customSeconds);
    document.getElementById("customTime").value = "";
  }
}

/**
 * Update timer display
 */
export function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  document.getElementById("timerDisplay").textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

/**
 * Start timer countdown
 */
export function startTimer() {
  if (timerSeconds === 0) return;

  setTimerRunning(true);

  document.getElementById("startBtn").style.display = "none";
  document.getElementById("pauseBtn").style.display = "inline-block";

  const interval = setInterval(() => {
    setTimerSeconds(timerSeconds - 1);
    updateTimerDisplay();

    if (timerSeconds === 0) {
      pauseTimer();
      if ("vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
      alert("Time's up!");
    }
  }, 1000);

  setTimerInterval(interval);
}

/**
 * Pause timer
 */
export function pauseTimer() {
  setTimerRunning(false);
  clearInterval(timerInterval);

  document.getElementById("startBtn").style.display = "inline-block";
  document.getElementById("pauseBtn").style.display = "none";
}

/**
 * Reset timer to zero
 */
export function resetTimer() {
  pauseTimer();
  setTimerSeconds(0);
  updateTimerDisplay();
}

// Make functions available globally for inline event handlers
window.setTimer = setTimer;
window.setCustomTimer = setCustomTimer;
window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;