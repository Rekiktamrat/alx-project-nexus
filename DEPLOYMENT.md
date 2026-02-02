# Deployment Guide: Render (Fixed Blueprint)

We have updated `render.yaml` to fix the configuration errors.

## Step 1: Push Code
Push the latest code to GitHub. This includes the restored `build.sh` and the corrected `render.yaml`.

## Step 2: Deploy on Render
1.  Go to your [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Blueprint**.
3.  Connect your `Job Board Platform` repository.
4.  Render will detect the `render.yaml` file.
5.  Click **Apply** (or "Create Blueprint").

## Why this works now:
*   **Correct Syntax**: We now define the Static Site (Frontend) inside the `services` list using `type: web` and `runtime: static`. This fixes the "unknown type" and "field not found" errors.
*   **Python Version**: Explicitly set to `3.11.0` to support Django 5.
*   **Build Script**: `build.sh` handles backend dependencies and migrations.

## Troubleshooting
If you see a build error:
1.  **Check Logs**: Look at the logs for the specific service (Frontend or Backend).
2.  **Frontend URL**: Ensure `FRONTEND_URL` in the backend service matches the actual URL Render assigns to your frontend (it might have a random suffix if the name is taken). You can update this in the Render Dashboard environment variables after deployment.
