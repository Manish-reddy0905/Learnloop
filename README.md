# LearnLoop - AI-Powered Learning Platform

A modern, responsive, production-ready learning platform with gamification, AI recommendations, and instructor management.

## 🎯 Features

- 🎮 Gamification System (Streaks, Diamonds, XP, Levels)
- 👨‍🏫 Instructor Dashboard with Analytics
- 👨‍🎓 Student Dashboard with Progress Tracking
- 💳 Payment Integration (Stripe & Razorpay)
- 🤖 AI Course Recommendations
- 📱 Fully Responsive Design
- 🌙 Dark/Light Mode
- 🔐 JWT + Google OAuth Authentication
- 📊 Advanced Analytics
- 🏅 Certificates & Achievements

## 📦 Tech Stack

**Frontend:**
- Next.js 14+ (React)
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand (State Management)
- SWR (Data Fetching)

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Stripe & Razorpay APIs

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env.local
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── config/
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   ├── hooks/
    │   ├── stores/
    │   ├── services/
    │   ├── types/
    │   ├── utils/
    │   └── styles/
    ├── .env.example
    └── package.json
```

## 📄 License

MIT
