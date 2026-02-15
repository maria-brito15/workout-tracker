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
 * Show modal to create a new exercise
 */
/**
 * Show modal to create a new exercise
 * @param {string} defaultName - Optional default name for the exercise
 * @param {boolean} fromWorkout - Whether creating from workout view
 */
export function showCreateExerciseModal(defaultName = "", fromWorkout = false) {
  setCurrentExerciseId(null);
  setIsEditingFromWorkout(fromWorkout);

  const nameInput = document.getElementById("exerciseName");
  nameInput.value = "";
  if (defaultName) {
    nameInput.placeholder = defaultName;
    nameInput.value = defaultName;
  } else {
    nameInput.placeholder = "Bench Press";
  }

  document.getElementById("exerciseTags").value = "";
  document.getElementById("exerciseNotes").value = "";
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
  document.getElementById("exerciseTags").value = exercise.tags
    ? exercise.tags.join(", ")
    : "";
  document.getElementById("exerciseNotes").value = exercise.notes || "";
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
  const name = document.getElementById("exerciseName").value.trim();
  const tagsInput = document.getElementById("exerciseTags").value.trim();
  const notes = document.getElementById("exerciseNotes").value.trim();

  if (!name) {
    showConfirm("Please enter an exercise name", () => {}, false);
    return;
  }

  const tags = tagsInput
    ? tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t)
    : [];

  const exercise = {
    id: currentExerciseId || Date.now(),
    name,
    tags,
    notes,
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

/**
 * Handle search input change
 * @param {Event} event - Input event
 */
export function onSearchChange(event) {
  setSearchQuery(event.target.value.toLowerCase().trim());
  renderLibrary();
}

/**
 * Clear search input
 */
export function clearSearch() {
  setSearchQuery("");
  const searchInput = document.getElementById("librarySearch");
  if (searchInput) {
    searchInput.value = "";
  }
  renderLibrary();
}

/**
 * Filter exercises by search query
 * @param {Array} exercises - Array of exercises to filter
 * @returns {Array} Filtered exercises
 */
function filterExercisesBySearch(exercises) {
  if (!searchQuery) {
    return exercises;
  }

  return exercises.filter((exercise) => {
    return exercise.name.toLowerCase().includes(searchQuery);
  });
}

/**
 * Render library exercises
 */
export function renderLibrary() {
  const container = document.getElementById("libraryList");

  if (library.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <h3>No exercises yet!</h3>
                <p>Add your first exercise to the library.</p>
            </div>
        `;
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
            </div>
        `;
    renderTagFilters();
    return;
  }

  container.innerHTML = filteredExercises
    .map((exercise) => {
      const tagsHTML = exercise.tags
        ? exercise.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")
        : "";

      return `
            <div class="library-card">
                <h3 style="margin-bottom: 8px;">${exercise.name}</h3>
                ${tagsHTML ? `<div class="tags-container" style="margin-bottom: 8px;">${tagsHTML}</div>` : ""}
                ${exercise.notes ? `<p class="exercise-notes" style="margin-bottom: 16px;">${exercise.notes}</p>` : '<div style="margin-bottom: 16px;"></div>'}
                <div class="button-row">
                    <button class="btn btn-small btn-secondary" onclick="showEditExerciseModal(${exercise.id})">Edit</button>
                    <button class="btn btn-small btn-danger" onclick="deleteExercise(${exercise.id})">Delete</button>
                </div>
            </div>
        `;
    })
    .join("");

  renderTagFilters();
}

// Make functions available globally for inline event handlers
window.showCreateExerciseModal = showCreateExerciseModal;
window.showEditExerciseModal = showEditExerciseModal;
window.closeExerciseModal = closeExerciseModal;
window.saveExercise = saveExercise;
window.deleteExercise = deleteExercise;
window.onSearchChange = onSearchChange;
window.clearSearch = clearSearch;
window.renderLibrary = renderLibrary;
