let presets = [];
let workouts = [];
let currentPresetId = null;
let currentWorkoutId = null;
let presetExercises = [];
let exercises = [];
let confirmCallback = null;
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;
let library = [];
let currentExerciseId = null;

function showConfirm(message, callback, isConfirmation = true) {
  document.getElementById("confirmMessage").textContent = message;
  const deleteBtn = document.querySelector(".confirm-buttons .btn-danger");
  const cancelBtn = document.querySelector(".confirm-buttons .btn-secondary");

  if (isConfirmation) {
    deleteBtn.style.display = "inline-block";
    deleteBtn.textContent = "Go Ahead";
    cancelBtn.textContent = "Cancel";
  } else {
    deleteBtn.style.display = "none";
    cancelBtn.textContent = "OK";
  }

  document.getElementById("confirmModal").classList.add("active");
  confirmCallback = callback;
}

function confirmAction(result) {
  document.getElementById("confirmModal").classList.remove("active");
  if (confirmCallback) {
    confirmCallback(result);
    confirmCallback = null;
  }
}

function init() {
  const savedPresets = localStorage.getItem("presets");
  if (savedPresets) {
    presets = JSON.parse(savedPresets);
  }
  const savedWorkouts = localStorage.getItem("workouts");
  if (savedWorkouts) {
    workouts = JSON.parse(savedWorkouts);
  }
  const savedLibrary = localStorage.getItem("library");
  if (savedLibrary) {
    library = JSON.parse(savedLibrary);
  }
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }
  renderPresets();
  renderWorkouts();
  renderLibrary();
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

function saveToStorage() {
  localStorage.setItem("presets", JSON.stringify(presets));
  localStorage.setItem("workouts", JSON.stringify(workouts));
  localStorage.setItem("library", JSON.stringify(library));
}

function switchTab(tab) {
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));

  if (tab === "presets") {
    document.querySelectorAll(".tab")[0].classList.add("active");
    document.getElementById("presetsTab").classList.add("active");
  } else if (tab === "workouts") {
    document.querySelectorAll(".tab")[1].classList.add("active");
    document.getElementById("workoutsTab").classList.add("active");
  } else if (tab === "library") {
    document.querySelectorAll(".tab")[2].classList.add("active");
    document.getElementById("libraryTab").classList.add("active");
  } else if (tab === "timer") {
    document.querySelectorAll(".tab")[3].classList.add("active");
    document.getElementById("timerTab").classList.add("active");
  }
}

// PRESET FUNCTIONS
function showCreatePresetModal() {
  currentPresetId = null;
  presetExercises = [];
  document.getElementById("presetName").value = "";
  document.getElementById("presetModalTitle").textContent = "New Preset";
  renderPresetExercises();
  document.getElementById("presetModal").classList.add("active");
}

function showEditPresetModal(id) {
  const preset = presets.find((p) => p.id === id);
  if (!preset) return;

  currentPresetId = id;
  presetExercises = JSON.parse(JSON.stringify(preset.exercises));
  document.getElementById("presetName").value = preset.name;
  document.getElementById("presetModalTitle").textContent = "Edit Preset";
  renderPresetExercises();
  document.getElementById("presetModal").classList.add("active");
}

function closePresetModal() {
  document.getElementById("presetModal").classList.remove("active");
}

function toggleExerciseSelection(exerciseId) {
  const index = presetExercises.findIndex((e) => e.id === exerciseId);
  if (index > -1) {
    presetExercises.splice(index, 1);
  } else {
    const exercise = library.find((e) => e.id === exerciseId);
    if (exercise) {
      presetExercises.push({ id: exercise.id, name: exercise.name });
    }
  }
}

