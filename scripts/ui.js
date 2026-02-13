import { confirmCallback, setConfirmCallback } from './state.js';

/**
 * Show confirmation modal
 * @param {string} message - Message to display
 * @param {Function} callback - Callback function
 * @param {boolean} isConfirmation - Whether to show confirmation buttons or just OK
 */
export function showConfirm(message, callback, isConfirmation = true) {
  const confirmMsg = document.getElementById("confirmMessage");
  if (!confirmMsg) return;
  
  confirmMsg.textContent = message;
  const deleteBtn = document.querySelector(".confirm-buttons .btn-danger");
  const cancelBtn = document.querySelector(".confirm-buttons .btn-secondary");

  if (deleteBtn && cancelBtn) {
    if (isConfirmation) {
      deleteBtn.style.display = "inline-block";
      deleteBtn.textContent = "Go Ahead";
      cancelBtn.textContent = "Cancel";
    } else {
      deleteBtn.style.display = "none";
      cancelBtn.textContent = "OK";
    }
  }

  const confirmModal = document.getElementById("confirmModal");
  if (confirmModal) {
    confirmModal.classList.add("active");
  }
  setConfirmCallback(callback);
}

/**
 * Handle confirmation action
 * @param {boolean} result - User's choice
 */
export function confirmAction(result) {
  const confirmModal = document.getElementById("confirmModal");
  if (confirmModal) {
    confirmModal.classList.remove("active");
  }
  if (confirmCallback) {
    confirmCallback(result);
    setConfirmCallback(null);
  }
}

/**
 * Switch between tabs
 * @param {string} tabName - Tab name (presets, workouts, library, timer)
 */
export function switchTab(tabName) {
  // 1. Remove active class from all tabs and content
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");
  
  tabs.forEach((t) => t.classList.remove("active"));
  contents.forEach((c) => c.classList.remove("active"));

  // 2. Find and activate the correct content by ID
  const targetContent = document.getElementById(`${tabName}Tab`);
  if (targetContent) {
    targetContent.classList.add("active");
  }

  // 3. Find and activate the correct tab button
  // We look for a button that has the switchTab call with the right name
  tabs.forEach(button => {
    const onClick = button.getAttribute('onclick');
    if (onClick && onClick.includes(`switchTab('${tabName}')`)) {
      button.classList.add("active");
    }
  });
}

// Make functions available globally for inline event handlers
window.showConfirm = showConfirm;
window.confirmAction = confirmAction;
window.switchTab = switchTab;
