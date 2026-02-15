/**
 * Main entry point for the Workout Tracker application
 * Initializes all modules and loads data from localStorage
 */

// Import all modules
import { loadFromStorage } from "./storage.js";
import { switchTab } from "./ui.js";
import { renderPresets } from "./presets.js";
import { renderWorkouts } from "./workouts.js";
import { renderLibrary } from "./library.js";

// Import to ensure functions are registered globally
import "./tags.js";
import "./timer.js";
import "./import-export.js";

/**
 * Initialize the application
 */
function init() {
  // Load data from localStorage
  loadFromStorage();

  // Render all views
  renderPresets();
  renderWorkouts();
  renderLibrary();
}

// Start the application when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Export init for manual initialization if needed
export { init };
