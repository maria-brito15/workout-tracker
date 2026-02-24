import {
  library,
  currentExerciseId,
  isEditingFromWorkout,
  exercises,
  searchQuery,
  selectedTags,
  setCurrentExerciseId,
  setIsEditingFromWorkout,
  setSearchQuery,
} from "./state.js";
import { saveToStorage } from "./storage.js";
import { showConfirm } from "./ui.js";
import { filterExercisesByTags, renderTagFilters } from "./tags.js";
import { renderWorkoutExercises } from "./workouts.js";

/**
 * Auto-capitalize: capitalize first letter of each word
 */
function toTitleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Show modal to create a new exercise
 * @param {string} defaultName - Optional default name
 * @param {boolean} fromWorkout - Whether creating from workout view
 */
export function showCreateExerciseModal(defaultName = "", fromWorkout = false) {
  setCurrentExerciseId(null);
  setIsEditingFromWorkout(fromWorkout);

  const nameInput = document.getElementById("exerciseName");
  nameInput.value = defaultName ? toTitleCase(defaultName) : "";
  nameInput.placeholder = "Bench Press";

  document.getElementById("exerciseTags").value = "";
  document.getElementById("exerciseNotes").value = "";
  document.getElementById("exerciseLastWeight").value = "";
  document.getElementById("exercisePR").value = "";
  document.getElementById("exerciseWarmupWeight").value = "";
  document.getElementById("exerciseSetSpec").value = "";
  document.getElementById("exerciseModalTitle").textContent = "New Exercise";
  document.getElementById("exerciseModal").classList.add("active");
}

/**
 * Show modal to edit an existing exercise
 * @param {number} id - Exercise ID
 * @param {boolean} fromWorkout - Whether editing from workout view
 */
export function showEditExerciseModal(id, fromWorkout = false) {
  const exercise = library.find((e) => e.id === id);
  if (!exercise) return;

  setCurrentExerciseId(id);
  setIsEditingFromWorkout(fromWorkout);

  document.getElementById("exerciseName").value = exercise.name;
  document.getElementById("exerciseTags").value = exercise.tags ? exercise.tags.join(", ") : "";
  document.getElementById("exerciseNotes").value = exercise.notes || "";
  document.getElementById("exerciseLastWeight").value = exercise.lastWeight || "";
  document.getElementById("exercisePR").value = exercise.pr || "";
  document.getElementById("exerciseWarmupWeight").value = exercise.warmupWeight || "";
  document.getElementById("exerciseSetSpec").value = exercise.setSpec || "";
  document.getElementById("exerciseModalTitle").textContent = "Edit Exercise";

  document.getElementById("exerciseModal").classList.add("active");
}

/**
 * Close exercise modal
 */
export function closeExerciseModal() {
  document.getElementById("exerciseModal").classList.remove("active");
  setIsEditingFromWorkout(false);
}

/**
 * Save exercise (create or update)
 */
export function saveExercise() {
  const rawName = document.getElementById("exerciseName").value.trim();
  if (!rawName) {
    showConfirm("Please enter an exercise name", () => {}, false);
    return;
  }

  const name = toTitleCase(rawName);
  const tagsInput = document.getElementById("exerciseTags").value.trim();
  const notes = document.getElementById("exerciseNotes").value.trim();
  const lastWeight = document.getElementById("exerciseLastWeight").value.trim();
  const pr = document.getElementById("exercisePR").value.trim();
  const warmupWeight = document.getElementById("exerciseWarmupWeight").value.trim();
  const setSpec = document.getElementById("exerciseSetSpec").value.trim();

  const tags = tagsInput ? tagsInput.split(",").map((t) => t.trim()).filter((t) => t) : [];

  const exercise = {
    id: currentExerciseId || Date.now(),
    name,
    tags,
    notes,
    lastWeight,
    pr,
    warmupWeight,
    setSpec,
  };

  if (currentExerciseId) {
    const index = library.findIndex((e) => e.id === currentExerciseId);
    library[index] = exercise;

    if (isEditingFromWorkout) {
      const workoutExercise = exercises.find((e) => e.id === currentExerciseId);
      if (workoutExercise) {
        workoutExercise.name = name;
        workoutExercise.notes = notes;
        renderWorkoutExercises();
      }
    }
  } else {
    library.push(exercise);

    if (isEditingFromWorkout) {
      import("./workouts.js").then((m) => {
        m.addExerciseToWorkout(exercise.id);
      });
    }
  }

  saveToStorage();
  closeExerciseModal();
  renderLibrary();
  renderTagFilters();
}

