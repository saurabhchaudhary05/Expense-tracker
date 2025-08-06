# Expense Tracker (MERN Stack)

## Project Overview
A full-featured Expense Tracker web application built with the MERN stack (MongoDB, Express, React, Node.js). Track your expenses, analyze trends, and visualize your spending with interactive charts.

## Features
- User authentication (JWT, secure login/register)
- Add, edit, and delete expenses
- Google reCAPTCHA for bot prevention
- Interactive dashboard with:
  - Pie, Bar, Line, Area, Waterfall, and Funnel charts
  - Chart analysis by month, day, year, or category
  - Total expense summary
- Responsive, modern UI with theme toggle

## Tech Stack
- **Frontend:** React, Material-UI, recharts
- **Backend:** Node.js, Express, MongoDB, JWT

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd expense-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in `backend/` with:
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  RECAPTCHA_SECRET=your_recaptcha_secret
  ```
- Start the backend:
  ```bash
  npm start
  # or
  npm run dev
  ```

### 3. Frontend Setup
```bash
cd ../frontend-new
npm install
npm start
```

## Environment Variables
- **Backend:**
  - `MONGO_URI` - MongoDB connection string
  - `JWT_SECRET` - Secret for JWT authentication
  - `RECAPTCHA_SECRET` - Google reCAPTCHA secret key
- **Frontend:**
  - Set your reCAPTCHA site key in the login/register components if needed

## Running the App
1. Start the backend server.
2. Start the frontend React app.
3. Register a new user, log in, and start tracking your expenses!

