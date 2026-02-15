import { presets, library, currentPresetId, presetExercises, setCurrentPresetId, setPresetExercises, addExerciseSearchQuery, setAddExerciseSearchQuery } from './state.js';
import { saveToStorage } from './storage.js';
import { showConfirm } from './ui.js';

/**
 * Show modal to create a new preset
 */
export function showCreatePresetModal() {
  setCurrentPresetId(null);
  setPresetExercises([]);
  setAddExerciseSearchQuery("");

  document.getElementById("presetName").value = "";
  document.getElementById("presetModalTitle").textContent = "New Preset";

  const searchInput = document.getElementById("presetExerciseSearch");
  if (searchInput) searchInput.value = "";

  renderPresetExercises();

  document.getElementById("presetModal").classList.add("active");
}

/**
 * Show modal to edit an existing preset
 * @param {number} id - Preset ID
 */
export function showEditPresetModal(id) {
  const preset = presets.find((p) => p.id === id);
  if (!preset) return;

  setCurrentPresetId(id);
  setPresetExercises(JSON.parse(JSON.stringify(preset.exercises)));
  setAddExerciseSearchQuery("");

  document.getElementById("presetName").value = preset.name;
  document.getElementById("presetModalTitle").textContent = "Edit Preset";

  const searchInput = document.getElementById("presetExerciseSearch");
  if (searchInput) searchInput.value = "";

  renderPresetExercises();

  document.getElementById("presetModal").classList.add("active");
}

/**
 * Close preset modal
 */
export function closePresetModal() {
  document.getElementById("presetModal").classList.remove("active");
}

/**
 * Toggle exercise selection in preset
 * @param {number} exerciseId - Exercise ID
 */
export function toggleExerciseSelection(exerciseId) {
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

/**
 * Render exercise list in preset modal
 */
export function renderPresetExercises() {
  const container = document.getElementById("presetExercisesList");
  const query = addExerciseSearchQuery.toLowerCase().trim();

  if (library.length === 0) {
    container.innerHTML =
      '<p style="text-align:center; color:#665;">No exercises in library. Go to Library tab to add exercises.</p>';

    return;
  }

  const selectedIds = presetExercises.map((e) => e.id);
  
  let filteredExercises = library;
  if (query) {
    filteredExercises = library.filter(ex => ex.name.toLowerCase().includes(query));
  }

  if (filteredExercises.length === 0) {
    if (query) {
      container.innerHTML = `
        <div style="text-align:center; padding: 20px;">
          <p style="color:#665; margin-bottom: 16px;">No exercise found with that name.</p>
          <button class="btn" onclick="createPresetExercise('${query}')">
            Create "${query}"
          </button>
        </div>
      `;
    } else {
      container.innerHTML = '<p style="text-align:center; color:#665; padding: 20px;">No exercises available.</p>';
    }
    return;
  }

  let html = filteredExercises
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
            `,
    )
    .join("");

  if (query && !filteredExercises.some(ex => ex.name.toLowerCase() === query)) {
    html += `
      <div style="border-top: 1px solid #eee; margin-top: 16px; padding-top: 16px; text-align: center;">
        <p style="color:#665; margin-bottom: 8px; font-size: 14px;">Can't find what you're looking for?</p>
        <button class="btn btn-small" onclick="createPresetExercise('${query}')">
          Create "${query}"
        </button>
      </div>
    `;
  }

  container.innerHTML = html;
}

/**
 * Handle search input change in preset modal
 */
export function onPresetExerciseSearchChange(event) {
  setAddExerciseSearchQuery(event.target.value);
  renderPresetExercises();
}

/**
 * Clear search in preset modal
 */
export function clearPresetExerciseSearch() {
  setAddExerciseSearchQuery("");
  const searchInput = document.getElementById("presetExerciseSearch");
  if (searchInput) {
    searchInput.value = "";
  }
  renderPresetExercises();
}

/**
 * Create a new exercise from preset modal
 * @param {string} name - Exercise name
 */
export function createPresetExercise(name) {
  // Open the creation modal with the pre-filled name
  import('./library.js').then(m => {
    m.showCreateExerciseModal(name, false);
  });
}

/**
 * Save preset (create or update)
 */
export function savePreset() {
  const name = document.getElementById("presetName").value.trim();

  if (!name) {
    showConfirm("Please enter a preset name", () => {}, false);
    return;
  }

  if (presetExercises.length === 0) {
    showConfirm("Please select at least one exercise.", () => {}, false);
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

/**
 * Delete a preset
 * @param {number} id - Preset ID
 */
export function deletePreset(id) {
  showConfirm("Delete this preset?", (result) => {
    if (result) {
      const index = presets.findIndex((p) => p.id === id);
      if (index > -1) {
        presets.splice(index, 1);
        saveToStorage();
        renderPresets();
      }
    }
  });
}

/**
 * Render presets list
 */
export function renderPresets() {
  const container = document.getElementById("presetList");

  if (presets.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <h3>No presets yet!</h3>
                <p>Create your first workout preset.</p>
            </div>
        `;
    return;
  }

  container.innerHTML = presets
    .map(
      (preset) => {
        const exerciseNames = preset.exercises.map(ex => ex.name).join(', ');
        
        return `
        <div class="preset-card">
            <h3>${preset.name}</h3>
            <p style="margin-bottom: 16px;">Exercises: ${preset.exercises.length}</p>
            <p style="font-size: 13px; color: #999; margin-bottom: 16px; font-style: italic;">${exerciseNames}</p>
            <div class="button-row">
                <button class="btn btn-small btn-secondary" onclick="showEditPresetModal(${preset.id})">Edit</button>
                <button class="btn btn-small btn-danger" onclick="deletePreset(${preset.id})">Delete</button>
            </div>
        </div>
    `;
      }
    )
    .join("");
}

// Make functions available globally for inline event handlers
window.showCreatePresetModal = showCreatePresetModal;
window.showEditPresetModal = showEditPresetModal;
window.closePresetModal = closePresetModal;
window.toggleExerciseSelection = toggleExerciseSelection;
window.renderPresetExercises = renderPresetExercises;
window.savePreset = savePreset;
window.deletePreset = deletePreset;
window.onPresetExerciseSearchChange = onPresetExerciseSearchChange;
window.clearPresetExerciseSearch = clearPresetExerciseSearch;
window.createPresetExercise = createPresetExercise;