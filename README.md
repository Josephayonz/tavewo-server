# Tavewo Ventures Website - Backend

The backend of the **Tavewo Ventures Website** is built using **Node.js**, **Express.js**, and **MongoDB Atlas**. It exposes RESTful APIs that power the website's dynamic functionality, including processing and storing contact form submissions.

The backend is designed with scalability, security, and maintainability in mind.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS
- Dotenv
- Nodemon

---

## Features

- RESTful API architecture
- MongoDB Atlas integration
- Contact form processing
- Request validation
- Environment variable support
- CORS configuration
- Error handling middleware


Express + MongoDB API powering the Contact form and the admin leads view.
(News article is static content on the frontend and not backed by this API for now.)

## Setup

```bash
npm install
cp .env.example .env   # set MONGODB_URI and a strong ADMIN_TOKEN
npm run dev            # starts server on http://localhost:5000
```

## Endpoints

| Method | Route          | Auth                        | Description                                  |
|--------|----------------|------------------------------|-----------------------------------------------|
| GET    | `/api/health`  | none                         | Health check                                  |
| POST   | `/api/contact` | none                         | Submit contact form (fullName, workEmail, message required) |
| GET    | `/api/contact` | `x-admin-token` header       | List all submitted leads, newest first        |

## Admin access

The frontend's `/admin/contacts` page prompts for a token and sends it as the
`x-admin-token` header on `GET /api/contact`. Set `ADMIN_TOKEN` in `.env` to
whatever value you want to gate access with — treat it like a password and
don't commit it.
