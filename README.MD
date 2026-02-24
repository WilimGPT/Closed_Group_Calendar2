# 📘 Closed Group Calendar - Scheduler MVP (Production Version)

---

## 🧾 Summary

Closed Group Calendar is an internal scheduling tool used to manage teacher availability and book recurring language courses. Administrators can:

1. Create and manage repeating availability slots
2. View, edit, and organise existing courses and all associated sessions
3. Generate recurring course schedules
4. Check availability and detect conflicts
5. Override collisions when necessary

The system has now been fully migrated from a Django + JSON backend to a serverless Cloudflare-based architecture.

---

## 🏗 Architecture Overview

- **Frontend:** Vue.js (Cloudflare Pages)
- **Backend API:** Cloudflare Worker (Hono)
- **Database:** Cloudflare D1 (managed SQLite)
- **Authentication:** Worker-level shared-secret token (Bearer) + frontend login screen
- **Hosting:** Cloudflare Pages + Workers

This model removes the need for a traditional server while keeping operations lightweight and low‑maintenance.

---

# 🚀 Local Development

## Requirements
- Node 18+
- npm
- Cloudflare Wrangler CLI
- Cloudflare account

---

## 1. Clone the Repository
```bash
git clone <repo-url>
cd Closed_Group_Calendar2
```

---

## 2. Development – Frontend
```bash
cd frontend
npm install
npm run serve
```
Runs at:
```
http://localhost:8080
```

---

## 3. Development – Worker API (Backend)
From the `worker/` directory:

```bash
cd worker
npx wrangler dev
```

Local Worker URL:
```
http://localhost:8787/api/
```

When developing locally, the Worker injects a local `APP_PASSWORD` defined inside `wrangler.jsonc`.

---

# 🌐 Production Deployment

## Frontend (Cloudflare Pages)
- Deployment is automatic on push to the configured GitHub branch.
- Pages injects the environment variable:
  - `VUE_APP_API_BASE_URL = https://<your-worker>.workers.dev/api/`

## Backend (Cloudflare Worker)
To deploy production backend:
```bash
cd worker
npx wrangler deploy
```
This uploads and activates the Worker and ensures the production D1 database is used.

## Database (Cloudflare D1)
Schema and seed data are applied using:
```bash
npx wrangler d1 execute <DB_NAME> --remote --file=../migrations/0001_schema.sql
npx wrangler d1 execute <DB_NAME> --remote --file=../migrations/0002_seed_import.sql
```

---

# 🔐 Authentication Layer

## Worker-side Protection
Every API request must include:
```
Authorization: Bearer <APP_PASSWORD>
```
The password is stored in Worker environment variables (Cloudflare dashboard → Worker → Settings → Variables).

## Frontend Login
- Users must enter the password when loading the app.
- On success, the password is stored in `localStorage`.
- If the browser clears storage, user must log in again.

---

# 🧱 Project Structure
```
frontend/          # Vue.js interface
worker/            # Cloudflare Worker API
migrations/        # D1 schema files
seed-data/         # Seed JSON files
README.md          # This document
```

---

# 🔌 API Endpoints (Cloudflare Worker)
Base route:
```
/api/:language/
```

## Core Endpoints
- `GET /api/:language/` — Returns teachers, availability, courses, sessions
- `POST /api/:language/add-availability/`
- `POST /api/:language/update-availability/`
- `POST /api/:language/delete-availability/`
- `POST /api/:language/book/:teacherId` — Create new course
- `POST /api/:language/update-course/:courseId` — Edit an existing course
- `POST /api/:language/add-session/:courseId` — Add a new class to a course
- `POST /api/:language/delete-course/:courseId` — Delete full course + sessions

All write operations require valid authentication.

---

# 🗄 Database Overview

### Tables:
- **teachers** — Teacher profiles per language
- **availability_slots** — Weekly recurring availability blocks
- **courses** — Recurring course containers
- **course_sessions** — Individual class sessions within a course
- **blockers** — Manual blocks (optional)

Worker joins data to return frontend-friendly JSON structures.

---

# 🔄 Migration Notes
Originally built on:
- Django backend
- JSON per-language storage

Migrated to:
- Serverless Cloudflare Worker API
- Cloudflare D1 database
- Vue.js frontend

Benefits:
- No server maintenance
- Extremely low operational cost
- Predictable, simple scaling

---

# 🛠 Future Enhancements
- Multi-user authentication / role permissions
- Admin interface for modifying teachers
- Index optimisation in D1
- Automated course generation templates
- Activity logging and audit trail

---

# 📌 Internal Use Only
This system is designed as an internal scheduling tool for the LearnCube team. It is intentionally lightweight and optimised for clarity, speed, and low overhead. Further modular development is possible as the needs of the scheduling system evolve.

---

