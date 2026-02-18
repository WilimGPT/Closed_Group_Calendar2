# **📘 Scheduler MVP**

## **🧾 Summary**

This project is a lightweight Vue.js application for managing teacher availability and booking recurring language courses.  
 The system includes three main functions:

1. **Adding availability slots**

2. **Viewing and editing existing availability and courses**

3. **Generating and booking new courses**

The app communicates with a backend service that stores teachers, availability slots, and booked courses.

---

# **Quick Start (Local Development)**
Requirements:
- Python 3.11+
- Node 18+
- npm

**1. Clone the repo**
- git clone <repo-url>
- cd scheduler-mvp

**2. Backend Setup**
- cd backend
- python -m venv venv
- source venv/bin/activate   # Windows: venv\Scripts\activate
- pip install -r requirements.txt
- python manage.py runserver

Backend runs at:
- http://127.0.0.1:8000

**3. Frontend Setup**
In a new terminal:
- cd frontend
- npm install
- npm run serve

Frontend runs at:
- http://localhost:8080

---


# **Frontend**


## **🧱 Project Structure**

`src/`  
`│`  
`├── App.vue`  
`├── api.js`  
`├── timezones.js`  
`├── assets/`  
`│   └── global.css`  
`└── components/`  
    `├── AddAvailability.vue`  
    `├── AvailabilityChecker.vue`  
    `├── AvailabilityForm.vue`  
    `├── CourseForm.vue`  
    `└── ViewAvailability.vue`

---

## **🧩 Component Overview**

### **\#\#\# App.vue**

Acts as a simple switchboard between the 3 main screens:

* **AddAvailability**

* **ViewAvailability**

* **AvailabilityChecker**

No routing library is used; selecting a view renders the corresponding component.

---

## **AddAvailability.vue**

Allows an admin to:

* Select a language

* Select a teacher

* Create a new availability slot

It embeds **AvailabilityForm** in `"create"` mode.

**Backend interaction:**

* Retrieves teachers for the selected language

* Sends new availability slot data to the backend

---

## **ViewAvailability.vue**

Displays all availability and courses for a selected teacher, split into:

* **Active availability slots**

* **Future availability slots (clickable to edit)**

* **Current courses (read-only)**

* **Future courses (clickable to edit)**

Clicking an item opens either:

* **AvailabilityForm** in `"edit"` mode

* **CourseForm** in `"editMode"`

**Backend interaction:**

* Retrieves all teacher data: availability \+ bookings

* Sends updates or deletions for availability slots

* Sends updates to existing courses

---

## **AvailabilityChecker.vue**

Used to generate new courses before booking them.  
 The user selects:

* weekday

* start time

* start date

* session count

* duration

* time zone

* language

* group name

It generates a list of proposed class sessions and passes them into **CourseForm**.

**Backend interaction:**

* Retrieves teachers for availability checking

* Sends final new course booking data

---

## **AvailabilityForm.vue**

Reusable form for both creating and editing availability slots.

Features include:

* weekday selection

* start/end time

* start/end date

* timezone

* confirmation modal

* delete button in edit mode

**Emits events back to parent components:**

* `submit`

* `delete`

* `cancel`

No direct backend calls — the parent handles them.

---

## **CourseForm.vue**

A shared component used by both:

* **AvailabilityChecker** (to create new courses)

* **ViewAvailability** (to edit existing courses)

CourseForm handles:

* Displaying all generated or existing sessions

* Editing individual session dates/times

* Deleting sessions

* Checking each teacher’s availability

* Checking for booking conflicts

* Allowing the user to force-book despite conflicts

**Emits:**

* `save-course` — containing the full course payload

**Backend interaction:**  
 Handled by parent components:

* Creating a new course

* Updating an existing course

---

## **🗂 Utilities**

### **api.js**

Axios wrapper for all backend communication.

### **timezones.js**

List of supported time zones for use across components.


---

# **Backend (Django)**

This backend provides a lightweight JSON-file–based API used by the Vue frontend for managing **teacher availability** and **course scheduling**.  
 Each language (English, Spanish, German…) has its own JSON file stored in `backend/data/`.


---

## **📂 Project Structure**

`backend/`  
 `├── api/`  
 `│    ├── views.py       # All API endpoints`  
 `│    ├── urls.py        # API route definitions`  
 `│    └── data/`  
 `│         ├── english.json`  
 `│         ├── spanish.json`  
 `│         └── german.json`  
 `└── config/`  
      `├── settings.py`  
      `├── urls.py        # Includes api.urls under /api/`

---

## **🗂 Data Format (JSON)**

Each language file contains:

* `teachers`

  * `availabilitySlots`: repeating weekly availability ranges

  * `bookings`: confirmed courses with their generated sessions

  * `blockers`: holidays or unavailable periods

* `meta`

  * metadata such as default timezone or last update timestamp

---

## **🔌 API Endpoints**

All routes begin with:

`/api/<language>/`

### **1\. Get or overwrite the entire dataset**

`GET    /api/<language>/`  
`POST   /api/<language>/`

Used by the frontend to load all teachers, and to save the entire JSON file during development.

---

### **2\. Add a new availability slot**

`POST /api/<language>/add-availability/`

The frontend sends:

* teacherId

* a newly created slot (ID generated on frontend)

The backend appends the slot to that teacher.

---

### **3\. Update an existing availability slot**

`POST /api/<language>/update-availability/`

The frontend sends:

* teacherId

* slotId

* updated slot values

The backend finds the slot by ID and replaces its fields.

---

### **4\. Delete an availability slot**

`POST /api/<language>/delete-availability/`

Removes one slot by ID, without affecting other IDs.

---

### **5\. Create a new course (booking)**

`POST /api/<language>/book/<teacherId>`

The frontend sends:

* group name

* generated sessions

* duration \+ timezone

The backend:

* assigns a course ID

* assigns session IDs

* stores the booking under the teacher

---

### **6\. Update an existing future course**

`POST /api/<language>/update-course/<courseId>`

Used when editing future courses in the modal.  
 Updates duration, timezone, group name, and session list while keeping:

* the same course ID

* the same session IDs (unless the user deletes a session)

---

## **✔ No Database Required**

All data is stored in JSON, making the backend stateless and easy to reset.  
 This will later be replaced with proper Django models when needed.
