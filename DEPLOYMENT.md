# Deployment Guide: Free Options

You have two main ways to deploy this project for **FREE**.

## Option 1: Render Blueprint (Easiest)
We have updated `render.yaml` to explicitly use the **Free Plan**.

1.  **Push** your code to GitHub.
2.  Go to [Render Dashboard](https://dashboard.render.com/).
3.  Click **New +** -> **Blueprint**.
4.  Select your repository.
5.  **Important:** If Render asks for a credit card, it is for identity verification. They will not charge you if the plan is set to "Free".
6.  Click **Apply**.

---

## Option 2: The "Zero Cost" Stack (Vercel + Render Manual)
If Render Blueprints are giving you trouble or asking for payment upgrades, use this method. It splits the app to get the best free tiers.

### Part A: Database (Render or Neon)
1.  **Render Postgres (Free for 90 days):**
    - Go to Render Dashboard -> New + -> **PostgreSQL**.
    - Name: `job-board-db`.
    - Plan: **Free**.
    - Copy the `Internal DB URL` (for Render backend) and `External DB URL` (for local access).

### Part B: Backend (Render)
1.  Go to Render Dashboard -> New + -> **Web Service**.
2.  Connect your GitHub repo.
3.  **Settings:**
    - **Name:** `job-board-backend`
    - **Runtime:** Python 3
    - **Build Command:** `bash build.sh`
    - **Start Command:** `gunicorn job_board.wsgi:application`
    - **Plan:** Free
4.  **Environment Variables:**
    - `PYTHON_VERSION`: `3.11.0`
    - `DATABASE_URL`: (Paste the Internal DB URL from Part A)
    - `SECRET_KEY`: (Any random string)
    - `ALLOWED_HOSTS`: `*`
5.  Deploy. Copy your backend URL (e.g., `https://job-board-backend.onrender.com`).

### Part C: Frontend (Vercel) - Recommended 👑
Vercel is the best place for React apps (Free & Fast).

1.  Go to [Vercel Dashboard](https://vercel.com/new).
2.  Import your GitHub repository.
3.  **Configure Project:**
    - **Root Directory:** Edit -> Select `frontend` folder.
    - **Framework Preset:** Vite (should auto-detect).
4.  **Environment Variables:**
    - `VITE_API_URL`: (Paste your Render Backend URL from Part B, e.g., `https://job-board-backend.onrender.com/api`)
    - **Note:** Make sure to add `/api` at the end!
5.  Click **Deploy**.

### Final Step: Connect Frontend to Backend
Once Vercel gives you a domain (e.g., `https://job-board-frontend.vercel.app`):
1.  Go back to **Render Dashboard** -> **Backend Service** -> **Environment Variables**.
2.  Add/Update:
    - `FRONTEND_URL`: `https://job-board-frontend.vercel.app`
    - `CORS_ALLOWED_ORIGINS`: `https://job-board-frontend.vercel.app`
    - `CSRF_TRUSTED_ORIGINS`: `https://job-board-frontend.vercel.app`
3.  Save Changes (Render will restart).

**Done!** You now have a free full-stack app.
