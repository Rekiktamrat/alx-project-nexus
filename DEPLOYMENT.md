# Deployment Guide: Render (Automated Blueprint)

We have created a fixed `render.yaml` blueprint. This is the easiest way to deploy because it automates the configuration (Python version, Build commands, etc.) which was causing errors before.

## Step 1: Push Code
Push the latest code to GitHub. This includes the new `build.sh` in the root directory and the `render.yaml` file.

## Step 2: Deploy on Render
1.  Go to your [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Blueprint**.
3.  Connect your `Job Board Platform` repository.
4.  Render will detect the `render.yaml` file.
5.  Click **Apply** (or "Create Blueprint").

## Why this will work now:
*   **Python Version**: We explicitly set `PYTHON_VERSION` to `3.11.0` in the blueprint. This fixes the `Django>=5.0` installation error.
*   **Build Script**: We moved `build.sh` to the root directory and updated the command to `bash build.sh`, ensuring it finds `requirements.txt` and `manage.py` correctly.
*   **Frontend Config**: The blueprint correctly points to the `frontend` directory and sets the rewrite rule for React.

## Troubleshooting
If you still see an error:
1.  **Check Logs**: Look at the "Logs" tab in Render for the failed service.
2.  **Database**: Ensure the database is created successfully (the blueprint handles this, but sometimes limits apply on free accounts).
