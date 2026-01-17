# 💪 Workout Tracker

A privacy-first Progressive Web Application for strength training and workout management. Built with vanilla JavaScript as a response to the lack of simple, straightforward, and genuinely free fitness tracking solutions.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://minimalistic-workout-tracker.netlify.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🎯 Overview

After searching for a workout tracking app that didn't require subscriptions, collect unnecessary data, or hide basic features behind paywalls, I decided to build my own solution. This project demonstrates a complete client-side application with zero dependencies, focusing on user privacy and data ownership.

## ✨ Key Features

- **Custom Exercise Library** - Extensible exercise database with form notes and personal records.
- **Workout Presets** - Reusable routine templates for efficient session planning.
- **Comprehensive Logging** - Detailed set tracking with weight, reps, and set classification.
- **Integrated Rest Timer** - Configurable intervals with preset and custom duration options.
- **Privacy-Centric Design** - Client-side localStorage implementation with zero data collection.
- **Data Portability** - JSON export/import for backup and cross-device synchronization.
- **Offline Capability** - Service Worker implementation for full offline functionality.
- **Adaptive Theming** - Dark/light mode with persistent user preferences.
- **Progressive Web App** - Installable with native-like mobile experience.

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3.
- **Storage**: localStorage API for client-side persistence.
- **PWA**: Service Worker, Web App Manifest.
- **Architecture**: Zero dependencies, fully client-side rendering.
- **Design**: Responsive layout with Flexbox/Grid, mobile-first approach.

## 🚀 Getting Started

### Live Demo

Access the application at [minimalistic-workout-tracker.netlify.app](https://minimalistic-workout-tracker.netlify.app)

### Local Development

```bash
# Clone repository
git clone https://github.com/maria-brito15/workout-tracker.git
cd workout-tracker

# Open in browser (no build process required)
open index.html
```

### Mobile Installation

- **Android**: Browser menu → "Add to Home screen"
- **iOS**: Share button → "Add to Home Screen"

## 🔐 Privacy & Security

This application implements privacy by design:

- **No Backend** - Entirely client-side, no server communication.
- **No Tracking** - Zero analytics, cookies, or third-party integrations.
- **No Authentication** - No user accounts or personal information required.
- **Local Data Storage** - All workout data persists in browser localStorage.
- **User Control** - Complete data ownership with export/import functionality.

## 📁 Project Structure

```
workout-tracker/
├── assets/
│   ├── dumbbell.png
│   └── preview.jpg
├── pt/
│   ├── about-us-pt.html
│   ├── contact-pt.html
│   ├── index-pt.html
│   └── privacy-policy-pt.html
├── scripts/
│   ├── script.js
│   ├── sw.js
│   └── theme.js
├── styles/
│   ├── about.css
│   ├── contact.css
│   ├── privacy.css
│   └── styles.css
├── about-us.html
├── contact.html
├── index.html
├── manifest.json
├── privacy-policy.html
└── README.md
```

## 🔄 Core Functionality

1. **Exercise Management** - Create and maintain custom exercise library.
2. **Preset Creation** - Build reusable workout routines.
3. **Workout Tracking** - Log exercises with detailed set information.
4. **Timer Utility** - Track rest periods between sets.
5. **Data Management** - Export/import for backup and portability.

## 🤝 Contributing

Contributions are welcome! Please feel free to:

- Report bugs via [GitHub Issues](https://github.com/maria-brito15/workout-tracker/issues)
- Propose features through [Discussions](https://github.com/maria-brito15/workout-tracker/discussions)
- Submit Pull Requests with improvements.

## 📜 License

Licensed under the Apache License, Version 2.0 - see the [LICENSE](LICENSE) file for details.

**Attribution Required:** If you use or modify this code, please credit and link to this repository.

## 📧 Contact

- Email: [mariab.dev@zohomail.com](mailto:mariab.dev@zohomail.com)
- GitHub: [@maria-brito15](https://github.com/maria-brito15)

---

_Built with a focus on simplicity, privacy, and user empowerment._
