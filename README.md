# Workout Tracker

A minimalist, privacy-focused web application for tracking strength training and cardio workouts. Built entirely client-side with no servers, no accounts, and no data collection.

## ✨ Features

- **Custom Exercise Library** - Create and manage your personal exercise database with notes for form cues and personal records.
- **Workout Presets** - Build reusable routines for quick workout setup.
- **Detailed Logging** - Track every set with weight, reps, and set type (warmup/working).
- **Built-in Rest Timer** - Quick-set intervals and custom durations to optimize rest periods.
- **Complete Privacy** - All data stored locally in your browser using localStorage.
- **Data Portability** - Export and import your entire workout history as JSON.
- **Dark/Light Themes** - High-contrast interface with theme switching.
- **Progressive Web App** - Install on mobile devices for a native app experience.
- **Offline Ready** - Works without internet after initial load.

## 🚀 Quick Start

### Option 1: Use Online

Visit the live demo: [https://minimalistic-workout-tracker.netlify.app](https://minimalistic-workout-tracker.netlify.app)

### Option 2: Run Locally

```bash
# Clone the repository
git clone https://github.com/maria-brito15/workout-tracker.git

# Navigate to the directory
cd workout-tracker

# Open in your browser
open index.html
```

No build process, no dependencies, no installation required!

## 📱 Mobile Installation

1. Visit the app in your mobile browser
2. Tap the browser menu (⋮ or share icon)
3. Select "Add to Home Screen"
4. Enjoy a full-screen, app-like experience

## 🛠 Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Responsive design with Flexbox & Grid
- **Vanilla JavaScript (ES6+)** - All application logic
- **localStorage API** - Client-side data persistence
- **Service Worker** - Offline functionality
- **Web App Manifest** - PWA capabilities

## 📖 How to Use

### 1. Build Your Exercise Library

- Go to the **Library** tab
- Click "New Exercise" to add exercises
- Add optional notes for form cues or equipment settings

### 2. Create Workout Presets

- Navigate to the **Presets** tab
- Click "New Preset" and select exercises from your library
- Name your routine (e.g., "Push Day", "Leg Day")

### 3. Track Workouts

- Go to the **Workouts** tab
- Click "Track Workout" and select a preset
- Log sets with weight (kg) and reps
- Optionally add cardio details

### 4. Use the Rest Timer

- Switch to the **Timer** tab
- Set quick intervals (30s, 1m, 2m, 3m) or enter custom duration
- Start/pause/reset as needed during workouts

### 5. Manage Your Data

- **Export**: Download your data as JSON backup
- **Import**: Restore data from a previous export
- **Theme**: Toggle between dark and light modes

## 📂 Project Structure

```
workout-tracker/
├── index.html           # Main application
├── about-us.html        # About page
├── privacy-policy.html  # Privacy policy
├── contact.html         # Contact page
├── styles.css           # All styling and themes
├── script.js            # Application logic and data management
├── sw.js                # Service worker for offline support
├── manifest.json        # PWA configuration
├── dumbbell.png         # App icon
└── README.md            # This file
```

## 🔒 Privacy

This application is built with privacy as a core principle:

- **No servers** - Everything runs in your browser.
- **No tracking** - No analytics, cookies, or third-party services.
- **No accounts** - No registration or login required.
- **Local storage only** - Your data never leaves your device.
- **Full control** - Export/import your data anytime.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Support

If you find this project helpful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🔀 Contributing code improvements
