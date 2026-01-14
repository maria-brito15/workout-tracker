# Workout Tracker

A minimalist, high-contrast web application for tracking strength training and cardio routines. Built with a focus on privacy and speed, this tool allows users to manage a custom exercise library, create workout presets, and log sessions without the need for an external database or account.

View **Live Demo** on https://minimalistic-workout-tracker.netlify.app

---

## ✨ Key Features

- **Custom Exercise Library:** Create and manage your own database of exercises with specific notes for form or equipment.
- **Workout Presets:** Group exercises into routines (e.g., "Upper Body," "Leg Day") for quick workout initialization.
- **Granular Logging:** Track warmup and working sets, including weight (kg) and repetitions.
- **Integrated Rest Timer:** Built-in timer with quick-set intervals (30s, 1m, 2m, etc.) and custom durations.
- **Privacy-First (Local Storage):** All data is stored locally in your browser. No accounts, no tracking, no cloud syncing.
- **Data Portability:** Full support for **Import/Export** via JSON files to back up or move data between devices.
- **High-Contrast UI:** Professional "Black & White" design with support for Dark and Light themes.

## 🚀 Getting Started

Since this is a vanilla web application, there is no installation or build process required.

1.  **Clone** this repository: `git clone https://github.com/yourusername/workout-tracker.git`
2.  Open `index.html` in any modern web browser.
3.  **Mobile Use:** For the best experience, open the Netlify link on your phone and "Add to Home Screen" to use it like a native app.

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3 (Flexbox & CSS Grid)
- **Logic:** Vanilla JavaScript (ES6+)
- **Persistence:** `localStorage` API
- **Deployment:** Netlify

## 📖 Usage Guide

### 1. Build Your Library

Navigate to the **Library** tab. Add exercises you perform regularly, including form notes.

### 2. Create Presets

In the **Presets** tab, create a new routine and select exercises from your library to include in that plan.

### 3. Track a Workout

Go to the **Workouts** tab, select a Preset, and log your sets. Toggle between "Warmup" and "Working" sets to keep your data clean.

### 4. Data Management

Use the **Export** button in the header to download a `.json` backup. Use **Import** to restore data on a new device.
