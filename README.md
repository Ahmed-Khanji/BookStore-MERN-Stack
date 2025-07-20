# 📚 MERN Book Store App

This is a simple full-stack Book Store application built with the MERN stack (MongoDB, Express, React, Node.js).

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB + Mongoose

### 1. Clone Repo
```bash
git clone https://github.com/yourusername/mern-bookstore.git
```

### 2. Setup Backend
```bash
cd backend
npm install
# Add .env with: MONGODB_URI=your_mongo_uri
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## API Endpoints
- `GET /api/books`
- `POST /api/books`
- `GET /api/books/:id`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

## Features
- Add, view, edit, and delete books
- Clean UI with Tailwind
- Connected frontend & backend with REST API
