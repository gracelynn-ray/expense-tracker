
# Expense Tracker

This is a full-stack expense tracker application with a Django backend and a Next.js frontend. Follow the steps below to set up and run the project locally.

## Table of Contents
1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)

## Requirements

Make sure you have the following installed on your machine:

- Python 3.x
- Node.js and npm
- pip (Python package installer)
- Virtualenv (optional, but recommended)

## Installation

Clone the repository to your local machine:

```
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### Backend Setup (Django)

1. Navigate to the \`expense_tracker_backend\` directory:

   ```
   cd expense_tracker_backend
   ```

2. (Optional) Create and activate a virtual environment:

   ```
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use venv\Scripts\activate
   ```

3. Install the required dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Run migrations to set up the database:

   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Run the backend server:

   ```
   python manage.py runserver
   ```

The backend will now be running at \`http://localhost:8000`.

### Frontend Setup (Next.js)

1. Open a new terminal and navigate to the \`expense-tracker-frontend\` directory:

   ```
   cd expense-tracker-frontend
   ```

2. Install the required dependencies:

   ```
   npm install
   ```

3. Run the frontend development server:

   ```
   npm run dev
   ```

The frontend will now be running at \`http://localhost:3000`.

## Running the Application

After following the steps above:

- Backend: Go to \`http://localhost:8000` to access the Django backend.
- Frontend: Go to \`http://localhost:3000` to view the Next.js frontend.

The frontend will communicate with the backend to manage expense tracking.

---

### Notes:
- Make sure the backend is running on \`http://localhost:8000` before starting the frontend.
- If you encounter issues with dependencies, check that you're using the correct versions as listed in \`requirements.txt\` and \`package.json\`.

---

