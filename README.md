# Expense Tracker Application

This is a full-stack expense tracker application with a **Next.js frontend** and a **Django backend** using **SQLite** for the database. Both services are containerized using Docker for easy setup and deployment.

## Features
- **Next.js** for the frontend
- **Django REST Framework** for the backend API
- **SQLite** for database management
- **JWT Authentication** with Django REST Framework
- **CORS support** for cross-origin requests

## Prerequisites
Ensure you have the following installed on your system:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory (same level as `docker-compose.yml`) to hold environment variables for Django:

```bash
# .env
SECRET_KEY=your-secret-key   # Replace with a strong secret key
DEBUG=True                   # Use True for development, False for production
ALLOWED_HOSTS=localhost,django_backend
```

Make sure to replace `your-secret-key` with a unique, secure value.

### 3. Build and Run the Docker Containers

Run the following commands to build the Docker images and start the services:

```bash
docker-compose build
docker-compose up
```

This will:
- Build and start the **Django backend** on [http://localhost:8000](http://localhost:8000).
- Build and start the **Next.js frontend** on [http://localhost:3000](http://localhost:3000).

### 4. Access the Application

- **Frontend (Next.js)**: Navigate to [http://localhost:3000](http://localhost:3000).
- **Backend API (Django)**: Navigate to [http://localhost:8000](http://localhost:8000).

### 5. Stopping the Application

To stop the running containers, use:

```bash
docker-compose down
```

### Additional Information

- **SQLite** is used as the database, and the database file is saved inside the container. You can access the `db.sqlite3` file if needed by connecting to the running backend container.
- **JWT Authentication** is set up for the API. If you want to test API routes that require authentication, you'll need to obtain a JWT token by logging in or registering through the backend API.

### Troubleshooting

1. **Backend Error: `You must set settings.ALLOWED_HOSTS if DEBUG is False`.**
   - Ensure that `ALLOWED_HOSTS` is set correctly in your `.env` file. If running in development mode, set `DEBUG=True`.

2. **Port Already in Use:**
   - If you encounter issues with ports being occupied, stop any running services that are using port `3000` (for Next.js) or `8000` (for Django) and try again.

3. **Rebuilding Containers:**
   - If you make changes to the code and need to rebuild the containers, use the following command:

   ```bash
   docker-compose build
   ```