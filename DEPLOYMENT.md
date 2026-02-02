# Manual Deployment Guide for Render

Since the automatic blueprint was causing issues, we will deploy the services manually. This is often more reliable and gives you more control.

## Step 1: Push Code to GitHub
Ensure your latest code (including the updated `requirements.txt`) is pushed to your GitHub repository.

## Step 2: Create the Database (PostgreSQL)
1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **PostgreSQL**.
3. **Name**: `job-board-db`
4. **Region**: Frankfurt (or closest to you).
5. **PostgreSQL Version**: 16 (default).
6. Click **Create Database**.
7. **Important**: Once created, scroll down to the **Connections** section and copy the **Internal Database URL**. You will need this for the backend.

## Step 3: Deploy the Backend (Django)
1. Click **New +** -> **Web Service**.
2. Select **Build and deploy from a Git repository**.
3. Connect your `Job Board Platform` repository.
4. **Name**: `job-board-backend`
5. **Region**: Same as your database (e.g., Frankfurt).
6. **Runtime**: Python 3
7. **Build Command**: `./build.sh`
8. **Start Command**: `gunicorn job_board.wsgi:application`
9. **Root Directory**: `job_board`  <-- **CRITICAL STEP**
   * *This tells Render to run everything from inside the `job_board` folder.*
10. **Environment Variables** (Click "Add Environment Variable"):
    * `DATABASE_URL`: Paste the **Internal Database URL** you copied earlier.
    * `SECRET_KEY`: Enter a random long string (e.g., `django-insecure-random-string-123`).
    * `PYTHON_VERSION`: `3.9.0`
    * `FRONTEND_URL`: `https://job-board-frontend.onrender.com` (You can update this later if you don't know it yet).
11. Click **Create Web Service**.

## Step 4: Deploy the Frontend (React)
1. Click **New +** -> **Static Site**.
2. Connect your `Job Board Platform` repository.
3. **Name**: `job-board-frontend`
4. **Root Directory**: `frontend` <-- **CRITICAL STEP**
5. **Build Command**: `npm install && npm run build`
6. **Publish Directory**: `dist`
7. **Environment Variables**:
    * `VITE_API_URL`: Paste your Backend URL (e.g., `https://job-board-backend.onrender.com/api`).
      * *Note: You get the Backend URL from the service you created in Step 3.*
8. Click **Create Static Site**.
9. **Redirects/Rewrites**:
    * Go to the **Redirects/Rewrites** tab of your new Static Site.
    * Add a new rule:
        * **Source**: `/*`
        * **Destination**: `/index.html`
        * **Action**: `Rewrite`
    * Click **Save Changes**.

## Step 5: Final Connection
1. Once the Frontend is deployed, copy its URL (e.g., `https://job-board-frontend.onrender.com`).
2. Go back to your **Backend Service** -> **Environment**.
3. Update/Add the `FRONTEND_URL` variable with this URL.
4. The Backend might auto-deploy when you save. If not, click **Manual Deploy** -> **Deploy latest commit**.

## Troubleshooting
* **Backend Build Fails?** Check logs. If it says "requirements.txt not found", ensure "Root Directory" is set to `job_board`.
* **Frontend Blank Page?** Ensure the "Rewrite" rule is set correctly in Step 4.
