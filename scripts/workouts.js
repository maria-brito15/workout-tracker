import {
  workouts,
  presets,
  library,
  exercises,
  currentWorkoutId,
  isCustomWorkout,
  cardioExercises,
  addExerciseSearchQuery,
  setExercises,
  setCurrentWorkoutId,
  setIsCustomWorkout,
  setCardioExercises,
  setAddExerciseSearchQuery,
} from "./state.js";
import { saveToStorage } from "./storage.js";
import { showConfirm } from "./ui.js";
import { showEditExerciseModal } from "./library.js";

/**
 * Show modal to create a new workout
 */
export function showCreateWorkoutModal() {
  setCurrentWorkoutId(null);
  setExercises([]);
  setIsCustomWorkout(false);
  setCardioExercises([]);

  document.getElementById("workoutPreset").value = "";
  document.getElementById("workoutDate").value = new Date()
    .toISOString()
    .split("T")[0];

  document.getElementById("workoutModalTitle").textContent = "New Workout";

  renderPresetOptions();
  renderWorkoutExercises();
  renderCardioExercises();
  updateAddExerciseButton();

  document.getElementById("workoutModal").classList.add("active");
}

/**
 * Show modal to edit an existing workout
 * @param {number} id - Workout ID
 */
export function showEditWorkoutModal(id) {
  const workout = workouts.find((w) => w.id === id);
  if (!workout) return;

  setCurrentWorkoutId(id);
  setExercises(JSON.parse(JSON.stringify(workout.exercises)));
  setIsCustomWorkout(workout.presetId === null);
  setCardioExercises(
    workout.cardioExercises
      ? JSON.parse(JSON.stringify(workout.cardioExercises))
      : [],
  );

  document.getElementById("workoutPreset").value = workout.presetId || "custom";
  document.getElementById("workoutDate").value = workout.date;

  document.getElementById("workoutModalTitle").textContent = "Edit Workout";

  renderPresetOptions();
  renderWorkoutExercises();
  renderCardioExercises();
  updateAddExerciseButton();

  document.getElementById("workoutModal").classList.add("active");
}

/**
 * Close workout modal
 */
export function closeWorkoutModal() {
  document.getElementById("workoutModal").classList.remove("active");
}

/**
 * Handle preset selection change
 */
export function onPresetChange() {
  const presetValue = document.getElementById("workoutPreset").value;

  if (presetValue === "custom") {
    setIsCustomWorkout(true);
    setExercises([]);
  } else if (presetValue) {
    setIsCustomWorkout(true);
    const preset = presets.find((p) => p.id === parseInt(presetValue));

    if (preset) {
      const newExercises = preset.exercises.map((ex) => {
        const libraryExercise = library.find((e) => e.id === ex.id);
        return {
          id: ex.id,
          name: ex.name,
          notes: libraryExercise ? libraryExercise.notes : "",
          sets: [{ type: "warmup", weight: "", reps: "" }],
        };
      });

      setExercises(newExercises);
    }
  }

  renderWorkoutExercises();
  updateAddExerciseButton();
}

/**
 * Update visibility of Add Exercise button
 */
export function updateAddExerciseButton() {
  const container = document.getElementById("addExerciseButtonContainer");
  const presetValue = document.getElementById("workoutPreset").value;
  container.style.display = isCustomWorkout || presetValue ? "block" : "none";
}

/**
 * Render preset dropdown options
 */
export function renderPresetOptions() {
  const select = document.getElementById("workoutPreset");
  const currentValue = select.value;

  const options = presets
    .map(
      (preset) => `
        <option value="${preset.id}">${preset.name}</option>
    `,
    )
    .join("");

  select.innerHTML = `
        <option value="" disabled selected>Select a Preset or Custom Workout</option>
        ${options}
        <option value="custom">Custom Workout</option>
    `;

  if (currentValue) {
    select.value = currentValue;
  }
}

/**
 * Show modal to add exercise to custom workout
 */
export function showAddExerciseModal() {
  const modal = document.getElementById("addExerciseModal");
  setAddExerciseSearchQuery("");
  const searchInput = document.getElementById("addExerciseSearch");
  if (searchInput) {
    searchInput.value = "";
  }
  renderAddExerciseList();
  modal.classList.add("active");
}

/**
 * Render the list of exercises in the Add Exercise modal
 */