function renderPresetExercises() {
  const container = document.getElementById("presetExercisesList");
  if (library.length === 0) {
    container.innerHTML =
      '<p style="text-align:center; color:#666;">No exercises in library. Go to Library tab to add exercises.</p>';
    return;
  }

  const selectedIds = presetExercises.map((e) => e.id);

  container.innerHTML = library
    .map(
      (exercise) => `
                <div class="exercise-checkbox-item">
                    <input type="checkbox" 
                           id="ex-${exercise.id}" 
                           ${selectedIds.includes(exercise.id) ? "checked" : ""}
                           onchange="toggleExerciseSelection(${
                             exercise.id
                           }); renderPresetExercises()">
                    <label for="ex-${exercise.id}">${exercise.name}</label>
                </div>
            `
    )
    .join("");
}

function savePreset() {
  const name = document.getElementById("presetName").value.trim();

  if (!name) {
    showConfirm("Please enter a preset name", () => {}, false);
    return;
  }

  if (presetExercises.length === 0) {
    showConfirm("Please select at least one exercise", () => {}, false);
    return;
  }

  const preset = {
    id: currentPresetId || Date.now(),
    name,
    exercises: JSON.parse(JSON.stringify(presetExercises)),
  };

  if (currentPresetId) {
    const index = presets.findIndex((p) => p.id === currentPresetId);
    presets[index] = preset;
  } else {
    presets.push(preset);
  }

  saveToStorage();
  closePresetModal();
  renderPresets();
}

// LIBRARY FUNCTIONS
function showCreateExerciseModal() {
  currentExerciseId = null;
  document.getElementById("exerciseName").value = "";
  document.getElementById("exerciseNotes").value = "";
  document.getElementById("exerciseModalTitle").textContent = "New Exercise";
  document.getElementById("exerciseModal").classList.add("active");
}

function showEditExerciseModal(id) {
  const exercise = library.find((e) => e.id === id);
  if (!exercise) return;

  currentExerciseId = id;
  document.getElementById("exerciseName").value = exercise.name;
  document.getElementById("exerciseNotes").value = exercise.notes || "";
  document.getElementById("exerciseModalTitle").textContent = "Edit Exercise";
  document.getElementById("exerciseModal").classList.add("active");
}

function closeExerciseModal() {
  document.getElementById("exerciseModal").classList.remove("active");
}

function saveExercise() {
  const name = document.getElementById("exerciseName").value.trim();
  const notes = document.getElementById("exerciseNotes").value.trim();

  if (!name) {
    showConfirm("Please enter an exercise name", () => {}, false);
    return;
  }

  const duplicate = library.find(
    (e) =>
      e.name.toLowerCase() === name.toLowerCase() && e.id !== currentExerciseId
  );

  if (duplicate) {
    showConfirm("An exercise with this name already exists.", () => {}, false);
    return;
  }

  const exercise = {
    id: currentExerciseId || Date.now(),
    name,
    notes: notes || "",
  };

  if (currentExerciseId) {
    const index = library.findIndex((e) => e.id === currentExerciseId);
    library[index] = exercise;

    // Update exercise name in all presets and workouts
    presets.forEach((preset) => {
      preset.exercises.forEach((ex) => {
        if (ex.id === currentExerciseId) {
          ex.name = name;
        }
      });
    });

    workouts.forEach((workout) => {
      workout.exercises.forEach((ex) => {
        if (ex.id === currentExerciseId) {
          ex.name = name;
        }
      });
    });
  } else {
    library.push(exercise);
  }

  saveToStorage();
  closeExerciseModal();
  renderLibrary();
  renderPresets();
  renderWorkouts();
}

function deleteExercise(id) {
  showConfirm(
    "Delete this exercise? It will be removed from all presets.",
    (result) => {
      if (result) {
        library = library.filter((e) => e.id !== id);

        // Remove from all presets
        presets.forEach((preset) => {
          preset.exercises = preset.exercises.filter((e) => e.id !== id);
        });

        saveToStorage();
        renderLibrary();
        renderPresets();
      }
    }
  );
}

