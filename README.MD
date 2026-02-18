# 📘 Closed Group Calendar - Scheduler MVP

---

## 🧾 Summary

Closed Group Calendar is an internal scheduling tool for managing teacher availability and booking recurring language courses.

The system allows administrators to:

1. Create and manage repeating availability slots
2. View, edit, and organise existing courses and sessions
3. Generate recurring course schedules
4. Validate bookings against availability and existing sessions
5. Detect and optionally override scheduling conflicts

This project is currently being migrated from a Django + JSON backend to a serverless architecture using Cloudflare.

---

## 🏗 Architecture Overview

- **Frontend:** Vue.js (admin interface)
- **API Layer:** Cloudflare Worker using the Hono framework
- **Database:** Cloudflare D1 (managed SQLite)
- **Hosting:** Cloudflare Pages (frontend) + Cloudflare Workers (API)

The goal is to maintain a lightweight scheduling engine without running a traditional backend server.

---

# 🚀 Local Development

## Requirements

- Node 18+
- npm
- Wrangler CLI (Cloudflare Workers)
- Cloudflare account

---

## 1. Clone the Repository

```bash
git clone <repo-url>
cd closed-group-calendar
```

---

## 2. Install and Run Frontend

```bash
cd frontend
npm install
npm run serve
```

Frontend runs at:

```
http://localhost:8080
```

---

## 3. Run Worker API Locally

From project root:

```bash
wrangler dev
```

The Worker will run locally and connect to a local D1 instance.

API base URL (local):

```
http://localhost:8787/api/
```

---

# 🌐 Deployment Model

- Frontend is deployed via Cloudflare Pages
- API runs as a Cloudflare Worker
- Data is stored in Cloudflare D1

No traditional backend server is required.

---

# 🧱 Project Structure

```
frontend/          # Vue.js admin interface
worker/            # Cloudflare Worker API (Hono)
migrations/        # D1 SQL schema definitions
seed-data/         # Optional JSON seed data for import
wrangler.toml      # Worker configuration
README.md
```

---

# 🔌 API Layer (Cloudflare Worker + Hono)

The Worker exposes REST-style endpoints designed to match the original Django API shape in order to minimise frontend changes.

Base route:

```
/api/:language/
```

## Core Endpoints

- `GET /api/:language/`
  
  Returns all teachers, availability slots, courses, and sessions for a given language.

- `POST /api/:language/add-availability/`

- `POST /api/:language/update-availability/`

- `POST /api/:language/delete-availability/`

- `POST /api/:language/book/:teacherId`

- `POST /api/:language/update-course/:courseId`

- `POST /api/:language/delete-course/:courseId`
  
  Deletes a full course and all associated sessions.

Write endpoints may optionally be protected via a shared secret header.

---

# 🗄 Database (Cloudflare D1)

The application uses a relational schema equivalent to the previous JSON structure.

Core tables:

- `teachers`
- `availability_slots`
- `courses`
- `course_sessions`

The Worker assembles relational data into structured JSON responses for the frontend.

Availability validation logic remains primarily in the frontend for now, while the Worker acts as a data access layer.

---

# 🔄 Migration Background

This project originally used:

- Django backend
- JSON file storage per language

The current architecture replaces that layer with:

- A serverless API (Cloudflare Worker)
- A managed SQLite database (D1)

The migration prioritises:

- Maintaining existing frontend behaviour
- Preserving API shape
- Allowing incremental feature expansion
- Removing dependency on a continuously running backend server

---

# 🛠 Future Enhancements

- Basic authentication layer
- Role-based access control
- Database indexing optimisation
- More granular API endpoints (avoid full dataset loads)
- Course archival and reporting features

---

# 📌 Notes

This is an internal tool currently being iterated primarily by a single developer with oversight from a senior engineer. The architecture has been selected to balance simplicity, scalability, and low operational overhead.

The system is intentionally lightweight and modular to allow future restructuring if the project scope expands.

