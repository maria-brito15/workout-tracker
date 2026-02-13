import { library, selectedTags, setSelectedTags } from './state.js';
import { renderLibrary } from './library.js';

/**
 * Get all unique tags from library
 * @returns {string[]} Array of unique tags
 */
export function getAllTags() {
  const tagSet = new Set();
  library.forEach((exercise) => {
    if (exercise.tags && Array.isArray(exercise.tags)) {
      exercise.tags.forEach((tag) => tagSet.add(tag.toLowerCase()));
    }
  });
  return Array.from(tagSet).sort();
}

/**
 * Toggle tag filter
 * @param {string} tag - Tag to toggle
 */
export function toggleTagFilter(tag) {
  const index = selectedTags.indexOf(tag);
  if (index > -1) {
    selectedTags.splice(index, 1);
  } else {
    selectedTags.push(tag);
  }
  renderTagFilters();
  renderLibrary();
}

/**
 * Clear all tag filters
 */
export function clearTagFilters() {
  setSelectedTags([]);
  renderTagFilters();
  renderLibrary();
}

/**
 * Render tag filter buttons
 */
export function renderTagFilters() {
  const allTags = getAllTags();
  const container = document.getElementById("tagFilterContainer");
  const filterList = document.getElementById("tagFilterList");

  if (allTags.length === 0) {
    container.style.display = "none";
    return;
  }

  container.style.display = "block";

  const tagsHTML = allTags
    .map((tag) => {
      const isSelected = selectedTags.includes(tag);
      return `
        <button 
          class="tag-filter-btn ${isSelected ? "active" : ""}" 
          onclick="toggleTagFilter('${tag}')">
          ${tag}
        </button>
      `;
    })
    .join("");

  const clearBtn =
    selectedTags.length > 0
      ? '<button class="tag-filter-btn clear-btn" onclick="clearTagFilters()">Clear All</button>'
      : "";

  filterList.innerHTML = tagsHTML + clearBtn;
}

/**
 * Filter exercises by selected tags
 * @param {Array} exercises - Array of exercises to filter
 * @returns {Array} Filtered exercises
 */
export function filterExercisesByTags(exercises) {
  if (selectedTags.length === 0) {
    return exercises;
  }

  return exercises.filter((exercise) => {
    if (!exercise.tags || !Array.isArray(exercise.tags)) {
      return false;
    }
    const exerciseTagsLower = exercise.tags.map((t) => t.toLowerCase());
    return selectedTags.every((selectedTag) =>
      exerciseTagsLower.includes(selectedTag),
    );
  });
}

// Make functions available globally for inline event handlers
window.toggleTagFilter = toggleTagFilter;
window.clearTagFilters = clearTagFilters;