function renderLibrary() {
  const container = document.getElementById("libraryList");

  if (library.length === 0) {
    container.innerHTML = `
                    <div class="empty-state">
                        <h3>No exercises yet!</h3>
                        <p>Create your first exercise.</p>
                    </div>
                `;
    return;
  }

  const sortedLibrary = [...library].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  container.innerHTML = sortedLibrary
    .map(
      (exercise) => `
                <div class="workout-card" onclick="showEditExerciseModal(${
                  exercise.id
                })">
                    <h3>${exercise.name}</h3>
                    ${
                      exercise.notes
                        ? `<p class="exercise-notes">${exercise.notes}</p>`
                        : ""
                    }
                    <button class="btn btn-small btn-danger" 
                            style="margin-top: 12px;"
                            onclick="event.stopPropagation(); deleteExercise(${
                              exercise.id
                            })">
                        Delete
                    </button>
                </div>
            `
    )
    .join("");
}

function deletePreset(id) {
  showConfirm("Delete this preset?", (result) => {
    if (result) {
      presets = presets.filter((p) => p.id !== id);
      saveToStorage();
      renderPresets();
    }
  });
}

function renderPresets() {
  const container = document.getElementById("presetList");

  if (presets.length === 0) {
    container.innerHTML = `
                    <div class="empty-state">
                        <h3>No presets yet!</h3>
                        <p>Create your first preset.</p>
                    </div>
                `;
    return;
  }

  container.innerHTML = presets
    .map(
      (preset) => `
                <div class="workout-card" onclick="showEditPresetModal(${
                  preset.id
                })">
                    <h3>${preset.name}</h3>
                    <p>Exercises: ${preset.exercises.length}</p>
                    <p>${preset.exercises.map((e) => e.name).join(", ")}</p>
                    <button class="btn btn-small btn-danger" 
                            style="margin-top: 12px;"
                            onclick="event.stopPropagation(); deletePreset(${
                              preset.id
                            })">
                        Delete
                    </button>
                </div>
            `
    )
    .join("");
}

// WORKOUT FUNCTIONS
function showTrackWorkoutModal() {
  currentWorkoutId = null;
  exercises = [];
  document.getElementById("workoutPreset").value = "";
  document.getElementById("workoutDate").value = new Date()
    .toISOString()
    .split("T")[0];
  document.getElementById("cardioType").value = "";
  document.getElementById("cardioDuration").value = "";
  document.getElementById("workoutModalTitle").textContent = "Track Workout";
  document.getElementById("exercisesList").innerHTML = "";
  populatePresetDropdown();
  document.getElementById("workoutModal").classList.add("active");
}

function showEditWorkoutModal(id) {
  const workout = workouts.find((w) => w.id === id);
  if (!workout) return;

  currentWorkoutId = id;
  exercises = JSON.parse(JSON.stringify(workout.exercises));
  document.getElementById("workoutPreset").value = workout.presetId || "";
  document.getElementById("workoutDate").value = workout.date;
  document.getElementById("cardioType").value = workout.cardio?.type || "";
  document.getElementById("cardioDuration").value =
    workout.cardio?.duration || "";
  document.getElementById("workoutModalTitle").textContent = "Edit Workout";
  populatePresetDropdown();
  renderExercises();
  document.getElementById("workoutModal").classList.add("active");
}

function closeWorkoutModal() {
  document.getElementById("workoutModal").classList.remove("active");
}

function populatePresetDropdown() {
  const select = document.getElementById("workoutPreset");
  select.innerHTML =
    '<option value="">Choose a preset</option>' +
    presets.map((p) => `<option value="${p.id}">${p.name}</option>`).join("");
}

function loadPresetExercises() {
  const presetId = parseInt(document.getElementById("workoutPreset").value);
  if (!presetId) {
    exercises = [];
    renderExercises();
    return;
  }

  const preset = presets.find((p) => p.id === presetId);
  if (!preset) return;

  exercises = preset.exercises.map((e) => ({
    id: Date.now() + Math.random(),
    name: e.name,
    sets: [{ type: "warmup", weight: 0, reps: 0 }],
  }));

  renderExercises();
}