export function renderAddExerciseList() {
  const container = document.getElementById("addExerciseList");
  const query = addExerciseSearchQuery.toLowerCase().trim();

  let filteredExercises = library;
  if (query) {
    filteredExercises = library.filter((ex) =>
      ex.name.toLowerCase().includes(query),
    );
  }

  if (filteredExercises.length === 0) {
    if (query) {
      container.innerHTML = `
        <div style="text-align:center; padding: 20px;">
          <p style="color:#665; margin-bottom: 16px;">No exercise found with that name.</p>
          <button class="btn" onclick="createAndAddExercise('${query}')">
            Create "${query}"
          </button>
        </div>
      `;
    } else {
      container.innerHTML =
        '<p style="text-align:center; color:#665; padding: 20px;">No exercises in library.</p>';
    }
  } else {
    let html = filteredExercises
      .map((exercise) => {
        // Format notes with proper line breaks
        const formattedNotes = exercise.notes
          ? exercise.notes.replace(/\n/g, "<br>")
          : "";

        return `
            <div class="exercise-select-item" onclick="addExerciseToWorkout(${exercise.id})">
                <h4>${exercise.name}</h4>
                ${formattedNotes ? `<p class="exercise-select-notes" style="white-space: pre-line; line-height: 1.5;">${formattedNotes}</p>` : ""}
            </div>
        `;
      })
      .join("");

    if (
      query &&
      !filteredExercises.some((ex) => ex.name.toLowerCase() === query)
    ) {
      html += `
        <div style="border-top: 1px solid #eee; margin-top: 16px; padding-top: 16px; text-align: center;">
          <p style="color:#665; margin-bottom: 8px; font-size: 14px;">Can't find what you're looking for?</p>
          <button class="btn btn-small" onclick="createAndAddExercise('${query}')">
            Create "${query}"
          </button>
        </div>
      `;
    }
    container.innerHTML = html;
  }
}

/**
 * Handle search input change in add exercise modal
 */
export function onAddExerciseSearchChange(event) {
  setAddExerciseSearchQuery(event.target.value);
  renderAddExerciseList();
}

/**
 * Clear search in add exercise modal
 */
export function clearAddExerciseSearch() {
  setAddExerciseSearchQuery("");
  const searchInput = document.getElementById("addExerciseSearch");
  if (searchInput) {
    searchInput.value = "";
  }
  renderAddExerciseList();
}

/**
 * Create a new exercise and add it to the workout
 * @param {string} name - Exercise name
 */
export function createAndAddExercise(name) {
  // Close the add exercise selection modal first
  closeAddExerciseModal();

  // Wait a tiny bit for the first modal to start closing animation (if any)
  // then show the creation modal.
  setTimeout(() => {
    import("./library.js").then((m) => {
      m.showCreateExerciseModal(name, true);
    });
  }, 50);
}

/**
 * Close add exercise modal
 */
export function closeAddExerciseModal() {
  document.getElementById("addExerciseModal").classList.remove("active");
}

/**
 * Add exercise to custom workout
 * @param {number} exerciseId - Exercise ID
 */
export function addExerciseToWorkout(exerciseId) {
  const exercise = library.find((e) => e.id === exerciseId);
  if (!exercise) return;

  const alreadyAdded = exercises.some((e) => e.id === exerciseId);
  if (alreadyAdded) {
    showConfirm("Exercise already added to this workout", () => {}, false);
    return;
  }

  exercises.push({
    id: exercise.id,
    name: exercise.name,
    notes: exercise.notes || "",
    sets: [{ type: "warmup", weight: "", reps: "" }],
  });

  closeAddExerciseModal();
  renderWorkoutExercises();
}

/**
 * Remove exercise from custom workout
 * @param {number} exerciseId - Exercise ID
 */
export function removeExerciseFromWorkout(exerciseId) {
  showConfirm("Remove this exercise from workout?", (result) => {
    if (result) {
      const index = exercises.findIndex((e) => e.id === exerciseId);
      if (index > -1) {
        exercises.splice(index, 1);
        renderWorkoutExercises();
      }
    }
  });
}

/**
 * Add a new cardio exercise
 */
export function addCardio() {
  cardioExercises.push({
    id: Date.now(),
    type: "",
    duration: "",
  });
  renderCardioExercises();
}

/**
 * Update cardio exercise data
 * @param {number} cardioId - Cardio exercise ID
 * @param {string} field - Field to update (type or duration)
 * @param {string} value - New value
 */
export function updateCardio(cardioId, field, value) {
  const cardio = cardioExercises.find((c) => c.id === cardioId);
  if (cardio) {
    cardio[field] = value;
  }
}

/**
 * Remove a cardio exercise
 * @param {number} cardioId - Cardio exercise ID
 */
export function removeCardio(cardioId) {
  showConfirm("Remove this cardio exercise?", (result) => {
    if (result) {
      const index = cardioExercises.findIndex((c) => c.id === cardioId);
      if (index > -1) {
        cardioExercises.splice(index, 1);
        renderCardioExercises();
      }
    }
  });
}

/**
 * Render cardio exercises list
 */
