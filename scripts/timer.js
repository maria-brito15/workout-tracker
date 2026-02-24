import {
  timerSeconds, timerRunning, timerInterval, totalTimerSeconds,
  setTimerSeconds, setTimerRunning, setTimerInterval, setTotalTimerSeconds,
  restTimerSeconds, restTimerRunning, restTimerInterval, restTimerTotal, restTimerVisible,
  setRestTimerSeconds, setRestTimerRunning, setRestTimerInterval, setRestTimerTotal, setRestTimerVisible,
} from './state.js';

// ─── Main Timer ──────────────────────────────────────────────────────────────

export function setTimer(seconds) {
  setTimerSeconds(seconds);
  setTotalTimerSeconds(seconds);
  updateTimerDisplay();
  updateTimerProgress();

  if (timerRunning) pauseTimer();
}

export function setCustomTimer() {
  const customSeconds = parseInt(document.getElementById("customTime").value);
  if (customSeconds && customSeconds > 0) {
    setTimer(customSeconds);
    document.getElementById("customTime").value = "";
  }
}

export function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  document.getElementById("timerDisplay").textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function updateTimerProgress() {
  const progressCircle = document.getElementById("timerProgress");
  if (!progressCircle) return;

  const circumference = 2 * Math.PI * 45;

  if (totalTimerSeconds === 0) {
    progressCircle.style.strokeDashoffset = 0;
    return;
  }

  const offset = circumference - (timerSeconds / totalTimerSeconds) * circumference;
  progressCircle.style.strokeDashoffset = offset;

  if (timerSeconds <= 10 && timerSeconds > 0) {
    progressCircle.style.stroke = "#ff4444";
  } else {
    progressCircle.style.stroke = "";
  }
}

export function startTimer() {
  if (timerSeconds === 0) return;

  setTimerRunning(true);
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("pauseBtn").style.display = "inline-block";

  const interval = setInterval(() => {
    setTimerSeconds(timerSeconds - 1);
    updateTimerDisplay();
    updateTimerProgress();

    if (timerSeconds === 0) {
      pauseTimer();
      if ("vibrate" in navigator) navigator.vibrate([200, 100, 200]);
      alert("Time's up!");
    }
  }, 1000);

  setTimerInterval(interval);
}

export function pauseTimer() {
  setTimerRunning(false);
  clearInterval(timerInterval);
  document.getElementById("startBtn").style.display = "inline-block";
  document.getElementById("pauseBtn").style.display = "none";
}

export function resetTimer() {
  pauseTimer();
  setTimerSeconds(0);
  setTotalTimerSeconds(0);
  updateTimerDisplay();
  updateTimerProgress();
}

// ─── Rest Timer (in-workout overlay) ─────────────────────────────────────────

export function initRestTimer() {
  // Load saved rest duration preference
  const saved = localStorage.getItem("restTimerDuration");
  if (saved) setRestTimerTotal(parseInt(saved));
  renderRestTimerOverlay();
}