/**
 * Delete an exercise
 * @param {number} id - Exercise ID
 */
export function deleteExercise(id) {
  showConfirm("Delete this exercise from library?", (result) => {
    if (result) {
      const index = library.findIndex((e) => e.id === id);
      if (index > -1) {
        library.splice(index, 1);
        saveToStorage();
        renderLibrary();
        renderTagFilters();
      }
    }
  });
}

export function onSearchChange(event) {
  setSearchQuery(event.target.value.toLowerCase().trim());
  renderLibrary();
}

export function clearSearch() {
  setSearchQuery("");
  const searchInput = document.getElementById("librarySearch");
  if (searchInput) searchInput.value = "";
  renderLibrary();
}

function filterExercisesBySearch(exs) {
  if (!searchQuery) return exs;
  return exs.filter((e) => e.name.toLowerCase().includes(searchQuery));
}

export function renderLibrary() {
  const container = document.getElementById("libraryList");

  if (library.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No exercises yet!</h3>
        <p>Add your first exercise to the library.</p>
      </div>`;
    renderTagFilters();
    return;
  }

  let filteredExercises = filterExercisesByTags(library);
  filteredExercises = filterExercisesBySearch(filteredExercises);

  if (filteredExercises.length === 0) {
    const hasFilters = selectedTags.length > 0 || searchQuery;
    container.innerHTML = `
      <div class="empty-state">
        <h3>No exercises match your ${hasFilters ? "search or filters" : "criteria"}</h3>
        <p>${hasFilters ? "Try clearing some filters or adjusting your search." : "Add exercises to get started."}</p>
      </div>`;
    renderTagFilters();
    return;
  }

  container.innerHTML = filteredExercises.map((exercise) => {
    const tagsHTML = exercise.tags
      ? exercise.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")
      : "";

    const formattedNotes = exercise.notes ? exercise.notes.replace(/\n/g, "<br>") : "";

    // Build structured detail pills
    const details = [];
    if (exercise.lastWeight) details.push(`<span class="detail-pill">🏋️ Last: ${exercise.lastWeight}</span>`);

    if (exercise.pr) details.push(`<span class="detail-pill detail-pill--pr">🏆 PR: ${exercise.pr}</span>`);

    if (exercise.warmupWeight) details.push(`<span class="detail-pill">🔥 Warm-up: ${exercise.warmupWeight}</span>`);

    if (exercise.setSpec) details.push(`<span class="detail-pill">📋 Sets: ${exercise.setSpec}</span>`);
    
    const detailsHTML = details.length ? `<div class="detail-pills">${details.join("")}</div>` : "";

    return `
      <div class="library-card">
        <h3 style="margin-bottom: 8px;">${exercise.name}</h3>
        ${tagsHTML ? `<div class="tags-container" style="margin-bottom: 8px;">${tagsHTML}</div>` : ""}
        ${detailsHTML}
        ${formattedNotes ? `<div class="exercise-notes" style="margin-bottom: 16px; white-space: pre-line; line-height: 1.6;">${formattedNotes}</div>` : '<div style="margin-bottom: 16px;"></div>'}
        <div class="button-row">
          <button class="btn btn-small btn-secondary" onclick="showEditExerciseModal(${exercise.id})">Edit</button>
          <button class="btn btn-small btn-danger" onclick="deleteExercise(${exercise.id})">Delete</button>
        </div>
      </div>`;
  }).join("");

  renderTagFilters();
}

window.showCreateExerciseModal = showCreateExerciseModal;
window.showEditExerciseModal = showEditExerciseModal;
window.closeExerciseModal = closeExerciseModal;
window.saveExercise = saveExercise;
window.deleteExercise = deleteExercise;
window.onSearchChange = onSearchChange;
window.clearSearch = clearSearch;
window.renderLibrary = renderLibrary;