function addSet(exerciseId) {
  const exercise = exercises.find((e) => e.id === exerciseId);
  if (exercise) {
    exercise.sets.push({ type: "working", weight: 0, reps: 0 });
    renderExercises();
  }
}

function removeSet(exerciseId, setIndex) {
  const exercise = exercises.find((e) => e.id === exerciseId);
  if (exercise && exercise.sets.length > 1) {
    exercise.sets.splice(setIndex, 1);
    renderExercises();
  }
}

function updateSetType(exerciseId, setIndex, type) {
  const exercise = exercises.find((e) => e.id === exerciseId);
  if (exercise) {
    exercise.sets[setIndex].type = type;
  }
}

function updateSetWeight(exerciseId, setIndex, weight) {
  const exercise = exercises.find((e) => e.id === exerciseId);
  if (exercise) {
    exercise.sets[setIndex].weight = parseFloat(weight) || 0;
  }
}

function updateSetReps(exerciseId, setIndex, reps) {
  const exercise = exercises.find((e) => e.id === exerciseId);
  if (exercise) {
    exercise.sets[setIndex].reps = parseInt(reps) || 0;
  }
}

function renderExercises() {
  const container = document.getElementById("exercisesList");
  if (exercises.length === 0) {
    container.innerHTML =
      '<p style="text-align:center; color:#666;">Select a preset to load exercises</p>';
    return;
  }

  container.innerHTML = exercises
    .map(
      (exercise) => `
                <div class="exercise-item">
                    <div class="exercise-header">
                        <h4>${exercise.name}</h4>
                    </div>
                    
                    <div class="sets-container">
                        <div class="set-labels">
                            <div>Set</div>
                            <div>Type</div>
                            <div>Weight</div>
                            <div>Reps</div>
                        </div>
                        ${exercise.sets
                          .map(
                            (set, idx) => `
                            <div class="set-row">
                                <div class="set-number">${idx + 1}</div>
                                <select onchange="updateSetType(${
                                  exercise.id
                                }, ${idx}, this.value)">
                                    <option value="warmup" ${
                                      set.type === "warmup" ? "selected" : ""
                                    }>Warmup</option>
                                    <option value="working" ${
                                      set.type === "working" ? "selected" : ""
                                    }>Working</option>
                                </select>
                                <input type="number" value="${set.weight}" 
                                       onchange="updateSetWeight(${
                                         exercise.id
                                       }, ${idx}, this.value)"
                                       placeholder="kg">
                                <input type="number" value="${set.reps}" 
                                       onchange="updateSetReps(${
                                         exercise.id
                                       }, ${idx}, this.value)"
                                       placeholder="0">
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                    
                    <div class="button-row" style="margin-top: 12px;">
                        <button class="btn btn-small btn-secondary" onclick="addSet(${
                          exercise.id
                        })">Add Set</button>
                        ${
                          exercise.sets.length > 1
                            ? `<button class="btn btn-small btn-danger" onclick="removeSet(${
                                exercise.id
                              }, ${
                                exercise.sets.length - 1
                              })">Remove Set</button>`
                            : ""
                        }
                    </div>
                </div>
            `
    )
    .join("");
}

function saveWorkout() {
  const presetId = parseInt(document.getElementById("workoutPreset").value);
  const date = document.getElementById("workoutDate").value;
  const cardioType = document.getElementById("cardioType").value.trim();
  const cardioDuration =
    parseInt(document.getElementById("cardioDuration").value) || 0;

  if (!presetId) {
    showConfirm("Please select a preset", () => {}, false);
    return;
  }

  if (exercises.length === 0) {
    showConfirm("No exercises to track", () => {}, false);
    return;
  }

  const preset = presets.find((p) => p.id === presetId);
  const workout = {
    id: currentWorkoutId || Date.now(),
    presetId,
    presetName: preset.name,
    date,
    exercises: JSON.parse(JSON.stringify(exercises)),
  };

  if (cardioType && cardioDuration > 0) {
    workout.cardio = {
      type: cardioType,
      duration: cardioDuration,
    };
  }

  if (currentWorkoutId) {
    const index = workouts.findIndex((w) => w.id === currentWorkoutId);
    workouts[index] = workout;
  } else {
    workouts.push(workout);
  }

  saveToStorage();
  closeWorkoutModal();
  renderWorkouts();
}

function deleteWorkout(id) {
  showConfirm("Delete this workout?", (result) => {
    if (result) {
      workouts = workouts.filter((w) => w.id !== id);
      saveToStorage();
      renderWorkouts();
    }
  });
}

function renderWorkouts() {
  const container = document.getElementById("workoutList");

  if (workouts.length === 0) {
    container.innerHTML = `
                    <div class="empty-state">
                        <h3>No workouts yet!</h3>
                        <p>Track your first workout.</p>
                    </div>
                `;
    return;
  }

  const sorted = [...workouts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  container.innerHTML = sorted
    .map(
      (workout) => `
                <div class="workout-card" onclick="showEditWorkoutModal(${
                  workout.id
                })">
                    <h3>${workout.presetName}</h3>
                    <p>Date: ${new Date(workout.date).toLocaleDateString()}</p>
                    <p>Exercises: ${workout.exercises.length}</p>
                    <p>Total Sets: ${workout.exercises.reduce(
                      (sum, ex) => sum + ex.sets.length,
                      0
                    )}</p>
                    ${
                      workout.cardio
                        ? `<p>Cardio: ${workout.cardio.type} - ${workout.cardio.duration} min</p>`
                        : ""
                    }
                    <button class="btn btn-small btn-danger" 
                            style="margin-top: 12px;"
                            onclick="event.stopPropagation(); deleteWorkout(${
                              workout.id
                            })">
                        Delete
                    </button>
                </div>
            `
    )
    .join("");
}

// EXPORT/IMPORT FUNCTIONS
function exportData() {
  const data = {
    presets,
    workouts,
    library,
    exportDate: new Date().toISOString(),
  };

  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `workout-tracker-${
    new Date().toISOString().split("T")[0]
  }.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);

      if (!data.presets || !data.workouts) {
        showConfirm("Invalid file format", () => {}, false);
        return;
      }

      showConfirm(
        "Import data? This will replace your current data.",
        (result) => {
          if (result) {
            presets = data.presets;
            workouts = data.workouts;
            library = data.library || [];
            saveToStorage();
            renderPresets();
            renderWorkouts();
            renderLibrary();
            showConfirm("Data imported successfully.", () => {}, false);
          }
        }
      );
    } catch (error) {
      showConfirm(
        "Error reading file. Please ensure it is a valid JSON file.",
        () => {},
        false
      );
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

// TIMER FUNCTIONS
function setTimer(seconds) {
  timerSeconds = seconds;
  updateTimerDisplay();
  if (timerRunning) {
    pauseTimer();
  }
}

function setCustomTimer() {
  const customSeconds = parseInt(document.getElementById("customTime").value);
  if (customSeconds && customSeconds > 0) {
    setTimer(customSeconds);
    document.getElementById("customTime").value = "";
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  document.getElementById("timerDisplay").textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function startTimer() {
  if (timerSeconds === 0) return;

  timerRunning = true;
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("pauseBtn").style.display = "inline-block";

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay();

    if (timerSeconds === 0) {
      pauseTimer();
      if ("vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
      alert("Time's up!");
    }
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
  document.getElementById("startBtn").style.display = "inline-block";
  document.getElementById("pauseBtn").style.display = "none";
}

function resetTimer() {
  pauseTimer();
  timerSeconds = 0;
  updateTimerDisplay();
}

init();
