// Global state variables
export let presets = [];
export let workouts = [];
export let currentPresetId = null;
export let currentWorkoutId = null;
export let presetExercises = [];
export let exercises = [];
export let confirmCallback = null;
export let timerInterval = null;
export let timerSeconds = 0;
export let timerRunning = false;
export let library = [];
export let currentExerciseId = null;
export let isEditingFromWorkout = false;
export let isCustomWorkout = false;
export let selectedTags = [];
export let searchQuery = "";
export let cardioExercises = [];

// State setters
export function setPresets(value) {
  presets = value;
}

export function setWorkouts(value) {
  workouts = value;
}

export function setCurrentPresetId(value) {
  currentPresetId = value;
}

export function setCurrentWorkoutId(value) {
  currentWorkoutId = value;
}

export function setPresetExercises(value) {
  presetExercises = value;
}

export function setExercises(value) {
  exercises = value;
}

export function setConfirmCallback(value) {
  confirmCallback = value;
}

export function setTimerInterval(value) {
  timerInterval = value;
}

export function setTimerSeconds(value) {
  timerSeconds = value;
}

export function setTimerRunning(value) {
  timerRunning = value;
}

export function setLibrary(value) {
  library = value;
}

export function setCurrentExerciseId(value) {
  currentExerciseId = value;
}

export function setIsEditingFromWorkout(value) {
  isEditingFromWorkout = value;
}

export function setIsCustomWorkout(value) {
  isCustomWorkout = value;
}

export function setSelectedTags(value) {
  selectedTags = value;
}

export function setSearchQuery(value) {
  searchQuery = value;
}

export function setCardioExercises(value) {
  cardioExercises = value;
}