import { presets, workouts, library, setPresets, setWorkouts, setLibrary } from './state.js';

/**
 * Save all data to localStorage
 */
export function saveToStorage() {
  localStorage.setItem("presets", JSON.stringify(presets));
  localStorage.setItem("workouts", JSON.stringify(workouts));
  localStorage.setItem("library", JSON.stringify(library));
}

/**
 * Load data from localStorage
 */
export function loadFromStorage() {
  const savedPresets = localStorage.getItem("presets");
  if (savedPresets) {
    setPresets(JSON.parse(savedPresets));
  }

  const savedWorkouts = localStorage.getItem("workouts");
  if (savedWorkouts) {
    setWorkouts(JSON.parse(savedWorkouts));
  }

  const savedLibrary = localStorage.getItem("library");
  if (savedLibrary) {
    setLibrary(JSON.parse(savedLibrary));
  }
}