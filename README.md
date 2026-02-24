# 💪 Workout Tracker

A privacy-first Progressive Web Application (PWA) designed for strength training and workout management. This application was developed in response to the scarcity of simple, straightforward, and genuinely free fitness tracking solutions that prioritize user privacy and data ownership. It offers a robust set of features without requiring subscriptions, collecting unnecessary data, or hiding essential functionalities behind paywalls.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://minimalistic-workout-tracker.netlify.app)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

## 🎯 Overview

This project represents a complete client-side application built with zero external dependencies, emphasizing a user-centric approach to fitness tracking. It empowers users with full control over their data, ensuring that personal workout information remains private and locally stored. The application's design focuses on delivering a seamless and efficient experience for managing exercise routines and tracking progress.

## ✨ Key Features

The Workout Tracker offers a range of functionalities designed to enhance the user's fitness journey:

*   **Structured Exercise Library**: Users can create and manage an extensible database of exercises with dedicated fields for last weight used, personal record (PR), warm-up weight, set specification, and form/execution notes. Exercises are tagged for fast filtering by muscle group or equipment, and key details render as visible pills directly on each library card.
*   **Workout Presets**: The application supports the creation of reusable routine templates, enabling efficient planning and execution of training sessions. A search-first exercise selector makes building presets fast even with large libraries.
*   **Comprehensive Logging**: Detailed tracking of sets, including weight, repetitions, and set classification (warm-up, normal, failure), provides a thorough record of performance. Cardio sessions can also be logged with type and duration.
*   **In-Workout Exercise Reference Panel**: Tapping any exercise name during a workout opens a bottom-sheet panel showing all stored details — last weight, PR, warm-up weight, set spec, tags, and form notes — without leaving the session. An Edit button inside the panel allows updating library data on the spot.
*   **In-Workout Rest Timer**: A floating rest timer panel is accessible directly inside an active workout session. Tapping "✓ Rest" after any set instantly opens the panel and starts the countdown — no tab switching required. Features a circular SVG progress ring, preset durations, a custom input, and haptic feedback on completion. Preferred duration is persisted across sessions.
*   **Standalone Timer Tab**: A full-featured countdown timer with a circular progress ring remains available as a dedicated tab for use outside of active workout sessions.
*   **Auto-Capitalization**: Exercise names are automatically formatted to Title Case on save, ensuring consistent naming across the library.
*   **Privacy-Centric Design**: Built with a strong emphasis on privacy, the application utilizes client-side `localStorage` for data persistence, ensuring zero data collection by external entities.
*   **Data Portability**: Users maintain complete ownership and control over their data through JSON export and import functionalities. A one-tap **Delete All Data** option (with confirmation) is also available for a complete reset.
*   **Offline Capability**: Leveraging Service Worker technology, the application provides full offline functionality, ensuring uninterrupted access to workout data and features even without an internet connection.
*   **Adaptive Theming**: The interface supports both dark and light modes, with user preferences persistently stored to provide a comfortable viewing experience in various environments.
*   **Progressive Web Application (PWA)**: The application is installable, offering a native-like mobile experience with enhanced performance and reliability.

## 🛠️ Technical Stack

The application is built using a modern, lightweight technical stack:

*   **Frontend**: Developed with Vanilla JavaScript (ES6+), HTML5, and CSS3, ensuring high performance and broad browser compatibility.
*   **Storage**: Client-side data persistence is managed exclusively through the `localStorage` API, reinforcing the privacy-first approach.
*   **PWA Technologies**: Utilizes Service Worker for offline capabilities and a Web App Manifest for installability and native-like features.
*   **Architecture**: Designed with zero external dependencies, promoting a lean and efficient codebase. The application relies entirely on client-side rendering and a fully modular ES6 module structure.
*   **Design**: Features a responsive layout implemented with Flexbox and CSS Grid, adhering to a mobile-first design philosophy to ensure optimal experience across all device sizes.

## 🚀 Getting Started

### Live Demo

