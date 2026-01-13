# Workout Tracker

A minimalist, black-and-white workout tracking application that helps you create exercise presets, log workouts, manage your exercise library, and time your rest periods.

## Features

### Exercise Library

Build your personal exercise database with custom exercises and optional notes. Each exercise can be reused across multiple presets and workouts.

### Workout Presets

Create reusable workout templates by selecting exercises from your library. Perfect for organizing your training split (e.g., Upper Body Day, Leg Day, Pull Day).

### Workout Logging

Track your training sessions with detailed set-by-set logging including weight, reps, and set type (warmup or working sets). Optional cardio tracking for duration and type.

### Rest Timer

Built-in countdown timer with preset durations (30s, 1m, 1m 30s, 2m, 3m) or custom time input. Includes vibration alert when time expires (on supported devices).

### Data Management

- **Export**: Download your complete workout data as JSON
- **Import**: Restore data from previous exports
- **Local Storage**: All data persists in your browser

### Interface

- **Light/Dark Theme**: Toggle between black-on-white and white-on-black color schemes
- **Responsive Design**: Works on mobile and desktop devices
- **Minimalist Design**: Clean, distraction-free interface focused on functionality

## Usage

### Getting Started

1. Go to the **Library** tab and add your exercises.
2. Switch to **Presets** tab and create workout templates.
3. Navigate to **Workouts** tab to log your training sessions.
4. Use the **Timer** tab during rest periods.

### Creating a Workout

1. Click "Track Workout" in the Workouts tab.
2. Select a preset from the dropdown.
3. Fill in weight and reps for each set.
4. Add or remove sets as needed.
5. Optionally log cardio activity.
6. Save your workout.

### Managing Data

- Edit any preset, workout, or exercise by clicking on it.
- Delete items using the Delete button.
- Export your data regularly to create backups.
- Import data to restore from a backup file.

## Technical Details

- **No Backend Required**: Runs entirely in the browser
- **Storage**: Uses localStorage for data persistence
- **File Format**: JSON for import/export
- **Browser Support**: Modern browsers with ES6+ support

## Data Structure

Your workout data is organized into three main categories:

- **Library**: Individual exercises with names and notes
- **Presets**: Collections of exercises for specific workout types
- **Workouts**: Logged training sessions with date, exercises, sets, and optional cardio

All data is stored locally in your browser and can be exported at any time.
