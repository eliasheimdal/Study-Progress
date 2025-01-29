# 📚 Course Progress Tracker (Work in Progress)

A web application for tracking student progress in various courses using Heroui components, Tailwind CSS, and Next.js. The app dynamically updates progress bars, allows lecture and activity tracking, and supports dark mode. The purpose is to fulfill expected work hours in different subjects per week. 

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
$ git clone git@github.com:eliasheimdal/Study-Progress.git
$ cd Study-Progress
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
│   ├── 📄 courseExcersices.tsx
│   ├── 📄 coursesCard.tsx
│   ├── 📄 excersiceCard.tsx
│   ├── 📄 icons.tsx
│   ├── 📄 lectureTracker.tsx
│   ├── 📄 navbar.tsx
│   ├── 📄 progress.tsx
│   ├── 📄 slider.tsx
│   └── 📄 theme-switch.tsx
├── 📂 data  # Static Data Files
│   ├── 📄 courses.json
│   ├── 📄 lectures.json
│   └── 📄 excersices.json
├── 📂 layouts
├── 📂 pages  
│   ├── 📄 index.tsx
│   ├── 📂 courses 
│   │   └── 📂 [id]
│   ├── 📂 excersices
│   └── 📄 _app.tsx  
├── 📂 styles  
├── 📄 tailwind.config.js
├── 📄 next.config.js
└── 📄 README.md  
```

---

## 📘 Usage Guide
### **📊 Tracking Course Progress**
(Assuming JSON files are updated to your specifications)
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

