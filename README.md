# 📚 Course Progress Tracker

A web application for tracking student progress in various courses using Heroui components, Tailwind CSS, and Next.js. The app dynamically updates progress bars, allows lecture and activity tracking, and supports dark mode.

## 🚀 Features
- 📊 **Progress Tracking** – View progress bars for each course dynamically loaded from `courses.json`.
- ✅ **Lecture & Activity Management** – Track attended lectures and manually log activities.
- 🌗 **Dark Mode Support** – Theme switching using `next-themes`.
- 💾 **Persistent State** – Completion data is stored in `localStorage`.
- 🎨 **Tailwind + Heroui** – Styled with `@heroui/react` and Tailwind CSS.

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**
```sh
$ git clone https://github.com/your-username/course-progress-tracker.git
$ cd course-progress-tracker
```

### **2️⃣ Install Dependencies**
```sh
$ npm install  # or yarn install
```

### **3️⃣ Start the Development Server**
```sh
$ npm run dev  # or yarn dev
```

> The app will be available at **`http://localhost:3000`**.

---

## 📂 Project Structure
```plaintext
📦 course-progress-tracker
├── 📂 components  # Reusable UI Components
│   ├── 📄 ActivityForm.tsx
│   ├── 📄 ExcersiceCard.tsx
│   ├── 📄 LectureTracker.tsx
│   ├── 📄 Progress.tsx
│   ├── 📄 SliderLoad.tsx
│   └── 📄 ThemeSwitch.tsx
├── 📂 data  # Static Data Files
│   ├── 📄 courses.json
│   ├── 📄 lectures.json
│   └── 📄 excersices.json
├── 📂 layouts  # Page Layouts
├── 📂 pages  # Application Routes
│   ├── 📄 index.tsx  # Home Page
│   ├── 📄 courses.tsx  # Course Listings
│   ├── 📄 [id].tsx  # Dynamic Course Pages
│   └── 📄 _app.tsx  # Global App Config
├── 📂 styles  # Global Styles
├── 📄 tailwind.config.js  # Tailwind Configuration
├── 📄 next.config.js  # Next.js Configuration
└── 📄 README.md  # Project Documentation
```

---

## 📘 Usage Guide
### **📊 Tracking Course Progress**
1. Select **attended lectures** using the checkboxes.
2. View the **progress bars** update dynamically.
3. Log extra study **activities** manually.

### **🌗 Enabling Dark Mode**
- Click the **sun/moon icon** in the top-right corner to toggle dark mode.

### **🔄 Reset Progress**
- Click **Reset** to clear all progress and activities.

---

## 🛠️ Tech Stack
- **Frontend:** Next.js, TypeScript, React
- **UI Library:** `@heroui/react`, Tailwind CSS
- **State Management:** useState + LocalStorage
- **Dark Mode:** `next-themes`

---

## 🐞 Troubleshooting
### **1️⃣ Dark Mode Styles Not Applying?**
- Ensure `<html class='dark'>` is toggled properly.
- Force dark mode class: `document.documentElement.classList.toggle("dark", theme === "dark")`.

### **2️⃣ Tailwind `dark:` Classes Not Working?**
- Run: `npx tailwindcss -o output.css` and check if `dark:bg-green-700` is present.
- Rebuild: `rm -rf .next && npm run dev`.

### **3️⃣ LocalStorage Not Persisting Progress?**
- Check browser console: `localStorage.getItem("completedExercises")`.
- Ensure `useEffect` is properly loading saved state.

---

## 📜 License
MIT License © 2025 Your Name

