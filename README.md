# Simple Task Management System

## Description
A simple and efficient Task Management System that allows users to create, manage, and track tasks with various features, ensuring a smooth workflow and enhanced productivity.

## Features
1. **Task Creation**: Users can create new tasks with a title, description, due date, and priority.
2. **Task List**: Displays all tasks with pagination and AJAX, showing the title, due date, and status (pending/completed).
3. **Task Details**: View detailed information about a specific task, including its description and due date.
4. **Task Editing**: Users can edit existing tasks, updating the title, description, and due date.
5. **Task Deletion**: Provides an option to delete tasks with a confirmation dialog.
6. **Task Status Update**: Users can mark tasks as completed or change their status.
7. **User Authentication**: A basic user authentication system ensures that only authorized users can manage tasks.
8. **Priority Management**: Move tasks between different priority lists.
9. **Visual Representation**: Each priority list is color-coded for quick identification.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Variables**: dotenv

## Project Structure
```
task-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   ├── services/
    │   ├── utils/
    │   ├── App.jsx
    │   ├── index.jsx
    │   └── App.css
    ├── .gitignore
    ├── package.json
    └── vite.config.js
```

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Navigate to the frontend directory and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
4. Set up environment variables in a `.env` file in the backend directory.

## Usage
1. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```
2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

Thank you Magnet Brains for this opportunity!
