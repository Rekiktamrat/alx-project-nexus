# Job Board Backend

This is the backend for the Job Board Platform, built with Django and Django REST Framework.

## Features

- **Job Posting Management**: Create, update, delete, and retrieve job postings.
- **Role-Based Authentication**: Admins can manage jobs; Users can apply.
- **Optimized Job Search**: Filter by category, location, and job type.
- **API Documentation**: Swagger UI available at `/api/docs/`.

## Prerequisites

- Python 3.8+
- PostgreSQL (Optional, defaults to SQLite)

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd job_board_platform
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # macOS/Linux
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Database Setup:**
    - By default, the project uses SQLite.
    - To use PostgreSQL, update the `DATABASES` configuration in `job_board/settings.py` with your credentials.

5.  **Run Migrations:**
    ```bash
    python manage.py migrate
    ```

6.  **Create Superuser:**
    ```bash
    python manage.py createsuperuser
    ```

7.  **Run the Server:**
    ```bash
    python manage.py runserver
    ```

## API Documentation

Access the Swagger documentation at: `http://localhost:8000/api/docs/`

## API Endpoints

- **Auth**:
    - `POST /api/auth/register/` - Register a new user
    - `POST /api/auth/login/` - Login and get JWT tokens
    - `POST /api/auth/token/refresh/` - Refresh access token

- **Jobs**:
    - `GET /api/jobs/` - List all jobs (Filter: ?category=IT&location=NY)
    - `POST /api/jobs/` - Create a job (Admin only)
    - `GET /api/jobs/{id}/` - Retrieve job details
    - `PUT /api/jobs/{id}/` - Update job (Admin only)
    - `DELETE /api/jobs/{id}/` - Delete job (Admin only)
    - `POST /api/jobs/{id}/apply/` - Apply for a job (User only)

- **Categories**:
    - `GET /api/categories/` - List categories
    - `POST /api/categories/` - Create category (Admin only)

- **Applications**:
    - `GET /api/applications/` - List applications (User sees own, Admin sees all)