export function renderRestTimerOverlay() {
  // Remove existing overlay if present
  const existing = document.getElementById("restTimerOverlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "restTimerOverlay";
  overlay.className = "rest-timer-overlay" + (restTimerVisible ? " active" : "");

  overlay.innerHTML = `
    <div class="rest-timer-panel">
      <div class="rest-timer-header">
        <span class="rest-timer-title">⏱ Rest Timer</span>
        <button class="rest-timer-close" onclick="hideRestTimer()">✕</button>
      </div>
      <div class="rest-timer-circle-wrap">
        <svg class="rest-svg" viewBox="0 0 100 100">
          <circle class="rest-bg" cx="50" cy="50" r="42"></circle>
          <circle class="rest-progress" id="restProgress" cx="50" cy="50" r="42"></circle>
        </svg>
        <div class="rest-display" id="restDisplay">${formatRestTime(restTimerSeconds)}</div>
      </div>
      <div class="rest-presets">
        <button class="rest-preset-btn" onclick="setRestDuration(60)">1m</button>
        <button class="rest-preset-btn" onclick="setRestDuration(90)">90s</button>
        <button class="rest-preset-btn" onclick="setRestDuration(120)">2m</button>
        <button class="rest-preset-btn" onclick="setRestDuration(180)">3m</button>
        <button class="rest-preset-btn" onclick="setRestDuration(300)">5m</button>
      </div>
      <div class="rest-custom-row">
        <input type="number" id="restCustomInput" placeholder="Custom (sec)" min="1"
          style="padding:8px; border:1px solid #000; font-size:14px; width:140px;" />
        <button class="btn btn-small" onclick="setRestCustom()" style="width:auto;">Set</button>
      </div>
      <div class="rest-actions">
        <button class="btn" id="restStartBtn" onclick="startRestTimer()" style="width:auto; min-width:100px;">Start</button>
        <button class="btn btn-secondary" onclick="resetRestTimer()" style="width:auto;">Reset</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  updateRestDisplay();
}

function formatRestTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;

  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function showRestTimer() {
  setRestTimerVisible(true);

  // If no active countdown, pre-load the saved duration
  if (!restTimerRunning && restTimerSeconds === 0) {
    setRestTimerSeconds(restTimerTotal);
  }

  renderRestTimerOverlay();
}

export function hideRestTimer() {
  setRestTimerVisible(false);
  const overlay = document.getElementById("restTimerOverlay");
  if (overlay) overlay.classList.remove("active");
}

export function setRestDuration(seconds) {
  setRestTimerTotal(seconds);

  localStorage.setItem("restTimerDuration", seconds);
  if (!restTimerRunning) {
    setRestTimerSeconds(seconds);
  }

  updateRestDisplay();
}

export function setRestCustom() {
  const val = parseInt(document.getElementById("restCustomInput").value);

  if (val && val > 0) {
    setRestDuration(val);
    document.getElementById("restCustomInput").value = "";
  }
}

export function startRestTimer() {
  if (restTimerRunning) return;
  if (restTimerSeconds === 0) setRestTimerSeconds(restTimerTotal);

  setRestTimerRunning(true);
  const btn = document.getElementById("restStartBtn");
  if (btn) btn.textContent = "Running…";

  const interval = setInterval(() => {
    setRestTimerSeconds(restTimerSeconds - 1);
    updateRestDisplay();

    if (restTimerSeconds <= 0) {
      clearInterval(restTimerInterval);
      setRestTimerRunning(false);
      setRestTimerInterval(null);
      setRestTimerSeconds(0);
      updateRestDisplay();

      if ("vibrate" in navigator) navigator.vibrate([300, 100, 300, 100, 300]);
      // Flash the panel
      const panel = document.querySelector(".rest-timer-panel");

      if (panel) {
        panel.classList.add("rest-done");
        setTimeout(() => panel.classList.remove("rest-done"), 2000);
      }

      const startBtn = document.getElementById("restStartBtn");
      if (startBtn) startBtn.textContent = "Start";
    }
  }, 1000);

  setRestTimerInterval(interval);
}

export function resetRestTimer() {
  if (restTimerInterval) clearInterval(restTimerInterval);
  
  setRestTimerRunning(false);
  setRestTimerInterval(null);
  setRestTimerSeconds(restTimerTotal);
  updateRestDisplay();

  const btn = document.getElementById("restStartBtn");

  if (btn) btn.textContent = "Start";
}

/**
 * Called when user finishes a set — starts rest timer immediately
 */
export function startRestAfterSet() {
  showRestTimer();
  resetRestTimer();
  startRestTimer();
}

function updateRestDisplay() {
  const display = document.getElementById("restDisplay");
  if (display) display.textContent = formatRestTime(restTimerSeconds);

  const progress = document.getElementById("restProgress");
  if (progress) {
    const circumference = 2 * Math.PI * 42; // ~263.9
    if (restTimerTotal === 0) {
      progress.style.strokeDashoffset = 0;
      return;
    }
    const ratio = restTimerSeconds / restTimerTotal;
    progress.style.strokeDashoffset = circumference - ratio * circumference;

    if (restTimerSeconds <= 10 && restTimerSeconds > 0) {
      progress.style.stroke = "#ff4444";
    } else {
      progress.style.stroke = "";
    }
  }
}

// Expose globally
window.setTimer = setTimer;
window.setCustomTimer = setCustomTimer;
window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
window.showRestTimer = showRestTimer;
window.hideRestTimer = hideRestTimer;
window.setRestDuration = setRestDuration;
window.setRestCustom = setRestCustom;
window.startRestTimer = startRestTimer;
window.resetRestTimer = resetRestTimer;
window.startRestAfterSet = startRestAfterSet;
window.initRestTimer = initRestTimer;