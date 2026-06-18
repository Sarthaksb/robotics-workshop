# 🤖 AI & Robotics Summer Workshop 2026

> A modern, responsive landing page for an AI & Robotics Summer Workshop built with **React + Vite** (frontend) and **Express** (backend).

---

## 📋 Workshop Details

| Detail | Info |
|--------|------|
| **Age Group** | 8–14 Years |
| **Duration** | 4 Weeks |
| **Mode** | Online |
| **Fee** | ₹2,999 |
| **Start Date** | 15 July 2026 |

---

## 🗂 Project Structure

```
project_ints/
├── client/                  # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── sections/
│   │   │       ├── Hero.jsx / Hero.css
│   │   │       ├── WorkshopDetails.jsx / WorkshopDetails.css
│   │   │       ├── LearningOutcomes.jsx / LearningOutcomes.css
│   │   │       ├── FAQ.jsx / FAQ.css
│   │   │       └── RegistrationForm.jsx / RegistrationForm.css
│   │   ├── App.jsx / App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/                  # Express backend
    ├── controllers/
    │   └── registrationController.js
    ├── routes/
    │   └── registrationRoutes.js
    ├── server.js
    ├── .env
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

---

### 1. Install & Run the Backend

```bash
cd server
npm install
npm run dev
```

Server starts at → `http://localhost:5000`

---

### 2. Install & Run the Frontend

```bash
cd client
npm install
npm run dev
```

App opens at → `http://localhost:5173`

> The Vite dev server automatically proxies `/api/*` requests to `http://localhost:5000` — no extra config needed.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/health` | Server health check |
| `POST` | `/api/register` | Submit registration form |

### POST `/api/register` — Request Body

```json
{
  "name":  "Aarav Sharma",
  "email": "parent@example.com",
  "phone": "9876543210"
}
```

### Response — Success `201`

```json
{
  "success": true,
  "message": "Registration successful!",
  "data": {
    "id": 1,
    "name": "Aarav Sharma",
    "registeredAt": "2026-06-18T10:00:00.000Z"
  }
}
```

### Response — Validation Error `422`

```json
{
  "success": false,
  "errors": ["Valid email address is required."]
}
```

---

## 🧩 Component Overview

| Component | Section | Key Features |
|-----------|---------|--------------|
| `Hero` | Top banner | Live countdown timer, CTA, floating particles |
| `WorkshopDetails` | About | 5 detail cards (age, duration, mode, fee, date) |
| `LearningOutcomes` | Curriculum | 5 outcome cards, featured capstone, stats strip |
| `FAQ` | FAQ | Accordion expand/collapse via `useState`, 7 FAQs |
| `RegistrationForm` | Register | Controlled form, live validation, success state |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#05050f` (deep dark) |
| Primary accent | `#00e5ff` (cyan) |
| Secondary accent | `#a78bfa` (violet) |
| Heading font | `Orbitron` (Google Fonts) |
| Body font | `Inter` (Google Fonts) |
| Card style | Glassmorphism (`backdrop-filter: blur`) |

---

## ✅ Features

- ⚡ Vite-powered fast HMR dev server
- 🎨 Dark futuristic theme with neon accents
- 📱 Fully responsive — mobile, tablet, desktop
- ♿ Accessible — ARIA roles, labels, focus rings
- 🔒 Server-side + client-side form validation
- 🎯 Live countdown timer to workshop start date
- 🌀 Smooth CSS animations with `prefers-reduced-motion` support
- 🔁 API proxy — no CORS issues in development
