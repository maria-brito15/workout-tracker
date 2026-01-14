# Workout Tracker: Your Personal, Privacy-Focused Fitness Companion

## Project Overview

The Workout Tracker is a minimalist yet powerful web application designed for individuals to meticulously log and manage their strength training and cardio routines. Prioritizing user privacy and operational speed, this tool operates entirely client-side, eliminating the need for server-side databases, user accounts, or internet connectivity after initial load. It empowers users to build a personalized exercise library, craft custom workout presets, and track their fitness journey with granular detail, all within a high-contrast, intuitive interface.

## ✨ Key Features

- **Custom Exercise Library**: Build and maintain a comprehensive personal database of exercises. Each entry can include specific notes for form cues, equipment settings, or personal bests, ensuring consistent and effective training.
- **Workout Presets**: Streamline your training sessions by creating reusable workout routines. Group exercises logically (e.g., "Upper Body Blast," "Leg Day Domination," "Full Body Circuit") for quick selection and initiation of workouts.
- **Granular Session Logging**: Accurately record every set, including both warmup and working sets. Track key metrics such as weight (in kilograms) and repetitions, providing a detailed history of your performance.
- **Integrated Rest Timer**: Optimize your rest periods between sets with a built-in, easy-to-use timer. Quick-set intervals (30s, 1m, 2m, 3m) and a custom duration option ensure you maintain workout intensity and efficiency.
- **Privacy-First Data Storage**: All your fitness data is securely stored directly within your browser's local storage. This design choice guarantees complete data privacy, as no information is ever transmitted to external servers or third parties. There are no accounts to create, no tracking, and no cloud syncing.
- **Data Portability (Import/Export)**: Maintain full control over your data with robust import and export functionalities. Easily back up your entire workout history and exercise library to a `.json` file, or transfer your data between devices seamlessly.
- **High-Contrast User Interface**: Experience a professional and clean "Black & White" aesthetic, optimized for readability and focus. The application includes support for both Dark and Light themes, adapting to your preference and environment.

## 🚀 Getting Started

This application is a vanilla web project, meaning it requires no complex installation, build processes, or server setup. You can get started in minutes.

1.  **Clone the Repository**: Obtain a copy of the project files by cloning the GitHub repository:
    ```bash
    git clone https://github.com/yourusername/workout-tracker.git
    ```
2.  **Open in Browser**: Navigate to the cloned directory and open the `index.html` file in any modern web browser (e.g., Chrome, Firefox, Safari, Edge).
3.  **Mobile Usage**: For an enhanced mobile experience, visit the [live demo link](https://minimalistic-workout-tracker.netlify.app) on your smartphone and use the "Add to Home Screen" feature. This will allow the application to function much like a native app, providing a full-screen, distraction-free interface.

## 🛠 Tech Stack

The Workout Tracker is built using fundamental web technologies, emphasizing simplicity, performance, and broad compatibility.

- **Frontend**:
  - **HTML5**: Provides the semantic structure and content of the application.
  - **CSS3**: Styles the application, utilizing modern layout techniques such as **Flexbox** and **CSS Grid** for a responsive and adaptive design across various screen sizes. Implements the high-contrast "Black & White" theme and theme switching functionality.
- **Logic**:
  - **Vanilla JavaScript (ES6+)**: Powers all interactive elements, data management, and application logic without relying on external frameworks or libraries. This ensures a lightweight and highly performant user experience.
- **Persistence**:
  - **`localStorage` API**: Utilized for client-side data storage, ensuring all user-generated data (exercises, presets, workouts) remains private and persistent across browser sessions without server interaction.
- **Deployment**:
  - **Netlify**: (As indicated in the original README) A popular platform for deploying static web applications, offering continuous deployment and global CDN for fast content delivery.

## 📖 Usage Guide

Navigate through the application using the tabs: **Presets**, **Workouts**, **Library**, and **Timer**.

### 1. Build Your Exercise Library

- Go to the **Library** tab.
- Click "New Exercise" to add exercises you commonly perform.
- Provide an exercise name and optional notes (e.g., "Keep elbows tucked," "Use resistance bands").
- You can edit existing exercises by clicking on them.

### 2. Create Workout Presets

- Switch to the **Presets** tab.
- Click "New Preset" to define a new workout routine.
- Give your preset a descriptive name (e.g., "Push Day," "Back & Biceps").
- Select exercises from your custom library to include in this preset.
- Presets allow for quick setup of recurring workouts.

### 3. Track a Workout Session

- Move to the **Workouts** tab.
- Click "Track Workout" and select one of your saved presets.
- Choose the date for your workout.
- For each exercise, log your warmup and working sets by entering weight (kg) and repetitions.
- Optionally, record cardio details such as type and duration.
- The application will automatically save your progress.

### 4. Utilize the Rest Timer

- Access the **Timer** tab.
- Quickly set common rest intervals (30s, 1m, 1m 30s, 2m, 3m) or input a custom duration in seconds.
- Start, pause, and reset the timer as needed during your workout.

### 5. Data Management

- In the application header, you'll find "Export" and "Import" buttons.
- **Export**: Click "Export" to download a `.json` file containing all your exercises, presets, and workout logs. This is crucial for backing up your data.
- **Import**: Use the "Import" button to upload a previously exported `.json` file, restoring your data. This is useful when switching browsers or devices.

## 📂 Project Structure

```
workout-tracker/
├── index.html         # Main HTML file, application structure
├── styles.css         # CSS file for styling and theme management
├── script.js          # JavaScript file for all application logic and data handling
└── README.md          # This README file
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
