# 🧠 CareerMind AI (Career Memory Assistant)

> Turn your GitHub repositories into career proof. An AI-powered pipeline that extracts technical memories from your code and generates tailored resumes and interview prep.

## 🚀 Overview

Students and developers often build amazing projects but forget the exact technical challenges they solved, architecture decisions they made, or bugs they fixed. **CareerMind AI** solves this by acting as your technical career memory.

This platform connects to your GitHub, uses AI to analyze your repositories (code, README, metadata), and automatically generates:
- **STAR-format resume bullets** tailored to a specific Job Description.
- **Mock Interview Questions** (Technical & Behavioral) based on your actual code stack.
- **Job Fit Insights** showcasing skill gaps and recommended projects to build.

## 🛠️ Tech Stack

### Frontend (Implemented)
- **Framework:** Next.js 14 (App Router) + React
- **Styling:** Tailwind CSS v4 + Framer Motion (Glassmorphism UI)
- **State Management:** Zustand
- **Components:** Radix UI Primitives (Custom built)
- **API Integration:** Mocked service layer ready for backend connection

### Backend & AI (Architecture Blueprint)
- **Auth:** GitHub OAuth + JWT
- **API:** REST Architecture (FastAPI / Node.js)
- **AI Processing:** LangChain, OpenAI APIs
- **Database:** PostgreSQL (Users, Repositories, Jobs, Analyses, Results)

## 💻 Running the Frontend Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure (Frontend)
```text
src/
├── app/
│   ├── (marketing)/      # Landing page and public views
│   ├── (dashboard)/      # Protected dashboard, insights, and resume views
│   └── onboarding/       # GitHub OAuth mock flow
├── components/           # Reusable UI components (Cards, Buttons, Badges)
├── services/             # API interaction layer (currently mocked)
├── store/                # Zustand global state (Auth, Repositories)
└── types/                # TypeScript models mapping to database schema
```

## 🤝 Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request
