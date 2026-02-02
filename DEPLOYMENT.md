# Deployment Guide: Folder Restructuring Update

We have restructured the project to separate the backend and frontend completely. This makes deployment much easier and cleaner.

## New Project Structure
- `backend/`: Contains all Django files (`manage.py`, `requirements.txt`, etc.).
- `frontend/`: Contains all React files (`package.json`, `vite.config.js`, etc.).
- `render.yaml`: Defines the blueprint for both services.

## Option 1: Render Blueprint (Recommended)
1.  **Push** the changes to GitHub.
2.  Go to Render Dashboard -> **New Blueprint**.
3.  Select your repository.
4.  Render should detect the new structure and deploy:
    - `job-board-backend` (Python) from `backend/` directory.
    - `job-board-frontend` (Static) from `frontend/` directory.
    - `job-board-db` (Postgres).

## Option 2: Manual Deployment (Vercel + Render)

### Frontend (Vercel)
1.  Import repository to Vercel.
2.  **Root Directory:** Select `frontend`.
3.  **Build Command:** `npm run build`.
4.  **Output Directory:** `dist`.
5.  **Env Vars:** `VITE_API_URL` = Your Backend URL + `/api`.

### Backend (Render)
1.  Create **Web Service**.
2.  **Root Directory:** `backend` (Important!).
3.  **Build Command:** `bash build.sh`.
4.  **Start Command:** `gunicorn job_board.wsgi:application`.
5.  **Env Vars:** Same as before (`DATABASE_URL`, `SECRET_KEY`, etc.).

### Local Development
To run the project locally now:

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py runserver
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
