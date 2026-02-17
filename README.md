# Task Manager

A simple task management application with user authentication and role-based access control. Built with Node.js, Express, MongoDB, and React.

## Features

- User registration and login
- JWT authentication
- Role-based access (user/admin)
- Create, read, update, delete tasks
- Filter tasks by status

## Tech Stack

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JWT for authentication
- Bcrypt for password hashing

**Frontend:**
- React with Vite
- React Router
- Axios

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB running locally or MongoDB Atlas account

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd backend_assignment
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Configuration

1. Create `.env` file in the backend folder:
```
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your-secret-key-here
PORT=5000
```

2. Create `.env` file in the frontend folder:
```
VITE_API_URL=http://localhost:5000/api/v1
```

### Running the App

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user (protected)

### Tasks
- `GET /api/v1/tasks` - Get all tasks (protected)
- `GET /api/v1/tasks/:id` - Get single task (protected)
- `POST /api/v1/tasks` - Create task (protected)
- `PUT /api/v1/tasks/:id` - Update task (protected)
- `DELETE /api/v1/tasks/:id` - Delete task (protected)

## Project Structure

```
backend/
├── src/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── validators/     # Input validation
│   └── server.js       # Entry point
└── package.json

frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── context/        # Auth context
│   ├── pages/          # Page components
│   ├── services/       # API service
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## Documentation

- [Scalability Strategy](scalability.md) - Details on architecture and scalability plans.
- [API Documentation](Backend_Assignment_API.postman_collection.json) - Postman collection for testing.

## Testing

You can test the API using the included Postman collection (`Backend_Assignment_API.postman_collection.json`) or any API testing tool.

### Example: Register a User
```bash
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Example: Create a Task
```bash
POST http://localhost:5000/api/v1/tasks
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the backend assignment",
  "status": "pending"
}
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Input validation on all endpoints
- Protected routes require authentication
- Role-based access control for admin features

## Notes

- Default role for new users is "user"
- To create an admin, add `"role": "admin"` in the registration payload
- Users can only see/edit their own tasks
- Admins can see all tasks

## Troubleshooting

**MongoDB connection error:**
- Make sure MongoDB is running
- Check your connection string in `.env`

**Port already in use:**
- Change the PORT in backend `.env` file
- Update VITE_API_URL in frontend `.env` accordingly

**CORS errors:**
- Backend is configured to allow `http://localhost:5173`
- If using a different port, update CORS settings in `server.js`


