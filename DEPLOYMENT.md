# Deployment Guide for Render

This guide will help you deploy your Job Board Platform (Django Backend + React Frontend) to Render.

## Prerequisites

1.  A [GitHub](https://github.com/) account.
2.  A [Render](https://render.com/) account.
3.  Your code pushed to a GitHub repository.

## Option 1: Automatic Deployment (Recommended)

1.  **Push your code to GitHub.**
2.  **Log in to Render.**
3.  **Click "New" -> "Blueprint".**
4.  **Connect your GitHub repository.**
5.  Render will automatically detect the `render.yaml` file and set up:
    *   A PostgreSQL Database.
    *   The Django Backend Web Service.
    *   The React Frontend Static Site.
6.  **Click "Apply".**

**Note:** You might need to update the `FRONTEND_URL` and `VITE_API_URL` environment variables after the services are created if the auto-generated URLs differ from the defaults in `render.yaml`.

## Option 2: Manual Deployment

### 1. Database (PostgreSQL)
1.  Click **New +** -> **PostgreSQL**.
2.  Name: `job-board-db`.
3.  Click **Create Database**.
4.  Copy the **Internal Database URL**.

### 2. Backend (Django)
1.  Click **New +** -> **Web Service**.
2.  Connect your repo.
3.  Name: `job-board-backend`.
4.  Runtime: **Python 3**.
5.  Build Command: `./job_board/build.sh`
6.  Start Command: `cd job_board && gunicorn job_board.wsgi:application`
7.  **Environment Variables:**
    *   `DATABASE_URL`: Paste the Internal Database URL from step 1.
    *   `SECRET_KEY`: Generate a random string.
    *   `PYTHON_VERSION`: `3.9.0` (or your preferred version).
    *   `FRONTEND_URL`: (Leave empty for now, update after deploying frontend).
8.  Click **Create Web Service**.

### 3. Frontend (React)
1.  Click **New +** -> **Static Site**.
2.  Connect your repo.
3.  Name: `job-board-frontend`.
4.  Build Command: `cd frontend && npm install && npm run build`
5.  Publish Directory: `frontend/dist`
6.  **Environment Variables:**
    *   `VITE_API_URL`: Paste the URL of your backend service (e.g., `https://job-board-backend.onrender.com/api`).
7.  Click **Create Static Site**.
8.  **Rewrites:**
    *   Go to "Redirects/Rewrites" tab.
    *   Add a Rewrite: Source `/*`, Destination `/index.html`.

### 4. Final Configuration
1.  Copy the URL of your deployed Frontend (e.g., `https://job-board-frontend.onrender.com`).
2.  Go back to your **Backend Service** -> **Environment**.
3.  Add/Update `FRONTEND_URL` with your frontend URL.
4.  Redeploy the backend if necessary.

## Troubleshooting

*   **Build Failures:** Check the logs. Ensure `requirements.txt` and `package.json` are in the correct locations.
*   **Database Connection:** Ensure `DATABASE_URL` is correct and the database service is running.
*   **CORS Errors:** Ensure `FRONTEND_URL` in backend env vars matches your actual frontend URL (no trailing slash).