export function renderCardioExercises() {
  const container = document.getElementById("cardioExercisesList");

  if (cardioExercises.length === 0) {
    container.innerHTML = `
      <p style="text-align:center; color:#665; margin: 16px 0;">
        No cardio exercises added yet. Click "Add Cardio" to get started.
      </p>
    `;
    return;
  }

  const cardioHTML = cardioExercises
    .map((cardio, index) => {
      return `
      <div class="cardio-block">
        <div class="cardio-header">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <h4 style="margin: 0; font-size: 16px; font-weight: 600;">Cardio #${index + 1}</h4>
            <button class="btn btn-small btn-danger" onclick="removeCardio(${cardio.id})">Remove</button>
          </div>
        </div>
        
        <div class="sets-container">
          <div class="set-labels" style="grid-template-columns: 1fr 1fr;">
            <div>Type</div>
            <div>Duration (minutes)</div>
          </div>
          <div class="set-row" style="grid-template-columns: 1fr 1fr;">
            <div class="set-input">
              <input 
                type="text" 
                value="${cardio.type || ""}" 
                placeholder="e.g., Bike, Running"
                onchange="updateCardio(${cardio.id}, 'type', this.value)"
              />
            </div>
            <div class="set-input">
              <input 
                type="number" 
                value="${cardio.duration || ""}" 
                placeholder="30"
                min="0"
                onchange="updateCardio(${cardio.id}, 'duration', this.value)"
              />
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  container.innerHTML = cardioHTML;
}

/**
 * Add a set to an exercise
 * @param {number} exerciseId - Exercise ID
 */
export function addSet(exerciseId) {
  const exercise = exercises.find((e) => e.id === exerciseId);
  if (exercise) {
    exercise.sets.push({ type: "normal", weight: "", reps: "" });
    renderWorkoutExercises();
  }
}

/**
 * Remove the last set from an exercise
 * @param {number} exerciseId - Exercise ID
 * @param {number} setIndex - Set index
 */
export function removeSet(exerciseId, setIndex) {
  const exercise = exercises.find((e) => e.id === exerciseId);
  if (exercise && exercise.sets.length > 1) {
    exercise.sets.splice(setIndex, 1);
    renderWorkoutExercises();
  }
}

/**
 * Update set data
 * @param {number} exerciseId - Exercise ID
 * @param {number} setIndex - Set index
 * @param {string} field - Field to update
 * @param {string} value - New value
 */
export function updateSet(exerciseId, setIndex, field, value) {
  const exercise = exercises.find((e) => e.id === exerciseId);
  if (exercise && exercise.sets[setIndex]) {
    exercise.sets[setIndex][field] = value;
  }
}

/**
 * Render workout exercises
 */
export function renderWorkoutExercises() {
  const container = document.getElementById("workoutExercisesList");

  if (exercises.length === 0) {
    container.innerHTML = `
            <p style="text-align:center; color:#665;">
                ${isCustomWorkout ? "No exercises added yet. Click 'Add Exercise' to get started." : "Select a preset to begin tracking."}
            </p>
        `;
    return;
  }

  const exercisesHTML = exercises.map((exercise) => {
    // Format notes with proper line breaks
    const formattedNotes = exercise.notes
      ? exercise.notes.replace(/\n/g, "<br>")
      : "";

    const setsHTML = exercise.sets
      .map(
        (set, index) => `
            <div class="set-row">
                <div class="set-number">${index + 1}</div>
                <div class="set-type">
                    <select onchange="updateSet(${exercise.id}, ${index}, 'type', this.value)">
                        <option value="warmup" ${set.type === "warmup" || set.type === "W" ? "selected" : ""}>Warm-up</option>
                        <option value="normal" ${set.type === "normal" || set.type === "D" ? "selected" : ""}>Normal</option>
                        <option value="failure" ${set.type === "failure" || set.type === "F" ? "selected" : ""}>Failure</option>
                    </select>
                </div>
                <div class="set-input">
                    <input type="number" 
                           value="${set.weight}" 
                           placeholder="0"
                           step="0.5"
                           onchange="updateSet(${exercise.id}, ${index}, 'weight', this.value)">
                </div>
                <div class="set-input">
                    <input type="number" 
                           value="${set.reps}" 
                           placeholder="0"
                           onchange="updateSet(${exercise.id}, ${index}, 'reps', this.value)">
                </div>
            </div>
        `,
      )
      .join("");

    return `
        <div class="exercise-block">
            <div class="exercise-header">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <h4 style="margin: 0;">${exercise.name}</h4>
                    ${
                      isCustomWorkout
                        ? `<button class="btn btn-small btn-danger" onclick="removeExerciseFromWorkout(${exercise.id})">Remove</button>`
                        : ""
                    }
                </div>
                ${formattedNotes ? `<div class="exercise-notes" style="margin: 8px 0; white-space: pre-line; line-height: 1.6;">${formattedNotes}</div>` : ""}
            </div>
            
            <div class="sets-container">
                <div class="set-labels">
                    <div>Set</div>
                    <div>Type</div>
                    <div>Weight</div>
                    <div>Reps</div>
                </div>
                ${setsHTML}
            </div>
            
            <div class="button-row" style="margin-top: 12px;">
                <button class="btn btn-small btn-secondary" onclick="addSet(${
                  exercise.id
                })">Add Set</button>
                ${
                  exercise.sets.length > 1
                    ? `<button class="btn btn-small btn-danger" onclick="removeSet(${
                        exercise.id
                      }, ${exercise.sets.length - 1})">Remove Set</button>`
                    : ""
                }
            </div>
        </div>
    `;
  });

  container.innerHTML = exercisesHTML.join("");
}

/**
 * Save workout (create or update)
 */
export function saveWorkout() {
  const presetValue = document.getElementById("workoutPreset").value;
  const date = document.getElementById("workoutDate").value;

  if (!date) {
    showConfirm("Please select a date", () => {}, false);
    return;
  }

  if (exercises.length === 0) {
    showConfirm("No exercises to track", () => {}, false);
    return;
  }

  let presetId = null;
  let presetName = "Custom Workout";

  if (presetValue && presetValue !== "custom") {
    presetId = parseInt(presetValue);
    const preset = presets.find((p) => p.id === presetId);
    if (preset) {
      presetName = preset.name;
    }
  }

  const workout = {
    id: currentWorkoutId || Date.now(),
    presetId: presetId,
    presetName: presetName,
    date,
    exercises: JSON.parse(JSON.stringify(exercises)),
  };

  const validCardio = cardioExercises.filter(
    (c) => c.type.trim() && c.duration,
  );
  if (validCardio.length > 0) {
    workout.cardioExercises = JSON.parse(JSON.stringify(validCardio));
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

/**
 * Delete a workout
 * @param {number} id - Workout ID
 */
export function deleteWorkout(id) {
  showConfirm("Delete this workout?", (result) => {
    if (result) {
      const index = workouts.findIndex((w) => w.id === id);
      if (index > -1) {
        workouts.splice(index, 1);
        saveToStorage();
        renderWorkouts();
      }
    }
  });
}

/**
 * Render workouts list
 */
export function renderWorkouts() {
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
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  container.innerHTML = sorted
    .map((workout) => {
      let cardioDisplay = "";
      if (workout.cardioExercises && workout.cardioExercises.length > 0) {
        cardioDisplay = `<p><strong>Cardio:</strong> ${workout.cardioExercises.length} exercise(s)</p>`;
        cardioDisplay += workout.cardioExercises
          .map(
            (c) =>
              `<p style="margin-left: 16px; font-size: 14px;">• ${c.type} - ${c.duration} min</p>`,
          )
          .join("");
      } else if (workout.cardio) {
        cardioDisplay = `<p>Cardio: ${workout.cardio.type} - ${workout.cardio.duration} min</p>`;
      }

      return `
                <div class="workout-card" onclick="showEditWorkoutModal(${
                  workout.id
                })">
                    <h3>${workout.presetName}</h3>
                    <p>Date: ${new Date(workout.date).toLocaleDateString()}</p>
                    <p>Exercises: ${workout.exercises.length}</p>
                    <p>Total Sets: ${workout.exercises.reduce(
                      (sum, ex) => sum + ex.sets.length,
                      0,
                    )}</p>
                    ${cardioDisplay}
                    <button class="btn btn-small btn-danger" 
                            style="margin-top: 12px;"
                            onclick="event.stopPropagation(); deleteWorkout(${
                              workout.id
                            })">
                        Delete
                    </button>
                </div>
            `;
    })
    .join("");
}

window.showCreateWorkoutModal = showCreateWorkoutModal;
window.showEditWorkoutModal = showEditWorkoutModal;
window.closeWorkoutModal = closeWorkoutModal;
window.onPresetChange = onPresetChange;
window.showAddExerciseModal = showAddExerciseModal;
window.closeAddExerciseModal = closeAddExerciseModal;
window.addExerciseToWorkout = addExerciseToWorkout;
window.onAddExerciseSearchChange = onAddExerciseSearchChange;
window.clearAddExerciseSearch = clearAddExerciseSearch;
window.createAndAddExercise = createAndAddExercise;
window.renderAddExerciseList = renderAddExerciseList;
window.removeExerciseFromWorkout = removeExerciseFromWorkout;
window.addSet = addSet;
window.removeSet = removeSet;
window.updateSet = updateSet;
window.saveWorkout = saveWorkout;
window.deleteWorkout = deleteWorkout;
window.addCardio = addCardio;
window.updateCardio = updateCardio;
window.removeCardio = removeCardio;

window.closeExerciseNotesModal = function () {
  document.getElementById("exerciseNotesModal").classList.remove("active");
};
