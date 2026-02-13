import { presets, workouts, library, setPresets, setWorkouts, setLibrary } from './state.js';
import { saveToStorage } from './storage.js';
import { showConfirm } from './ui.js';
import { renderPresets } from './presets.js';
import { renderWorkouts } from './workouts.js';
import { renderLibrary } from './library.js';

/**
 * Export all data to JSON file
 */
export function exportData() {
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

/**
 * Import data from JSON file
 * @param {Event} event - File input change event
 */
export function importData(event) {
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
            setPresets(data.presets);
            setWorkouts(data.workouts);
            setLibrary(data.library || []);

            saveToStorage();
            renderPresets();
            renderWorkouts();
            renderLibrary();
            showConfirm("Data imported successfully.", () => {}, false);
          }
        },
      );
    } catch (error) {
      showConfirm(
        "Error reading file. Please ensure it is a valid JSON file.",
        () => {},
        false,
      );
    }
  };

  reader.readAsText(file);
  event.target.value = "";
}

// Make functions available globally for inline event handlers
window.exportData = exportData;
window.importData = importData;