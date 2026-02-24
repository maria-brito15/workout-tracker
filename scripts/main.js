/**
 * Main entry point for the Workout Tracker application
 */

import { loadFromStorage } from "./storage.js";
import { switchTab } from "./ui.js";
import { renderPresets } from "./presets.js";
import { renderWorkouts } from "./workouts.js";
import { renderLibrary } from "./library.js";
import { initRestTimer } from "./timer.js";

import "./tags.js";
import "./timer.js";
import "./import-export.js";

function init() {
  loadFromStorage();
  renderPresets();
  renderWorkouts();
  renderLibrary();
  initRestTimer();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

export { init };