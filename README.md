# AI Career Memory Assistant

Turn your GitHub projects into job-ready career material.

AI Career Memory Assistant connects to your GitHub account, reads your repositories, and compares them against a job description you paste in. For each job and repository pair it produces STAR-format resume bullets, likely interview questions, and a project summary. A separate **Career Predictor** uses a scikit-learn model to suggest a career path from your skills and background.

---

## Features

- **GitHub OAuth login** — sign in with GitHub. The GitHub access token is stored encrypted (Fernet, key derived from `SECRET_KEY`), and the API issues JWTs for the session.
- **Repository import** — fetch your repositories from the GitHub API and mark the ones relevant to your job search.
- **Job descriptions** — save, edit, and delete the job postings you are targeting.
- **Asynchronous analysis** — analyze a repository against a job in a Celery worker. The frontend polls task status until the result is ready.
- **Results** — STAR resume bullets, interview questions, and a summary for each analysis.
- **Career Predictor** — rate your programming languages and soft skills, add GPA and background, and get a predicted career path from a trained ML model.

> **Status:** the analysis pipeline, task queue, and data model are in place. The analysis logic in `Backend/aicareer/tasks.py` (`analyze_code`) is currently a placeholder built from repository metadata. It is the integration point for an LLM service. See [Roadmap](#roadmap).

---

## Architecture

```
React + Vite frontend  ──HTTP/JWT──▶  Django REST API  ──▶  PostgreSQL
                                          │
                                          ├──▶ GitHub API (OAuth, repos, contents)
                                          ├──▶ Redis (cache + Celery broker)
                                          │       │
                                          │       ▼
                                          │   Celery worker ──▶ analyze_repository task
                                          │
                                          └──▶ scikit-learn model (career prediction)
```

### Analysis flow

1. User creates an analysis (`POST /api/analysis/create/`) with a `job_id` and `repo_id`.
2. The API creates an `Analysis` (status `pending`) and a `Result` with the Celery `task_id`, then queues `analyze_repository`.
3. The worker sets status to `processing`, fetches repository data from GitHub, and runs the analysis.
4. The worker saves bullets, questions, and summary to `Result`, and sets status to `completed` (or `failed`).
5. The frontend polls `GET /api/task/<task_id>/status/` and then shows the result.

---

## Tech stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Axios |
| Backend  | Python 3.12, Django 6, Django REST Framework, Simple JWT |
| Async    | Celery, Redis |
| Database | PostgreSQL |
| ML       | scikit-learn, pandas, joblib |
| Deploy   | Gunicorn, WhiteNoise (`Procfile` included) |

---

## Project structure

```
AI-Career-Memory-Assistant/
├── Backend/
│   ├── core/                 # Django project: settings, URLs, Celery app
│   ├── aicareer/             # Main app
│   │   ├── models.py         # User, Repository, Job, Analysis, Result
│   │   ├── tasks.py          # Celery task: analyze_repository
│   │   ├── views/            # API views (auth, repos, jobs, analysis, results, ML)
│   │   ├── serializers/
│   │   └── urls/
│   ├── ml/
│   │   └── predictor.py      # Loads model.pkl + label_encoder.pkl
│   ├── requirements.txt
│   ├── runtime.txt
│   └── Procfile
└── Frontend/
    └── src/
        ├── pages/            # Landing, Dashboard, Repos, Jobs, Analyze, Results, CareerPredictor
        ├── services/         # Axios client + API services
        ├── types/
        └── utils/
```

---

## Getting started

### Prerequisites

- Python 3.12
- Node.js 20+ and npm
- PostgreSQL
- Redis
- A GitHub OAuth App ([create one here](https://github.com/settings/developers))
  - **Homepage URL:** `http://localhost:5173`
  - **Authorization callback URL:** `http://localhost:5173/callback`

### 1. Backend

```bash
cd Backend
python -m venv venv
# Windows: venv\Scripts\activate
source venv/bin/activate
pip install -r requirements.txt
```

Create `Backend/.env`:

```env
SECRET_KEY=change-me

DB_NAME=aicareer
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

REDIS_CACHE_URL=redis://localhost:6379/1
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
```

> `SECRET_KEY` also derives the key that encrypts stored GitHub tokens. If you change it, existing tokens can no longer be decrypted and users must log in again.

Create the logs folder (the logging config writes to it), then run migrations and start the server:

```bash
mkdir logs
python manage.py migrate
python manage.py runserver
```

In a second terminal, start the Celery worker:

```bash
cd Backend
celery -A core worker -l info
# On Windows, add: --pool=solo
```

**ML model files:** the Career Predictor needs `Backend/ml/model.pkl` and `Backend/ml/label_encoder.pkl`. These files are git-ignored, so add them yourself. Start the server from the `Backend/` folder, because `predictor.py` loads them with relative paths.

### 2. Frontend

```bash
cd Frontend
npm install
```

Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_GITHUB_REDIRECT_URI=http://localhost:5173/callback
```

Start the dev server:

```bash
npm run dev
```

Open http://localhost:5173 and sign in with GitHub.

---

## API reference

All endpoints are under `/api/`. Endpoints marked 🔒 need an `Authorization: Bearer <access_token>` header.

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/github/` | Exchange a GitHub OAuth `code` for JWT `access` + `refresh` tokens |
| GET 🔒 | `/auth/me/` | Current user |
| POST | `/token/` | Obtain a JWT pair |
| POST | `/token/refresh/` | Refresh an access token |

### Repositories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET 🔒 | `/repos/fetch/` | Import repositories from GitHub |
| GET 🔒 | `/repos/` | List saved repositories |
| GET / PATCH / DELETE 🔒 | `/repos/<id>/` | Get, update (e.g. `selected`), or delete a repository |

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET / POST 🔒 | `/jobs/` | List or create jobs |
| GET / PUT / PATCH / DELETE 🔒 | `/jobs/<id>/` | Manage a single job |

### Analysis and results

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET 🔒 | `/analysis/` | List your analyses |
| POST 🔒 | `/analysis/create/` | Start an analysis: `{ "job_id": 1, "repo_id": 2 }` |
| GET 🔒 | `/results/` | List results |
| GET / DELETE 🔒 | `/results/<id>/` | Get or delete a result |
| GET 🔒 | `/task/<task_id>/status/` | Celery task state |

### Career prediction

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/predict/` | Predict a career path from a skills profile |

Example request body:

```json
{
  "Python": 8, "Java": 6, "C++": 5, "JavaScript": 7, "C#": 0, "PHP": 0,
  "Ruby": 0, "Swift": 0, "Go": 0, "Rust": 0, "Others": 0,
  "Software_Development_Experience": 8, "Database_Management": 7,
  "Networking_Skills": 5, "Web_Development_Experience": 8,
  "Communication_Skills": 7, "Problem_Solving_Abilities": 8,
  "Teamwork_Collaboration": 8, "Time_Management": 7, "Adaptability": 8,
  "GPA": 3.5,
  "Coursework_Completion_Status": "Completed",
  "Academic_Achievements": "Yes",
  "Personal_Interests": "AI",
  "Internship_Experience": "Yes",
  "Certifications_Training": "Yes",
  "Leadership_Experience": "No"
}
```

Response:

```json
{ "prediction": "<career path>" }
```

---

## Data model

```
User ─┬─< Repository ─┐
      └─< Job ────────┴─< Analysis ─< Result
```

- **User** — custom Django user with `github_id` and an encrypted `access_token`.
- **Repository** — name, description, GitHub `metadata` (JSON), `selected` flag.
- **Job** — title and description.
- **Analysis** — one job and repository pair. Status is `pending`, `processing`, `completed`, or `failed`.
- **Result** — `star_bullets`, `interview_questions`, `summary`, and the Celery `task_id`.

---

## Deployment

The backend includes a `Procfile` (`web: gunicorn core.wsgi`) and `runtime.txt` for Heroku-style platforms. You also need to run a Celery worker process.

Before you deploy to production:

- Set `DEBUG = False` and restrict `ALLOWED_HOSTS` in `core/settings.py`.
- Add your frontend domain to `CORS_ALLOWED_ORIGINS`.
- Run `python manage.py collectstatic`.
- Use a strong, secret `SECRET_KEY`.

---

## Roadmap

- [ ] Replace the placeholder `analyze_code` with LLM-based analysis (skills and experience extraction from code, README, languages, and topics)
- [ ] Job requirement extraction from the job description
- [ ] Project matching engine (match score for each repository against a job)
- [ ] Career decision assistant: gap analysis, readiness score, alternative paths with trade-offs, recommended next action
- [ ] Tests for the API and Celery tasks
