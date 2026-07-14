# TAVEWO Backend API

Express + MongoDB API powering the Contact form and the admin leads view.
(News is now static content on the frontend — no longer backed by this API.)

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

This is a simple shared-secret gate, suitable for internal use. If you need
per-user accounts, audit logs, or role-based access, that would need a real
auth layer (e.g. JWT + a Users collection) added on top of this.
