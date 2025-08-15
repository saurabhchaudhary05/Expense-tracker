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

<img width="2878" height="1508" alt="image" src="https://github.com/user-attachments/assets/dd7f4d04-4c62-4ab7-939f-e3414077d17d" />
<img width="2859" height="1520" alt="image" src="https://github.com/user-attachments/assets/d7b0bcbc-8835-45ce-9b2a-bf7f8ef80bfa" />
<img width="2863" height="1540" alt="image" src="https://github.com/user-attachments/assets/720b1668-b220-48e7-941c-44c5ed9df1ec" />
<img width="2740" height="1539" alt="image" src="https://github.com/user-attachments/assets/29dd217c-ca09-4f59-9e83-0cfce30487ff" />
<img width="2546" height="1496" alt="image" src="https://github.com/user-attachments/assets/f0f47e9f-cf76-4df7-ac31-0cd30571d46e" />
<img width="2565" height="1343" alt="image" src="https://github.com/user-attachments/assets/0087c286-3a3b-459f-a4c3-69ca93f7b47e" />