Experience the application directly at [minimalistic-workout-tracker.netlify.app](https://minimalistic-workout-tracker.netlify.app).

### Local Development

To set up the project for local development, follow these steps:

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/maria-brito15/workout-tracker.git
    cd workout-tracker
    ```

2.  **Open in browser**: No build process or server is required. Simply open the `index.html` file in your web browser.

    ```bash
    open index.html
    ```

### Mobile Installation

As a Progressive Web Application, the Workout Tracker can be installed directly to your mobile device's home screen:

*   **Android**: Open the application in your browser, then navigate to the browser menu and select "Add to Home screen."
*   **iOS**: Open the application in Safari, tap the Share button, and then select "Add to Home Screen."

## 🔐 Privacy & Security

This application is built with a strong commitment to user privacy and implements a privacy-by-design approach:

*   **No Backend**: The application operates entirely client-side, with no server communication or database interactions, ensuring that your data never leaves your device.
*   **No Tracking**: There are zero analytics, cookies, or third-party integrations used, guaranteeing that your activity is not monitored or shared.
*   **No Authentication**: No user accounts or personal information are required to use the application, eliminating the need for sensitive data collection.
*   **Local Data Storage**: All workout data, including exercises, presets, and logged workouts, is stored exclusively in your browser's `localStorage`.
*   **User Control**: Users have complete ownership and control over their data, with robust export, import, and full-delete functionalities for backup, migration, and reset.

## 📁 Project Structure

The project follows a clear and organized structure:

```
workout-tracker/
├── assets/                 # Contains images and other media assets
│   ├── dumbbell.png
│   └── preview.jpg
├── scripts/                # JavaScript files for application logic
│   ├── import-export.js    # Handles data import, export, and delete-all
│   ├── library.js          # Manages the exercise library and structured fields
│   ├── main.js             # Main application logic and initialization
│   ├── presets.js          # Manages workout presets/routines
│   ├── state.js            # Manages application state (incl. rest timer state)
│   ├── storage.js          # Handles localStorage interactions
│   ├── sw.js               # Service Worker for offline capabilities
│   ├── tags.js             # Manages exercise tags and filtering
│   ├── theme.js            # Handles theme (dark/light mode) switching
│   ├── timer.js            # Standalone timer + in-workout floating rest timer
│   ├── ui.js               # Manages user interface interactions and modals
│   └── workouts.js         # Workout logging, set tracking, exercise reference panel, and cardio
├── styles/                 # CSS files for styling
│   ├── about.css
│   ├── contact.css
│   ├── privacy.css
│   └── styles.css          # Main stylesheet
├── about-us.html           # About Us page
├── contact.html            # Contact page
├── index.html              # Main application entry point
├── manifest.json           # Web App Manifest for PWA features
├── privacy-policy.html     # Privacy Policy page
└── README.md               # Project README file
```

## 🔄 Core Functionality

1.  **Exercise Management**: Create, edit, and delete custom exercises within a personal library. Each exercise supports structured fields (last weight, PR, warm-up weight, set spec, form notes) and tags for filtering. Exercise names are auto-capitalized to Title Case on save.
2.  **Preset Creation**: Build and manage reusable workout routines by searching and selecting exercises from the library. Presets allow for quick setup of recurring workouts.
3.  **Workout Tracking**: Log individual workout sessions specifying the date, chosen preset (or custom exercises), and detailed set information (weight, reps, set type) for each exercise. Cardio sessions can also be tracked with type and duration.
4.  **In-Workout Exercise Reference**: Tap any exercise name during a workout to open a bottom-sheet panel showing all library details for that exercise — last weight, PR, warm-up, set spec, tags, and notes. An Edit button inside the panel allows updating data without closing the workout.
5.  **In-Workout Rest Timer**: A floating panel accessible directly inside the workout view. Tap "✓ Rest" on any set row to start the countdown instantly. Supports preset durations, custom input, and persists the preferred duration to `localStorage`.
6.  **Standalone Timer**: A dedicated Timer tab with a circular progress ring and preset/custom durations for use outside of active workout sessions.
7.  **Data Management**: Export all application data to a JSON file for backup, import data to restore or transfer workout logs across devices, or delete all data with a single confirmed action.

## 🤝 Contributing

Contributions to the Workout Tracker project are welcome! If you have suggestions, bug reports, or would like to contribute code, please feel free to:

*   Report bugs via [GitHub Issues](https://github.com/maria-brito15/workout-tracker/issues)
*   Propose features through [Discussions](https://github.com/maria-brito15/workout-tracker/discussions)
*   Submit Pull Requests with improvements or new features.

## 📜 License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for full details.

**Attribution Required:** If you use or modify this code, please credit and link to this repository.

## 📧 Contact

For any inquiries or further information, you can reach out to the developer:

*   Email: [mariab.dev@zohomail.com](mailto:mariab.dev@zohomail.com)
*   GitHub: [@maria-brito15](https://github.com/maria-brito15)

---

_Built with a focus on simplicity, privacy, and user empowerment._