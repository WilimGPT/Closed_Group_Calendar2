Directory Map:
- README.MD
- start.sh
- frontend/jsconfig.json
- frontend/babel.config.js
- frontend/package.json
- frontend/vue.config.js
- frontend/public/favicon.ico
- frontend/public/index.html
- frontend/src/App.vue
- frontend/src/main.js
- frontend/src/timezones.js
- frontend/src/api.js
- frontend/src/components/ViewAvailability.vue
- frontend/src/components/AvailabilityChecker.vue
- frontend/src/components/AvailabilityForm.vue
- frontend/src/components/CourseForm.vue
- frontend/src/components/AddAvailability.vue
- frontend/src/assets/global.css
- backend/requirements.txt
- backend/db.sqlite3
- backend/manage.py
- backend/config/asgi.py
- backend/config/__init__.py
- backend/config/settings.py
- backend/config/urls.py
- backend/config/wsgi.py
- backend/api/models.py
- backend/api/__init__.py
- backend/api/apps.py
- backend/api/admin.py
- backend/api/tests.py
- backend/api/urls.py
- backend/api/views.py
- backend/api/migrations/__init__.py
- backend/api/migrations/__pycache__/__init__.cpython-312.pyc
- backend/api/__pycache__/views.cpython-312.pyc
- backend/api/__pycache__/urls.cpython-312.pyc
- backend/api/__pycache__/models.cpython-312.pyc
- backend/api/__pycache__/admin.cpython-312.pyc
- backend/api/__pycache__/__init__.cpython-312.pyc
- backend/data/JSON_STRUC.py
- backend/data/english_structure.json
- backend/data/german.json
- backend/data/spanish.json
- backend/data/english.json
- backend/data/HOURCOUNT.py
- venv/.DS_Store
- venv/pyvenv.cfg
- venv/bin/Activate.ps1
- venv/bin/python3
- venv/bin/pip3.12
- venv/bin/python
- venv/bin/pip3
- venv/bin/activate.fish
- venv/bin/sqlformat
- venv/bin/pip
- venv/bin/activate
- venv/bin/django-admin
- venv/bin/python3.12
- venv/bin/activate.csh
- venv/lib/.DS_Store
- venv/lib/python3.12/.DS_Store
- venv/lib/python3.12/site-packages/.DS_Store
- venv/lib/python3.12/site-packages/asgiref/sync.py
- venv/lib/python3.12/site-packages/asgiref/compatibility.py
- venv/lib/python3.12/site-packages/asgiref/server.py
- venv/lib/python3.12/site-packages/asgiref/local.py
- venv/lib/python3.12/site-packages/asgiref/current_thread_executor.py
- venv/lib/python3.12/site-packages/asgiref/timeout.py
- venv/lib/python3.12/site-packages/asgiref/__init__.py
- venv/lib/python3.12/site-packages/asgiref/py.typed
- venv/lib/python3.12/site-packages/asgiref/typing.py
- venv/lib/python3.12/site-packages/asgiref/testing.py
- venv/lib/python3.12/site-packages/asgiref/wsgi.py

---
README.MD:

# **📘 Scheduler MVP**

# **Frontend**

## **🧾 Summary**

This project is a lightweight Vue.js application for managing teacher availability and booking recurring language courses.  
 The system includes three main functions:

1. **Adding availability slots**

2. **Viewing and editing existing availability and courses**

3. **Generating and booking new courses**

The app communicates with a backend service that stores teachers, availability slots, and booked courses.

---

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


---
START.SH:

#!/bin/bash

echo "Activating Python virtual environment..."
source venv/bin/activate

echo "Starting Django backend..."
cd backend
python manage.py runserver &
BACK_PID=$!

echo "Starting Vue frontend..."
cd ../frontend
npm run serve &


open http://localhost:8080/
wait $BACK_PID

---
FRONTEND/JSCONFIG.JSON:

{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  }
}


---
FRONTEND/BABEL.CONFIG.JS:

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}


---
FRONTEND/PACKAGE.JSON:

{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  },
  "dependencies": {
    "@fortawesome/fontawesome-free": "^7.1.0",
    "axios": "^1.13.2",
    "core-js": "^3.8.3",
    "element-ui": "^2.15.14",
    "file-saver": "^2.0.5",
    "luxon": "^3.7.2",
    "tailwindcss": "^4.1.17",
    "vue": "^2.7.16"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "vue-template-compiler": "^2.6.14"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}


---
FRONTEND/VUE.CONFIG.JS:

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


---
FRONTEND/PUBLIC/FAVICON.ICO:

[Unable to decode file: likely binary]

---
FRONTEND/PUBLIC/INDEX.HTML:

<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>


---
FRONTEND/SRC/APP.VUE:

<template>
  <div class="app-wrapper">
    <h1>Scheduler MVP</h1>

    <div class="mb-4">
      <el-button type="primary" @click="view = 'add'">
        Add Availability
      </el-button>

      <el-button class="ml-2" @click="view = 'view'">
        View Availability
      </el-button>

      <el-button class="ml-2" type="success" @click="view = 'check'">
        Check Availability
      </el-button>
    </div>

    <div class="spacer-24"></div>

    <AddAvailability v-if="view === 'add'" />
    <ViewAvailability v-if="view === 'view'" />
    <AvailabilityChecker v-if="view === 'check'" />
  </div>
</template>

<script>
import AddAvailability from "./components/AddAvailability.vue"
import ViewAvailability from "./components/ViewAvailability.vue"
import AvailabilityChecker from "./components/AvailabilityChecker.vue"

export default {
  components: {
    AddAvailability,
    ViewAvailability,
    AvailabilityChecker
  },

  data() {
    return {
      view: null
    }
  }
}
</script>


---
FRONTEND/SRC/MAIN.JS:

import Vue from 'vue'
import App from './App.vue'

import './assets/global.css'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import locale from 'element-ui/lib/locale'
import lang from 'element-ui/lib/locale/lang/en'

import '@fortawesome/fontawesome-free/css/all.css'

locale.use(lang)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


---
FRONTEND/SRC/TIMEZONES.JS:

export default [
  "UTC",
  "Europe/Warsaw",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Madrid",
  "Europe/Paris",
  "Europe/Rome",
  "Europe/Lisbon",

  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",

  "Asia/Tokyo",
  "Asia/Seoul",
  "Asia/Singapore",
  "Asia/Shanghai",

  "Australia/Sydney"
]


---
FRONTEND/SRC/API.JS:

import axios from "axios"

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json"
  }
})

export default api


---
FRONTEND/SRC/COMPONENTS/VIEWAVAILABILITY.VUE:

<template>
  <div class="form-card wide">
    <h2>View Availability & Courses</h2>

    <!-- LANGUAGE SELECTOR -->
    <div class="form-row">
      <label>Language</label>
      <el-select v-model="language">
        <el-option label="English" value="english" />
        <el-option label="Spanish" value="spanish" />
        <el-option label="German" value="german" />
      </el-select>
    </div>

    <!-- TEACHER SELECTOR -->
    <div class="form-row" v-if="teachers.length">
      <label>Teacher</label>
      <el-select v-model="teacherId">
        <el-option
          v-for="t in teachers"
          :key="t.id"
          :label="t.name"
          :value="t.id"
        />
      </el-select>
    </div>

    <el-divider />

    <!-- MAIN TWO-COLUMN LAYOUT -->
    <div class="two-col" v-if="teacherId">

      <!-- ===================================
           LEFT COLUMN: AVAILABILITY
      ==================================== -->
      <div>
        <h3 class="mb-3">Active Availability Slots</h3>

        <div v-if="activeSlots.length">
          <div
            v-for="slot in activeSlots"
            :key="slot.id"
            class="slot-card"
          >
            <div><strong>Weekdays:</strong> {{ formatWeekdays(slot.weekdays) }}</div>
            <div><strong>Time:</strong> {{ slot.startTime }} – {{ slot.endTime }}</div>
            <div><strong>Valid:</strong> {{ slot.startDate }} → {{ slot.endDate }}</div>
            <div><strong>Time Zone:</strong> {{ slot.timeZone }}</div>
            <div><strong>Slot ID:</strong> {{ slot.id }}</div>
          </div>
        </div>

        <div v-else class="text-muted mb-4">
          No currently active availability slots.
        </div>

        <el-divider />

        <!-- FUTURE SLOTS (CLICKABLE TO EDIT) -->
        <h3 class="mb-3">Future Availability Slots</h3>

        <div v-if="futureSlots.length">
          <div
            v-for="slot in futureSlots"
            :key="slot.id"
            class="slot-card future clickable"
            @click="openEdit(slot)"
          >
            <div><strong>Weekdays:</strong> {{ formatWeekdays(slot.weekdays) }}</div>
            <div><strong>Time:</strong> {{ slot.startTime }} – {{ slot.endTime }}</div>
            <div><strong>Valid:</strong> {{ slot.startDate }} → {{ slot.endDate }}</div>
            <div><strong>Time Zone:</strong> {{ slot.timeZone }}</div>
            <div><strong>Slot ID:</strong> {{ slot.id }}</div>
            <small class="text-muted">(Click to edit)</small>
          </div>
        </div>

        <div v-else class="text-muted">
          No future availability slots.
        </div>
      </div>

      <!-- ===================================
           RIGHT COLUMN: COURSES
      ==================================== -->
      <div>
        <h3 class="mb-3">Current Courses</h3>

        <div v-if="currentCourses.length">
          <div
            v-for="course in currentCourses"
            :key="course.id"
            class="course-card clickable"
            @click="openCourseEditor(course)"
          >
            <div><strong>Group:</strong> {{ course.groupReference }}</div>
            <div><strong>Sessions:</strong></div>
            <ul>
              <li v-for="s in course.sessions" :key="s.id">
                {{ s.startDateTime }}
              </li>
            </ul>
            <small class="text-muted">(Click to edit)</small>
          </div>
        </div>


        <div v-else class="text-muted mb-4">
          No current courses.
        </div>

        <el-divider />

        <h3 class="mb-3">Future Courses</h3>

        <div v-if="futureCourses.length">
          <div
            v-for="course in futureCourses"
            :key="course.id"
            class="course-card future clickable"
            @click="openCourseEditor(course)"
          >
            <div><strong>Group:</strong> {{ course.groupReference }}</div>
            <div><strong>Sessions:</strong></div>
            <ul>
              <li v-for="s in course.sessions" :key="s.id">
                {{ s.startDateTime }}
              </li>
            </ul>
          </div>
        </div>

        <div v-else class="text-muted">
          No future courses.
        </div>

        <el-divider />

          <h3 class="mb-3">Past Courses</h3>

          <div v-if="pastCourses.length">
            <div
              v-for="course in pastCourses"
              :key="course.id"
              class="course-card clickable"
              @click="openCourseEditor(course)"
            >
              <div><strong>Group:</strong> {{ course.groupReference }}</div>
              <ul>
                <li v-for="s in course.sessions" :key="s.id">
                  {{ s.startDateTime }}
                </li>
              </ul>
              <small class="text-muted">(Click to edit)</small>
            </div>
          </div>

          <div v-else class="text-muted">
            No past courses.
          </div>


      </div>
    </div>

    <!-- ===================================
         EDIT AVAILABILITY MODAL
    ==================================== -->
    <el-dialog
      title="Edit Availability Slot"
      :visible.sync="showEditModal"
      width="480px"
    >
      <!-- Only render form once we have a selectedSlot -->
      <AvailabilityForm
        v-if="selectedSlot"
        :key="selectedSlot.id"
        mode="edit"
        :initialValue="selectedSlot"
        :teacherId="teacherId"
        :language="language"
        @submit="handleEditSubmit"
        @delete="handleEditDelete"
        @cancel="showEditModal = false"
      />
    </el-dialog>


    <!-- ===================================
        EDIT FUTURE COURSE MODAL
    =================================== -->
    <el-dialog
      title="Edit Course"
      :visible.sync="showCourseModal"
      width="80%"
    >

      <CourseForm
        v-if="selectedCourse"
        :key="selectedCourse.id"
        :editMode="true"
        :courseId="selectedCourse.id"
        :initialSessions="buildInitialSessions(selectedCourse)"
        :teachers="teachers"
        :language="language"
        :durationMinutes="selectedCourse.durationMinutes"
        :timeZone="selectedCourse.timeZone"
        @save-course="handleCourseSave"
      />

    </el-dialog>



  </div>
</template>

<script>
import api from "../api"
import AvailabilityForm from "./AvailabilityForm.vue"
import CourseForm from "./CourseForm.vue"
import { DateTime } from "luxon"


export default {
  components: { 
    AvailabilityForm,
    CourseForm
  },

  data() {
    return {
      language: "english",
      teachers: [],
      teacherId: "",

      activeSlots: [],
      futureSlots: [],
      currentCourses: [],
      futureCourses: [],
      pastCourses: [],

      // For edit modal
      showEditModal: false,
      selectedSlot: null,
      showCourseModal: false,
      selectedCourse: null,

      // Luxon weekday model: 1 = Monday ... 7 = Sunday
      weekdayNames: {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        7: "Sunday"
      }
    }
  },

  watch: {
    language() { this.loadTeachers() },
    teacherId() { this.filterAll() }
  },

  mounted() {
    this.loadTeachers()
  },

  methods: {
    /** Fetch teachers for selected language */
    async loadTeachers() {
      const res = await api.get(this.language)
      this.teachers = res.data.teachers

      this.teacherId = ""
      this.activeSlots = []
      this.futureSlots = []
      this.currentCourses = []
      this.futureCourses = []
      this.selectedSlot = null
      this.showEditModal = false
    },

    openCourseEditor(course) {
      // Deep clone so CourseForm can mutate safely
      this.selectedCourse = JSON.parse(JSON.stringify(course))
      this.showCourseModal = true
    },

    buildInitialSessions(course) {
      return course.sessions.map(s => ({
        id: s.id,
        localDateTime: DateTime.fromISO(s.startDateTime, { zone: course.timeZone }),
        utcDateTime: DateTime.fromISO(s.startDateTime, { zone: course.timeZone }).toUTC()
      }))
    },


    async handleCourseSave(payload) {
      try {
        // clean payload sent to backend
        const cleanPayload = {
          teacherId: payload.teacherId,
          groupReference: payload.groupReference,
          timeZone: payload.timeZone,
          durationMinutes: payload.durationMinutes,
          sessions: payload.sessions.map(s => ({
            id: s.id,
            startDateTime: s.startDateTime || s.localDateTime.toISO({ suppressSeconds: true, suppressMilliseconds: true })
          }))
        }

        await api.post(`${this.language}/update-course/${payload.id}`, cleanPayload)

        this.$message.success("Course updated successfully!")
      } catch (err) {
        console.error(err)
        this.$message.error("Failed to update course.")
      }

      this.showCourseModal = false;

      await this.loadTeachers();
      if (this.teacherId) this.filterAll();
    },



    /** Convert [1,2,3] → "Mon, Tue, Wed" */
    formatWeekdays(arr) {
      if (!Array.isArray(arr)) return "–"
      return arr.map(w => this.weekdayNames[w]).join(", ")
    },

    /** Filter availability and courses for current teacher */
    filterAll() {
      const teacher = this.teachers.find(t => t.id === this.teacherId)
      if (!teacher) return

      const today = new Date().toISOString().slice(0, 10)

      // AVAILABILITY
      const validSlots = teacher.availabilitySlots.filter(
        s => s.endDate >= today
      )

      this.activeSlots = validSlots.filter(
        s => s.startDate <= today
      )

      this.futureSlots = validSlots.filter(
        s => s.startDate > today
      )

      // COURSES
      const allCourses = teacher.bookings || []

      this.currentCourses = allCourses.filter(course => {
        const dates = course.sessions.map(s => s.startDateTime.slice(0, 10))
        const first = dates.reduce((a, b) => (a < b ? a : b))
        const last  = dates.reduce((a, b) => (a > b ? a : b))
        return first <= today && last >= today
      })

      this.futureCourses = allCourses.filter(course => {
        const dates = course.sessions.map(s => s.startDateTime.slice(0, 10))
        const first = dates.reduce((a, b) => (a < b ? a : b))
        return first > today
      })

      this.pastCourses = allCourses.filter(course => {
        const dates = course.sessions.map(s => s.startDateTime.slice(0, 10))
        const last = dates.reduce((a, b) => (a > b ? a : b))
        return last < today
      })
    },

    /** Open edit modal for a selected future slot */
    openEdit(slot) {
      this.selectedSlot = { ...slot } // shallow clone
      this.showEditModal = true
    },

    /** Handle save from AvailabilityForm (EDIT) */
    async handleEditSubmit(updatedPayload) {
      try {
        await api.post(`${this.language}/update-availability/`, {
          teacherId: this.teacherId,
          slotId: this.selectedSlot.id,
          updatedSlot: updatedPayload
        })

        this.$message.success("Availability updated.")
      } catch (err) {
        console.error(err)
        this.$message.error("Failed to update availability.")
      }

      this.showEditModal = false
      await this.loadTeachers()
      if (this.teacherId) this.filterAll()
    },


    /** Handle delete from AvailabilityForm */
    async handleEditDelete() {
      try {
        await api.post(`${this.language}/delete-availability/`, {
          teacherId: this.teacherId,
          slotId: this.selectedSlot.id
        })

        this.$message.success("Availability deleted.")
      } catch (err) {
        console.error(err)
        this.$message.error("Failed to delete slot.")
      }

      this.showEditModal = false
      await this.loadTeachers()
      if (this.teacherId) this.filterAll()
    }

  }
}
</script>

<style scoped>
.form-card.wide {
  max-width: 1100px;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.slot-card,
.course-card {
  background: #f5f8ff;
  border: 1px solid #dbe4ff;
  border-radius: 6px;
  padding: 12px 14px;
  margin-bottom: 10px;
  font-size: 13px;
}

.slot-card.future,
.course-card.future {
  background: #f7fff5;
  border-color: #cfe9d6;
}

.clickable {
  cursor: pointer;
}

.clickable:hover {
  background: #eaf7ff;
}

.course-card ul {
  padding-left: 18px;
  margin: 6px 0 0;
}

.text-muted {
  color: #888;
}
</style>


---
FRONTEND/SRC/COMPONENTS/AVAILABILITYCHECKER.VUE:

<template>
  <div class="form-card wide">
    <h2>Availability Checker</h2>

    <!-- INPUTS -->
    <div class="checker-grid">

      <div class="form-row">
        <label>Language</label>
        <el-select v-model="language">
          <el-option label="English" value="english" />
          <el-option label="Spanish" value="spanish" />
          <el-option label="German" value="german" />
        </el-select>
      </div>

      <div class="form-row">
        <label>Weekday</label>
        <el-select v-model="weekday">
          <el-option
            v-for="d in weekdays"
            :key="d.id"
            :label="d.label"
            :value="d.id"
          />
        </el-select>
      </div>

      <div class="form-row">
        <label>Start Time</label>
        <el-time-picker v-model="startTime" format="HH:mm" />
      </div>

      <div class="form-row">
        <label>Start Date</label>
        <el-date-picker v-model="startDate" type="date" />
      </div>

      <div class="form-row">
        <label>Sessions</label>
        <el-input-number v-model="sessionCount" :min="1" />
      </div>

      <div class="form-row">
        <label>Duration (min)</label>
        <el-input-number v-model="durationMinutes" :min="15" :step="15" />
      </div>

      <div class="form-row">
        <label>Time Zone</label>
        <el-select v-model="timeZone" filterable>
          <el-option
            v-for="tz in timezones"
            :key="tz"
            :label="tz"
            :value="tz"
          />
        </el-select>
      </div>
    </div>

    <el-button type="primary" class="mt-4" @click="runCheck">
      Generate & Check
    </el-button>

    <!-- COURSE FORM -->
    <CourseForm
      v-if="generatedSessions.length"
      :key="formKey"
      :initialSessions="generatedSessions"
      :teachers="teachers"
      :language="language"
      :durationMinutes="durationMinutes"
      :timeZone="timeZone"
      @save-course="submitCourse"
    />
  </div>
</template>

<script>
import api from "../api"
import timezones from "../timezones"
import { DateTime } from "luxon"

import CourseForm from "./CourseForm.vue"

export default {
  components: { CourseForm },

  data() {
    return {
      language: "english",

      weekday: 1,
      weekdays: [
        { id: 1, label: "Monday" },
        { id: 2, label: "Tuesday" },
        { id: 3, label: "Wednesday" },
        { id: 4, label: "Thursday" },
        { id: 5, label: "Friday" },
        { id: 6, label: "Saturday" },
        { id: 7, label: "Sunday" },
      ],

      startTime: null,
      startDate: null,
      sessionCount: 4,
      durationMinutes: 60,
      timeZone: "Europe/Warsaw",
      groupReference: "",

      teachers: [],
      generatedSessions: [],
      formKey: 0,

      timezones
    }
  },

  methods: {
    async runCheck() {
      const res = await api.get(this.language)
      this.teachers = res.data.teachers

      this.generatedSessions = this.generateSessions()

      this.formKey++ // force full reset
    },

    generateSessions() {
      const out = []
      if (!this.startDate || !this.startTime) return []

      const startISO =
        DateTime.fromJSDate(this.startDate).toISODate() +
        "T" +
        DateTime.fromJSDate(this.startTime).toFormat("HH:mm")

      let cursor = DateTime.fromISO(startISO, { zone: this.timeZone })
      let count = 0

      while (count < this.sessionCount) {
        if (cursor.weekday === this.weekday) {
          const local = cursor
          const utc = cursor.toUTC()

          out.push({
            localDateTime: DateTime.fromISO(local.toISO(), { zone: this.timeZone }),
            utcDateTime: DateTime.fromISO(utc.toISO(), { zone: "utc" }),
            localLabel: local.toFormat("yyyy-MM-dd HH:mm"),
            utcLabel: utc.toFormat("yyyy-MM-dd HH:mm"),
            isCustom: false
          })

          count++
        }

        cursor = cursor.plus({ days: 1 })
      }

      return out
    },

    async submitCourse(payload) {
      try {
        const cleanPayload = {
          teacherId: payload.teacherId,
          groupReference: payload.groupReference,
          timeZone: payload.timeZone,
          durationMinutes: payload.durationMinutes,

          sessions: payload.sessions.map(s => {
            // Use startDateTime if localDateTime is not present
            const raw = s.startDateTime || s.localDateTime

            const dt = DateTime.fromISO(raw)

            if (!dt.isValid) {
              console.error("Broken session detected:", s)
              throw new Error("Invalid session date")
            }

            return {
              id: s.id,
              startDateTime: dt.toISO({
                suppressSeconds: true,
                suppressMilliseconds: true
              })
            }
          })
        }

        await api.post(`${this.language}/book/${payload.teacherId}`, cleanPayload)

        this.$message.success("Course booked successfully!")
      } catch (err) {
        console.error(err)
        this.$message.error("Failed to save course.")
      }
    }



  }
}
</script>

<style scoped>
.checker-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.form-card.wide {
  max-width: 1350px;
  width: 100%;
  margin: 0 auto;
}
</style>


---
FRONTEND/SRC/COMPONENTS/AVAILABILITYFORM.VUE:

<template>
  <div class="availability-form">

    <!-- ---------- TITLE ---------- -->
    <h3>{{ mode === 'edit' ? 'Edit Availability' : 'Add Availability' }}</h3>

    <!-- ---------- WEEKDAY BUTTONS ---------- -->
    <div class="form-row">
      <label>Weekdays</label>
      <div class="weekday-buttons">
        <button
          v-for="w in weekdayOptions"
          :key="w.value"
          :class="['weekday-btn', form.weekdays.includes(w.value) ? 'selected' : '']"
          @click="toggleWeekday(w.value)"
        >
          {{ w.label }}
        </button>
      </div>
    </div>

    <!-- ---------- TIME PICKERS ---------- -->
    <div class="form-row-group">
      <div>
        <label>Start Time</label>
        <el-time-picker v-model="form.startTime" format="HH:mm" />
      </div>
      <div>
        <label>End Time</label>
        <el-time-picker v-model="form.endTime" format="HH:mm" />
      </div>
    </div>

    <!-- ---------- DATE PICKERS ---------- -->
    <div class="form-row-group">
      <div>
        <label>Start Date</label>
        <el-date-picker v-model="form.startDate" type="date" />
      </div>
      <div>
        <label>End Date</label>
        <el-date-picker v-model="form.endDate" type="date" />
      </div>
    </div>

    <!-- ---------- TIME ZONE ---------- -->
    <div class="form-row">
      <label>Time Zone</label>
      <el-select v-model="form.timeZone" filterable>
        <el-option
          v-for="tz in timezones"
          :key="tz"
          :label="tz"
          :value="tz"
        />
      </el-select>
    </div>

    <!-- ---------- ACTION BUTTONS ---------- -->
    <div class="action-row">

      <el-button @click="$emit('cancel')">
        Cancel
      </el-button>

      <el-button
        type="danger"
        v-if="mode === 'edit'"
        @click="confirmDelete"
      >
        Delete Slot
      </el-button>

      <el-button type="primary" @click="confirmSubmit">
        {{ mode === 'edit' ? 'Confirm Changes' : 'Create Slot' }}
      </el-button>

    </div>

    <!-- ---------- CONFIRMATION MODAL ---------- -->
    <el-dialog
      title="Confirm Update"
      :visible.sync="showConfirmModal"
      width="400px"
    >
      <p>
        {{ confirmMessage }}
      </p>

      <div style="text-align: right; margin-top: 20px;">
        <el-button @click="showConfirmModal = false">Cancel</el-button>
        <el-button type="primary" @click="executeConfirmed">
          OK
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import timezones from "../timezones"

export default {
  props: {
    mode: { type: String, default: "create" }, // "create" | "edit"
    initialValue: { type: Object, default: null }, // slot when editing
    teacherId: String,
    language: String
  },

  data() {
    return {
      // Internal form state
      form: {
        weekdays: [],
        startTime: null,
        endTime: null,
        startDate: null,
        endDate: null,
        timeZone: "Europe/Warsaw"
      },

      timezones,
      showConfirmModal: false,
      confirmAction: null, // "submit" or "delete"
      confirmMessage: ""
    }
  },

  computed: {
    // Luxon weekday mapping: 1=Mon ... 7=Sun
    weekdayOptions() {
      return [
        { value: 1, label: "Mon" },
        { value: 2, label: "Tue" },
        { value: 3, label: "Wed" },
        { value: 4, label: "Thu" },
        { value: 5, label: "Fri" },
        { value: 6, label: "Sat" },
        { value: 7, label: "Sun" }
      ]
    }
  },

  mounted() {
    if (this.mode === "edit" && this.initialValue) {
      this.preloadForm()
    }
  },

  methods: {
    /** --------------------------------------
     * Preload form values when editing
     * -------------------------------------- */
    preloadForm() {
      this.form.weekdays = [...this.initialValue.weekdays]
      this.form.startTime = new Date(`1970-01-01T${this.initialValue.startTime}`)
      this.form.endTime = new Date(`1970-01-01T${this.initialValue.endTime}`)
      this.form.startDate = new Date(this.initialValue.startDate)
      this.form.endDate = new Date(this.initialValue.endDate)
      this.form.timeZone = this.initialValue.timeZone
    },

    /** Toggle weekday in array */
    toggleWeekday(day) {
      if (this.form.weekdays.includes(day)) {
        this.form.weekdays = this.form.weekdays.filter(d => d !== day)
      } else {
        this.form.weekdays.push(day)
      }
    },

    /** Validate inputs */
    validate() {
      if (!this.form.weekdays.length) return "Select at least one weekday."
      if (!this.form.startDate || !this.form.endDate) return "Enter start and end dates."
      if (!this.form.startTime || !this.form.endTime) return "Enter start and end times."
      return null
    },

    /** Ask for confirmation before applying */
    confirmSubmit() {
      const error = this.validate()
      if (error) {
        this.$message.error(error)
        return
      }

      this.confirmMessage =
        this.mode === "edit"
          ? "Save changes to this availability slot?"
          : "Create this new availability slot?"

      this.confirmAction = "submit"
      this.showConfirmModal = true
    },

    confirmDelete() {
      this.confirmMessage = "Are you sure you want to delete this availability slot?"
      this.confirmAction = "delete"
      this.showConfirmModal = true
    },

    /** Execute whichever action was confirmed */
    executeConfirmed() {
      this.showConfirmModal = false

      // Prepare clean slot payload
      const payload = {
        weekdays: [...this.form.weekdays],
        startTime: this.formatTime(this.form.startTime),
        endTime: this.formatTime(this.form.endTime),
        startDate: this.formatDate(this.form.startDate),
        endDate: this.formatDate(this.form.endDate),
        timeZone: this.form.timeZone
      }

      if (this.confirmAction === "submit") {
        this.$emit("submit", payload)
      } else if (this.confirmAction === "delete") {
        this.$emit("delete")
      }
    },

    formatDate(d) {
      return new Date(d).toISOString().slice(0, 10)
    },

    formatTime(t) {
      return new Date(t).toTimeString().slice(0, 5)
    }
  }
}
</script>

<style scoped>
.weekday-buttons {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.weekday-btn {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: #fafafa;
  border-radius: 4px;
  cursor: pointer;
}
.weekday-btn.selected {
  background: #4b8dff;
  color: white;
}
.action-row {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>


---
FRONTEND/SRC/COMPONENTS/COURSEFORM.VUE:

<template>
  <div class="course-form">

    <!-- HEADER -->
    <h3 v-if="editMode">Edit Course</h3>
    <h3 v-else>Create Course</h3>

    <!-- GROUP REFERENCE INPUT -->
    <div class="form-row" style="margin-bottom: 16px;">
      <label>Group Reference</label>
      <el-input v-model="form.groupReference" placeholder="Enter group name" />
    </div>

    <!-- RESULTS TABLE -->
    <div v-if="results.length" class="mt-6 table-wrapper">
      <table class="availability-table">

        <!-- HEADER -->
        <thead>
          <tr>
            <th>Session ({{ timeZone }} / UTC)</th>
            <th v-for="t in teachers" :key="t.id">{{ t.name }}</th>
            <th>Delete</th>
          </tr>
        </thead>

        <!-- ROWS -->
        <tbody>
          <tr v-for="(row, i) in results" :key="i">
            <td class="session-cell" @click="openEditor(i)">
              {{ row.local }}
              <br />
              <small class="text-muted">{{ row.utc }}</small>
            </td>

            <td
              v-for="cell in row.statuses"
              :key="cell.teacherId"
              :class="cell.ok ? 'status-ok' : 'status-bad'"
            >
              {{ cell.message }}
            </td>

            <!-- DELETE BUTTON -->
            <td class="delete-cell">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="confirmDelete(i)"
              />
            </td>
          </tr>
        </tbody>

        <!-- ACTION ROW -->
        <tfoot>
          <tr>
            <td><strong>Actions</strong></td>

            <td
              v-for="t in teachers"
              :key="'action-' + t.id"
              class="action-cell"
            >
              <el-button
                type="primary"
                size="mini"
                :disabled="!form.groupReference.trim()"
                @click="attemptBooking(t)"
              >
                {{ editMode ? "Save Changes" : "Book Course" }}
              </el-button>
            </td>

            <td></td>
          </tr>
        </tfoot>

      </table>
    </div>

    <!-- EDIT SESSION MODAL -->
    <el-dialog title="Edit Session" :visible="editingIndex !== null" width="400px">
      <div class="form-row">
        <label>Date</label>
        <el-date-picker v-model="editDate" type="date" />
      </div>

      <div class="form-row">
        <label>Time</label>
        <el-time-picker v-model="editTime" format="HH:mm" />
      </div>

      <div class="dialog-buttons">
        <el-button @click="editingIndex = null">Cancel</el-button>
        <el-button type="primary" @click="saveEdit">OK</el-button>
      </div>
    </el-dialog>

    <!-- DELETE CONFIRM -->
    <el-dialog
      title="Confirm Delete"
      :visible.sync="showDeleteModal"
      width="400px"
    >
      <p>Are you sure you want to delete this session?</p>

      <div class="dialog-buttons">
        <el-button @click="showDeleteModal = false">Cancel</el-button>
        <el-button type="danger" @click="deleteSession">Delete</el-button>
      </div>
    </el-dialog>

    <!-- BOOKING CONFLICT MODAL -->
    <el-dialog
      title="Booking Conflicts Detected"
      :visible.sync="showConflictModal"
      width="400px"
    >
      <p>
        Some sessions conflict with availability or existing bookings.
        Do you want to proceed anyway?
      </p>

      <div class="dialog-buttons">
        <el-button @click="showConflictModal = false">Cancel</el-button>
        <el-button type="danger" @click="forceBooking">Confirm Anyway</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { DateTime } from "luxon"

export default {
  props: {
    initialSessions: Array,
    teachers: Array,
    language: String,
    durationMinutes: Number,
    timeZone: String,
    courseId: { type: String, default: null },
    editMode: Boolean
  },

  data() {
    return {
      // Includes groupReference now
      form: {
        groupReference: "",    // ← NEW source of truth
      },

      sessions: [],
      results: [],

      editingIndex: null,
      editDate: null,
      editTime: null,

      showDeleteModal: false,
      deleteIndex: null,

      showConflictModal: false,
      pendingTeacher: null
    }
  },

  mounted() {
    this.sessions = this.initialSessions.map(s => ({
      ...s,
      localDateTime: s.localDateTime,
      utcDateTime: s.utcDateTime
    }))

    // Preload when editing
    if (this.editMode) {
      const teacher = this.teachers?.[0] // parent ensures correct teacher list
      const booking = teacher?.bookings?.find(b => b.id === this.courseId)
      if (booking) {
        this.form.groupReference = booking.groupReference || ""
      }
    }

    this.recheck()
  },

  methods: {
    //---------------------------------------------------------------------
    // Availability Checking
    //---------------------------------------------------------------------
    recheck() {
      this.results = this.sessions.map(session => {
        const statuses = this.teachers.map(t =>
          this.checkTeacher(t, session)
        )

        return {
          local: session.localDateTime.toFormat("yyyy-MM-dd HH:mm"),
          utc: session.utcDateTime.toFormat("yyyy-MM-dd HH:mm"),
          statuses
        }
      })
    },

    //---------------------------------------------------------------------
    // Teacher Availability Logic
    //---------------------------------------------------------------------
    checkTeacher(teacher, session) {
      const sessionUTC = session.utcDateTime
      const endUTC = sessionUTC.plus({ minutes: this.durationMinutes })

      const hasAvailability = teacher.availabilitySlots.some(slot => {
        const weekdaysArray = Array.isArray(slot.weekdays)
          ? slot.weekdays
          : [slot.weekday]

        const slotLocalMoment = sessionUTC.setZone(slot.timeZone)
        const slotDateISO = slotLocalMoment.toISODate()

        const slotStart = DateTime.fromISO(`${slotDateISO}T${slot.startTime}`, { zone: slot.timeZone }).toUTC()
        const slotEnd   = DateTime.fromISO(`${slotDateISO}T${slot.endTime}`,   { zone: slot.timeZone }).toUTC()

        return (
          weekdaysArray.includes(slotLocalMoment.weekday) &&
          sessionUTC >= slotStart &&
          endUTC <= slotEnd &&
          slot.startDate <= slotDateISO &&
          slot.endDate >= slotDateISO
        )
      })

      if (!hasAvailability) {
        return { teacherId: teacher.id, ok: false, message: "Outside availability" }
      }

      const isBooked = teacher.bookings.some(b =>
        b.sessions.some(s => {
          // 1. Parse start time *in booking’s timezone*
          const bookingLocal = DateTime.fromISO(s.startDateTime, { zone: b.timeZone })

          // 2. Convert to UTC
          const bookingUTC = bookingLocal.toUTC()

          // 3. Compare normalised UTC millis
          return bookingUTC.toMillis() === session.utcDateTime.toMillis()
        })
      )


      if (isBooked) {
        return { teacherId: teacher.id, ok: false, message: "Already booked" }
      }

      return { teacherId: teacher.id, ok: true, message: "Available" }
    },

    //---------------------------------------------------------------------
    // Edit Session
    //---------------------------------------------------------------------
    openEditor(i) {
      const s = this.sessions[i]
      this.editingIndex = i
      this.editDate = s.localDateTime.toJSDate()
      this.editTime = s.localDateTime.toJSDate()
    },

    saveEdit() {
      const s = this.sessions[this.editingIndex]

      const newLocal = DateTime.fromJSDate(this.editDate)
        .set({
          hour: DateTime.fromJSDate(this.editTime).hour,
          minute: DateTime.fromJSDate(this.editTime).minute
        })
        .setZone(this.timeZone)

      s.localDateTime = newLocal
      s.utcDateTime   = newLocal.toUTC()

      this.recheck()
      this.editingIndex = null
    },

    //---------------------------------------------------------------------
    // Delete Session
    //---------------------------------------------------------------------
    confirmDelete(i) {
      this.deleteIndex = i
      this.showDeleteModal = true
    },

    deleteSession() {
      this.sessions.splice(this.deleteIndex, 1)
      this.recheck()
      this.showDeleteModal = false
      this.deleteIndex = null
    },

    //---------------------------------------------------------------------
    // Booking Actions
    //---------------------------------------------------------------------
    attemptBooking(teacher) {
      const index = this.teachers.findIndex(t => t.id === teacher.id)
      const fullOK = this.results.every(r => r.statuses[index].ok)

      if (fullOK) {
        this.commitBooking(teacher)
      } else {
        this.pendingTeacher = teacher
        this.showConflictModal = true
      }
    },

    forceBooking() {
      this.commitBooking(this.pendingTeacher)
      this.showConflictModal = false
    },

    //---------------------------------------------------------------------
    // Emit course to parent
    //---------------------------------------------------------------------
    commitBooking(teacher) {
      const payload = {
        id: this.editMode ? this.courseId : null,
        teacherId: teacher.id,
        language: this.language,
        groupReference: this.form.groupReference,   // ← NOW SOURCE OF TRUTH
        durationMinutes: this.durationMinutes,
        timeZone: this.timeZone,

        sessions: this.sessions.map((s, i) => {
          if (!s.localDateTime) {
            this.$message.error("Internal error: session has no date/time.")
            console.error("Broken session:", s)
            return null
          }

          return {
            id: this.editMode ? s.id : `course_s${i + 1}`,
            startDateTime: (
              typeof s.localDateTime === "string"
                ? DateTime.fromISO(s.localDateTime)
                : s.localDateTime
            ).toISO()
          }
        }).filter(Boolean)
      }

      this.$emit("save-course", payload)
    }
  }
}
</script>

<style scoped>

</style>


---
FRONTEND/SRC/COMPONENTS/ADDAVAILABILITY.VUE:

<template>
  <div class="form-card">
    <h2>Add Availability</h2>

    <!-- Select Language -->
    <div class="form-row">
      <label>Language</label>
      <el-select v-model="language">
        <el-option label="English" value="english" />
        <el-option label="Spanish" value="spanish" />
        <el-option label="German" value="german" />
      </el-select>
    </div>

    <!-- Select Teacher -->
    <div class="form-row" v-if="teachers.length">
      <label>Teacher</label>
      <el-select v-model="teacherId">
        <el-option
          v-for="t in teachers"
          :key="t.id"
          :label="t.name"
          :value="t.id"
        />
      </el-select>
    </div>

    <!-- Availability Form (Create Mode) -->
    <availability-form
      v-if="teacherId"
      mode="create"
      :teacher-id="teacherId"
      :language="language"
      @submit="saveSlot"
      @cancel="resetForm"
    />
  </div>
</template>

<script>
import api from "../api"
import AvailabilityForm from "./AvailabilityForm.vue"

export default {
  components: { AvailabilityForm },

  data() {
    return {
      language: "english",
      teachers: [],
      teacherId: ""
    }
  },

  watch: {
    language() {
      this.loadTeachers()
    }
  },

  mounted() {
    this.loadTeachers()
  },

  methods: {
    async loadTeachers() {
      const res = await api.get(this.language)
      this.teachers = res.data.teachers
      this.teacherId = ""
    },

    async saveSlot(slotPayload) {
      const teacher = this.teachers.find(t => t.id === this.teacherId)
      const nextIndex = teacher.availabilitySlots.length + 1
      const slotId = `${this.teacherId}_a${nextIndex}`

      const finalPayload = {
            id: slotId,
            weekdays: slotPayload.weekdays,
            startTime: slotPayload.startTime,
            endTime: slotPayload.endTime,
            startDate: slotPayload.startDate,
            endDate: slotPayload.endDate,
            timeZone: slotPayload.timeZone
        }

      await api.post(`${this.language}/add-availability/`, {
        teacherId: this.teacherId,
        slot: finalPayload
      })

      this.$message.success("Availability saved.")
      this.resetForm()
    },

    resetForm() {
      this.teacherId = ""
    }
  }
}
</script>


---
FRONTEND/SRC/ASSETS/GLOBAL.CSS:

/* ========== GLOBAL RESET ========== */

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background: #f6f7fb;
  color: #2c2c2c;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 15px;
}

/* ========== PAGE WRAPPER ========== */

.app-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 40px 60px;
}

/* ========== HEADINGS ========== */

h1 {
  font-size: 26px;
  margin-bottom: 20px;
  font-weight: 600;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: 600;
}

/* ========== FORM LAYOUT ========== */

.form-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 28px 32px 32px;
  max-width: 620px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

.form-row {
  margin-bottom: 16px;
}

.form-row label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #555;
  margin-bottom: 6px;
}

/* Time + date row groups */

.form-row-group {
  display: flex;
  gap: 16px;
}

.form-row-group > div {
  flex: 1;
}

/* ========== BUTTONS ========== */

.el-button {
  border-radius: 6px;
  font-weight: 500;
}

.el-button + .el-button {
  margin-left: 10px;
}

/* ========== TABLES (for later) ========== */

.table-wrapper {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  font-weight: 600;
  padding: 10px 12px;
  border-bottom: 2px solid #e5e7eb;
  font-size: 13px;
  color: #444;
}

td {
  padding: 10px 12px;
  border-bottom: 1px solid #eceef3;
  font-size: 14px;
}

.status-ok {
  color: #1e9f55;
  font-weight: 600;
}

.status-bad {
  color: #d9342b;
  font-weight: 600;
}

/* ========== SMALL UTILS ========== */

.spacer-24 {
  height: 24px;
}


---
BACKEND/REQUIREMENTS.TXT:

asgiref==3.11.0
Django==6.0
django-cors-headers==4.9.0
sqlparse==0.5.4
gunicorn

---
BACKEND/DB.SQLITE3:



---
BACKEND/MANAGE.PY:

#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()


---
BACKEND/CONFIG/ASGI.PY:

"""
ASGI config for config project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = get_asgi_application()


---
BACKEND/CONFIG/__INIT__.PY:



---
BACKEND/CONFIG/SETTINGS.PY:

"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 6.0.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/6.0/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/6.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-7r_&kqwy+b60nx)8j$2kgt92^!izpv2%13jowgh!t^uxk^s_u('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    "closed-group-calendar.onrender.com",
    "localhost",
    "127.0.0.1",
]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'corsheaders',
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/6.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/6.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/6.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/6.0/howto/static-files/

STATIC_URL = 'static/'

CORS_ALLOW_ALL_ORIGINS = True

---
BACKEND/CONFIG/URLS.PY:

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]


---
BACKEND/CONFIG/WSGI.PY:

"""
WSGI config for config project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = get_wsgi_application()


---
BACKEND/API/MODELS.PY:

from django.db import models

# Create your models here.


---
BACKEND/API/__INIT__.PY:



---
BACKEND/API/APPS.PY:

from django.apps import AppConfig


class ApiConfig(AppConfig):
    name = 'api'


---
BACKEND/API/ADMIN.PY:

from django.contrib import admin

# Register your models here.


---
BACKEND/API/TESTS.PY:

from django.test import TestCase

# Create your tests here.


---
BACKEND/API/URLS.PY:

from django.urls import path
from .views import (
    language_data,
    add_availability,
    update_availability,
    delete_availability,
    book_course,
    update_course
)

urlpatterns = [
    path("<str:language>/", language_data),

    # Availability CRUD
    path("<str:language>/add-availability/", add_availability),
    path("<str:language>/update-availability/", update_availability),
    path("<str:language>/delete-availability/", delete_availability),

    # Course CRUD
    path("<str:language>/book/<str:teacherId>", book_course),
    path("<str:language>/update-course/<str:courseId>", update_course),
]


---
BACKEND/API/VIEWS.PY:

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')


def get_language_file(language):
    return os.path.join(DATA_DIR, f"{language}.json")


@csrf_exempt
@require_http_methods(["GET", "POST"])
def language_data(request, language):
    file_path = get_language_file(language)

    if not os.path.exists(file_path):
        return JsonResponse({"error": "Language not found"}, status=404)

    if request.method == "GET":
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        try:
            body = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(body, f, indent=2)

        return JsonResponse({"status": "saved"})


@csrf_exempt
@require_http_methods(["POST"])
def add_availability(request, language):
    file_path = get_language_file(language)

    if not os.path.exists(file_path):
        return JsonResponse({"error": "Language not found"}, status=404)

    try:
        body = json.loads(request.body.decode("utf-8"))
        teacher_id = body["teacherId"]
        slot = body["slot"]
    except Exception:
        return JsonResponse({"error": "Invalid payload"}, status=400)

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    teacher = next((t for t in data["teachers"] if t["id"] == teacher_id), None)

    if not teacher:
        return JsonResponse({"error": "Teacher not found"}, status=404)

    teacher["availabilitySlots"].append(slot)

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return JsonResponse({"status": "availability added"})


@csrf_exempt
@require_http_methods(["POST"])
def update_availability(request, language):
    file_path = get_language_file(language)

    try:
        body = json.loads(request.body.decode("utf-8"))
        teacher_id = body["teacherId"]
        slot_id = body["slotId"]
        updated_slot = body["updatedSlot"]
    except Exception:
        return JsonResponse({"error": "Invalid payload"}, status=400)

    if not os.path.exists(file_path):
        return JsonResponse({"error": "Language not found"}, status=404)

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    teacher = next((t for t in data["teachers"] if t["id"] == teacher_id), None)
    if not teacher:
        return JsonResponse({"error": "Teacher not found"}, status=404)

    slot = next((s for s in teacher["availabilitySlots"] if s["id"] == slot_id), None)
    if not slot:
        return JsonResponse({"error": "Slot not found"}, status=404)

    # Keep ID stable
    updated_slot["id"] = slot_id
    teacher["availabilitySlots"] = [
        updated_slot if s["id"] == slot_id else s for s in teacher["availabilitySlots"]
    ]

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return JsonResponse({"status": "availability updated"})


@csrf_exempt
@require_http_methods(["POST"])
def delete_availability(request, language):
    file_path = get_language_file(language)

    try:
        body = json.loads(request.body.decode("utf-8"))
        teacher_id = body["teacherId"]
        slot_id = body["slotId"]
    except Exception:
        return JsonResponse({"error": "Invalid payload"}, status=400)

    if not os.path.exists(file_path):
        return JsonResponse({"error": "Language not found"}, status=404)

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    teacher = next((t for t in data["teachers"] if t["id"] == teacher_id), None)
    if not teacher:
        return JsonResponse({"error": "Teacher not found"}, status=404)

    before = len(teacher["availabilitySlots"])
    teacher["availabilitySlots"] = [
        s for s in teacher["availabilitySlots"] if s.get("id") != slot_id
    ]

    after = len(teacher["availabilitySlots"])

    if before == after:
        return JsonResponse({"error": "Slot not found"}, status=404)

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return JsonResponse({"status": "availability deleted"})


@csrf_exempt
@require_http_methods(["POST"])
def book_course(request, language, teacherId):
    file_path = get_language_file(language)

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except Exception:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    if not os.path.exists(file_path):
        return JsonResponse({"error": "Language not found"}, status=404)

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    teacher = next((t for t in data["teachers"] if t["id"] == teacherId), None)

    if not teacher:
        return JsonResponse({"error": "Teacher not found"}, status=404)

    # Generate new course ID
    new_id = f"{teacherId}_b{len(teacher['bookings']) + 1}"

    new_course = {
        "id": new_id,
        "groupReference": payload["groupReference"],
        "timeZone": payload["timeZone"],
        "durationMinutes": payload["durationMinutes"],
        "sessions": payload["sessions"]
    }

    teacher["bookings"].append(new_course)

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return JsonResponse({"status": "course booked", "courseId": new_id})


@csrf_exempt
@require_http_methods(["POST"])
def update_course(request, language, courseId):
    file_path = get_language_file(language)

    if not os.path.exists(file_path):
        return JsonResponse({"error": "Language not found"}, status=404)

    try:
        payload = json.loads(request.body.decode("utf-8"))
        new_teacher_id = payload["teacherId"]
    except Exception:
        return JsonResponse({"error": "Invalid payload"}, status=400)

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # -------------------------------------------------------
    # 1. FIND ORIGINAL TEACHER CONTAINING THIS COURSE
    # -------------------------------------------------------
    original_teacher = None
    original_course = None

    for teacher in data["teachers"]:
        for c in teacher.get("bookings", []):
            if c["id"] == courseId:
                original_teacher = teacher
                original_course = c
                break
        if original_course:
            break

    if not original_course:
        return JsonResponse({"error": "Course not found"}, status=404)

    # -------------------------------------------------------
    # 2. REMOVE COURSE FROM ORIGINAL TEACHER
    # -------------------------------------------------------
    original_teacher["bookings"] = [
        c for c in original_teacher["bookings"] if c["id"] != courseId
    ]

    # -------------------------------------------------------
    # 3. ADD / UPDATE UNDER NEW TEACHER
    # -------------------------------------------------------
    new_teacher = next((t for t in data["teachers"] if t["id"] == new_teacher_id), None)

    if not new_teacher:
        return JsonResponse({"error": "New teacher not found"}, status=404)

    updated_course = {
        "id": courseId,  # keep stable
        "groupReference": payload["groupReference"],
        "timeZone": payload["timeZone"],
        "durationMinutes": payload["durationMinutes"],
        "sessions": payload["sessions"]
    }

    new_teacher["bookings"].append(updated_course)

    # -------------------------------------------------------
    # 4. SAVE FILE
    # -------------------------------------------------------
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return JsonResponse({"status": "course updated"})


---
BACKEND/API/MIGRATIONS/__INIT__.PY:



---
BACKEND/API/MIGRATIONS/__PYCACHE__/__INIT__.CPYTHON-312.PYC:

[Unable to decode file: likely binary]

---
BACKEND/API/__PYCACHE__/VIEWS.CPYTHON-312.PYC:

[Unable to decode file: likely binary]

---
BACKEND/API/__PYCACHE__/URLS.CPYTHON-312.PYC:

[Unable to decode file: likely binary]

---
BACKEND/API/__PYCACHE__/MODELS.CPYTHON-312.PYC:

[Unable to decode file: likely binary]

---
BACKEND/API/__PYCACHE__/ADMIN.CPYTHON-312.PYC:

[Unable to decode file: likely binary]

---
BACKEND/API/__PYCACHE__/__INIT__.CPYTHON-312.PYC:

[Unable to decode file: likely binary]

---
BACKEND/DATA/JSON_STRUC.PY:

import json
import sys
import os


def skeleton(value):
    """
    Recursively replace all JSON values with XXXX,
    preserving only the structure.
    """
    # If it's a dictionary, keep the keys but strip content
    if isinstance(value, dict):
        return {key: skeleton(val) for key, val in value.items()}

    # If it's a list, show only one representative item
    if isinstance(value, list):
        if len(value) == 0:
            return []       # empty list stays empty
        return [skeleton(value[0])]

    # Otherwise (strings, numbers, booleans, null), replace content
    return "XXXX"


def main():
    if len(sys.argv) < 2:
        print("Usage: python json_structure.py <filename.json>")
        sys.exit(1)

    filename = sys.argv[1]

    if not os.path.exists(filename):
        print(f"Error: File '{filename}' not found.")
        sys.exit(1)

    # Load input JSON
    with open(filename, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Generate skeleton structure
    structure = skeleton(data)

    # Output filename
    name, ext = os.path.splitext(filename)
    out_file = f"{name}_structure.json"

    # Write output JSON
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(structure, f, indent=2, ensure_ascii=False)

    print(f"Structure written to: {out_file}")


if __name__ == "__main__":
    main()


---
BACKEND/DATA/ENGLISH_STRUCTURE.JSON:

{
  "language": "XXXX",
  "teachers": [
    {
      "id": "XXXX",
      "name": "XXXX",
      "availabilitySlots": [
        {
          "id": "XXXX",
          "weekdays": [
            "XXXX"
          ],
          "startTime": "XXXX",
          "endTime": "XXXX",
          "startDate": "XXXX",
          "endDate": "XXXX",
          "timeZone": "XXXX"
        }
      ],
      "bookings": [
        {
          "id": "XXXX",
          "groupReference": "XXXX",
          "timeZone": "XXXX",
          "durationMinutes": "XXXX",
          "sessions": [
            {
              "id": "XXXX",
              "startDateTime": "XXXX"
            }
          ]
        }
      ],
      "blockers": []
    }
  ],
  "meta": {
    "defaultTimeZone": "XXXX",
    "lastUpdated": "XXXX"
  }
}

---
BACKEND/DATA/GERMAN.JSON:

{
  "language": "de",
  "teachers": [
    {
      "id": "de_t1",
      "name": "Suraj Somkuwar",
      "availabilitySlots": [
        {
          "id": "de_t1_a1",
          "weekdays": [
            1,
            2,
            4
          ],
          "startTime": "09:00",
          "endTime": "12:00",
          "startDate": "2026-01-15",
          "endDate": "2026-10-31",
          "timeZone": "Europe/Warsaw"
        },
        {
          "id": "de_t1_a2",
          "weekdays": [
            3
          ],
          "startTime": "09:00",
          "endTime": "13:00",
          "startDate": "2026-01-15",
          "endDate": "2026-10-31",
          "timeZone": "Europe/Warsaw"
        },
        {
          "id": "de_t1_a3",
          "weekdays": [
            5
          ],
          "startTime": "09:00",
          "endTime": "11:00",
          "startDate": "2026-01-15",
          "endDate": "2026-10-31",
          "timeZone": "Europe/Warsaw"
        }
      ],
      "bookings": [],
      "blockers": []
    }
  ],
  "meta": {}
}

---
BACKEND/DATA/SPANISH.JSON:

{
  "language": "es",
  "teachers": [
    {
      "id": "es_t1",
      "name": "Gisela",
      "availabilitySlots": [
        {
          "id": "es_t1_a1",
          "weekdays": [
            2,
            3
          ],
          "startTime": "17:00",
          "endTime": "19:00",
          "startDate": "2026-01-14",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        },
        {
          "id": "es_t1_a2",
          "weekdays": [
            4
          ],
          "startTime": "17:00",
          "endTime": "18:00",
          "startDate": "2026-01-14",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        }
      ],
      "bookings": [
        {
          "id": "es_t1_b1",
          "groupReference": "Group 38",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-21T18:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-28T18:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-04T18:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-11T18:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-18T18:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-25T18:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-04T18:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-11T17:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-18T17:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-25T17:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-01T18:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-08T18:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-15T18:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-22T18:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-29T18:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-06T18:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-13T18:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-20T18:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-27T18:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-03T18:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-10T18:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-17T18:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-24T18:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-01T18:00+02:00"
            }
          ]
        },
        {
          "id": "es_t1_b2",
          "groupReference": "Group 41",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-20T18:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-27T18:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-03T18:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-10T18:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-17T18:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-24T18:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-03T18:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-10T17:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-17T17:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-24T17:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-31T18:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-07T18:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-14T18:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-21T18:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-28T18:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-05T18:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-12T18:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-19T18:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-26T18:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-02T18:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-09T18:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-16T18:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-23T18:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-30T18:00+02:00"
            }
          ]
        },
        {
          "id": "es_t1_b3",
          "groupReference": "Group 52",
          "timeZone": "America/New_York",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-03-04T17:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-03-11T18:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-03-18T18:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-03-25T18:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-04-01T17:00+02:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-04-08T17:00+02:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-04-15T17:00+02:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-04-22T17:00+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-04-29T17:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-05-06T17:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-05-13T17:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-05-20T17:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-05-27T17:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-06-03T17:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-06-10T17:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-06-17T17:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-06-24T17:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-07-01T17:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-07-08T17:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-07-15T17:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-07-22T17:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-29T17:00+02:00"
            }
          ]
        },
        {
          "id": "es_t1_b4",
          "groupReference": "Group 55",
          "timeZone": "America/New_York",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-03-05T17:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-03-12T17:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-03-19T17:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-03-26T17:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-04-02T17:00+02:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-04-09T17:00+02:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-04-16T17:00+02:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-04-23T17:00+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-04-30T17:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-05-07T17:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-05-14T17:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-05-21T17:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-05-28T17:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-06-04T17:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-06-11T17:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-06-18T17:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-06-25T17:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-07-02T17:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-07-09T17:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-07-16T17:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-07-23T17:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-30T17:00+02:00"
            }
          ]
        }
      ],
      "blockers": []
    },
    {
      "id": "es_t2",
      "name": "Eloisa",
      "availabilitySlots": [
        {
          "id": "es_t2_a1",
          "weekdays": [
            2,
            3,
            4
          ],
          "startTime": "15:00",
          "endTime": "17:00",
          "startDate": "2026-01-14",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        },
        {
          "id": "es_t2_a1",
          "weekdays": [
            5
          ],
          "startTime": "18:00",
          "endTime": "20:00",
          "startDate": "2026-01-14",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        }
      ],
      "bookings": [
        {
          "id": "es_t2_b1",
          "groupReference": "Group 37",
          "timeZone": "America/New_York",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-20T15:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-27T15:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-03T15:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-10T15:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-17T15:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-24T15:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-03T15:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-10T15:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-17T15:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-24T15:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-31T15:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-07T15:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-14T15:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-21T15:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-28T15:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-05T15:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-12T15:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-19T15:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-26T15:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-02T15:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-09T15:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-16T15:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-23T15:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-30T15:00+02:00"
            }
          ]
        },
        {
          "id": "es_t2_b2",
          "groupReference": "Group 40",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-15T15:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-22T15:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-29T15:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-05T15:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-12T15:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-19T15:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-26T15:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-05T15:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-12T15:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-19T15:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-26T15:00+01:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-02T15:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-09T15:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-16T15:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-23T15:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-30T15:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-07T15:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-14T15:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-21T15:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-28T15:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-04T15:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-11T15:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-18T15:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-25T15:00+02:00"
            }
          ]
        },
        {
          "id": "es_t2_b3",
          "groupReference": "Group 45",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-20T16:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-27T16:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-03T16:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-10T16:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-17T16:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-24T16:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-03T16:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-10T16:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-17T16:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-24T16:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-31T16:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-07T16:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-14T16:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-21T16:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-28T16:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-05T16:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-12T16:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-19T16:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-26T16:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-02T16:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-09T16:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-16T16:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-23T16:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-30T16:00+02:00"
            }
          ]
        },
        {
          "id": "es_t2_b4",
          "groupReference": "Group 46",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-21T16:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-28T16:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-04T16:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-11T16:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-18T16:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-25T16:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-04T16:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-11T15:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-18T15:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-25T15:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-01T16:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-08T16:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-15T16:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-22T16:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-29T16:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-06T16:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-13T16:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-20T16:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-27T16:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-03T16:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-10T16:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-17T16:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-24T16:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-01T16:00+02:00"
            }
          ]
        }
      ],
      "blockers": []
    },
    {
      "id": "es_t3",
      "name": "Thais",
      "availabilitySlots": [
        {
          "id": "es_t3_a1",
          "weekdays": [
            2,
            3
          ],
          "startTime": "15:00",
          "endTime": "19:00",
          "startDate": "2026-01-14",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        },
        {
          "id": "es_t3_a1",
          "weekdays": [
            4
          ],
          "startTime": "15:00",
          "endTime": "18:00",
          "startDate": "2026-01-14",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        },
        {
          "id": "es_t3_a1",
          "weekdays": [
            5
          ],
          "startTime": "18:00",
          "endTime": "22:00",
          "startDate": "2026-01-14",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        }
      ],
      "bookings": [
        {
          "id": "es_t3_b1",
          "groupReference": "Group 39",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-16T18:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-23T18:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-30T18:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-06T18:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-13T18:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-20T18:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-27T18:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-06T18:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-13T18:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-20T18:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-27T18:00+01:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-03T18:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-10T18:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-17T18:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-24T18:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-01T18:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-08T18:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-15T18:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-22T18:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-29T18:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-05T18:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-12T18:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-19T18:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-26T18:00+02:00"
            }
          ]
        },
        {
          "id": "es_t3_b3",
          "groupReference": "Group 43",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-20T15:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-27T15:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-03T15:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-10T15:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-17T15:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-24T15:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-03T15:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-10T15:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-17T15:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-24T15:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-31T15:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-07T15:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-14T15:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-21T15:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-28T15:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-05T15:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-12T15:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-19T15:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-26T15:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-02T15:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-09T15:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-16T15:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-23T15:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-30T15:00+02:00"
            }
          ]
        },
        {
          "id": "es_t3_b4",
          "groupReference": "Group 44",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-21T18:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-28T18:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-04T18:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-11T18:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-18T18:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-25T18:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-04T18:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-11T17:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-18T17:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-25T17:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-01T18:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-08T18:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-15T18:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-22T18:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-29T18:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-06T18:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-13T18:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-20T18:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-27T18:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-03T18:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-10T18:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-17T18:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-24T18:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-01T18:00+02:00"
            }
          ]
        },
        {
          "id": "es_t3_b5",
          "groupReference": "Group 47",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-20T16:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-27T16:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-03T16:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-10T16:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-17T16:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-24T16:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-03T16:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-10T16:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-17T16:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-24T16:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-31T16:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-07T16:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-14T16:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-21T16:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-28T16:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-05T16:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-12T16:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-19T16:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-26T16:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-02T16:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-09T16:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-16T16:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-23T16:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-30T16:00+02:00"
            }
          ]
        },
        {
          "id": "es_t3_b6",
          "groupReference": "Group 48",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-20T18:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-27T18:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-03T18:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-10T18:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-17T18:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-24T18:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-03T18:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-10T17:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-17T17:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-24T17:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-31T18:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-07T18:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-14T18:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-21T18:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-28T18:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-05T18:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-12T18:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-19T18:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-26T18:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-02T18:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-09T18:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-16T18:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-23T18:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-30T18:00+02:00"
            }
          ]
        },
        {
          "id": "es_t3_b6",
          "groupReference": "Group 53",
          "timeZone": "America/New_York",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-03-06T20:30+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-03-13T19:30+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-03-20T19:30+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-03-27T19:30+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-04-03T20:30+02:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-04-10T20:30+02:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-04-17T20:30+02:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-04-24T20:30+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-05-01T20:30+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-05-08T20:30+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-05-15T20:30+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-05-22T20:30+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-05-29T20:30+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-06-05T20:30+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-06-12T20:30+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-06-19T20:30+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-06-26T20:30+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-07-03T20:30+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-07-10T20:30+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-07-17T20:30+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-07-24T20:30+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-31T20:30+02:00"
            }
          ]
        },
        {
          "id": "es_t3_b7",
          "groupReference": "Group 53",
          "timeZone": "America/New_York",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-03-06T20:30+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-03-13T19:30+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-03-20T19:30+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-03-27T19:30+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-04-03T20:30+02:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-04-10T20:30+02:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-04-17T20:30+02:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-04-24T20:30+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-05-01T20:30+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-05-08T20:30+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-05-15T20:30+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-05-22T20:30+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-05-29T20:30+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-06-05T20:30+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-06-12T20:30+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-06-26T20:30+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-07-03T20:30+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-07-10T20:30+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-07-17T20:30+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-07-24T20:30+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-31T20:30+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-08-07T20:30+02:00"
            }
          ]
        },
        {
          "id": "es_t3_b8",
          "groupReference": "Group 54",
          "timeZone": "America/New_York",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-03-05T17:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-03-12T16:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-03-19T16:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-03-26T16:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-04-02T17:00+02:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-04-09T17:00+02:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-04-16T17:00+02:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-04-23T17:00+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-04-30T17:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-05-07T17:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-05-14T17:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-05-21T17:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-05-28T17:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-06-04T17:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-06-11T17:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-06-18T17:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-06-25T17:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-07-02T17:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-07-09T17:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-07-16T17:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-07-23T17:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-30T17:00+02:00"
            }
          ]
        }
      ],
      "blockers": []
    },
    {
      "id": "es_t4",
      "name": "Carlos",
      "availabilitySlots": [
        {
          "id": "es_t4_a1",
          "weekdays": [
            5
          ],
          "startTime": "20:00",
          "endTime": "22:00",
          "startDate": "2026-01-14",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        }
      ],
      "bookings": [
        {
          "id": "es_t3_b2",
          "groupReference": "Group 42",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-16T12:00:00.000-08:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-23T12:00:00.000-08:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-30T12:00:00.000-08:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-06T12:00:00.000-08:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-13T12:00:00.000-08:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-20T12:00:00.000-08:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-27T12:00:00.000-08:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-06T12:00:00.000-08:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-13T12:00:00.000-07:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-20T12:00:00.000-07:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-27T12:00:00.000-07:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-03T12:00:00.000-07:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-10T12:00:00.000-07:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-17T12:00:00.000-07:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-24T12:00:00.000-07:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-01T12:00:00.000-07:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-08T12:00:00.000-07:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-15T12:00:00.000-07:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-22T12:00:00.000-07:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-29T12:00:00.000-07:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-05T12:00:00.000-07:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-12T12:00:00.000-07:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-19T12:00:00.000-07:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-26T12:00:00.000-07:00"
            }
          ]
        }
      ],
      "blockers": []
    }
  ],
  "meta": {}
}

---
BACKEND/DATA/ENGLISH.JSON:

{
  "language": "en",
  "teachers": [
    {
      "id": "en_t1",
      "name": "Lyndelle Moodley",
      "availabilitySlots": [
        {
          "id": "en_t1_a1",
          "weekdays": [
            1,
            2,
            3,
            4,
            5
          ],
          "startTime": "09:00",
          "endTime": "11:00",
          "startDate": "2025-12-31",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        },
        {
          "id": "en_t1_a2",
          "weekdays": [
            1,
            2,
            3,
            4,
            5
          ],
          "startTime": "14:00",
          "endTime": "16:00",
          "startDate": "2026-01-04",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        },
        {
          "id": "en_t1_a5",
          "weekdays": [
            2,
            3,
            4
          ],
          "startTime": "16:00",
          "endTime": "17:00",
          "startDate": "2026-01-31",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        }
      ],
      "bookings": [
        {
          "id": "en_t1_b1",
          "groupReference": "Group 1",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-15T09:00:00.000+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-22T09:00:00.000+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-29T09:00:00.000+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-05T09:00:00.000+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-12T09:00:00.000+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-19T09:00:00.000+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-26T09:00:00.000+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-05T09:00:00.000+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-12T09:00:00.000+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-19T09:00:00.000+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-26T09:00:00.000+01:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-02T09:00:00.000+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-09T09:00:00.000+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-16T09:00:00.000+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-23T09:00:00.000+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-30T09:00:00.000+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-07T09:00:00.000+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-14T09:00:00.000+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-21T09:00:00.000+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-28T09:00:00.000+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-04T09:00:00.000+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-11T09:00:00.000+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-18T09:00:00.000+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-25T09:00:00.000+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-02T09:00:00.000+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-07-09T09:00:00.000+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-07-16T09:00:00.000+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-07-23T09:00:00.000+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-07-30T09:00:00.000+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-08-06T09:00:00.000+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-08-13T09:00:00.000+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-08-20T09:00:00.000+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-08-27T09:00:00.000+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-03T09:00:00.000+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-09-10T09:00:00.000+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-09-17T09:00:00.000+02:00"
            }
          ]
        },
        {
          "id": "en_t1_b2",
          "groupReference": "Group 4",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-16T09:00:00.000+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-23T09:00:00.000+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-30T09:00:00.000+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-06T09:00:00.000+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-13T09:00:00.000+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-20T09:00:00.000+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-27T09:00:00.000+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-06T09:00:00.000+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-13T09:00:00.000+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-20T09:00:00.000+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-27T09:00:00.000+01:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-03T09:00:00.000+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-10T09:00:00.000+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-17T09:00:00.000+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-24T09:00:00.000+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-01T09:00:00.000+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-08T09:00:00.000+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-15T09:00:00.000+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-22T09:00:00.000+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-29T09:00:00.000+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-05T09:00:00.000+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-12T09:00:00.000+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-19T09:00:00.000+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-26T09:00:00.000+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-03T09:00:00.000+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-07-10T09:00:00.000+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-07-17T09:00:00.000+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-07-24T09:00:00.000+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-07-31T09:00:00.000+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-08-07T09:00:00.000+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-08-14T09:00:00.000+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-08-21T09:00:00.000+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-08-28T09:00:00.000+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-04T09:00:00.000+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-09-11T09:00:00.000+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-09-18T09:00:00.000+02:00"
            }
          ]
        },
        {
          "id": "en_t1_b4",
          "groupReference": "Group 6",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-14T09:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-21T09:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-28T09:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-04T09:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-11T09:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-18T09:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-25T09:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-04T09:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-11T09:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-18T09:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-25T09:00+01:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-01T09:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-08T09:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-15T09:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-22T09:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-29T09:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-06T09:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-13T09:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-20T09:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-27T09:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-03T09:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-10T09:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-17T09:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-24T09:00+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-01T09:00+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-07-08T09:00+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-07-15T09:00+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-07-22T09:00+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-07-29T09:00+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-08-05T09:00+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-08-12T09:00+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-08-19T09:00+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-08-26T09:00+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-02T09:00+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-09-09T09:00+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-09-16T09:00+02:00"
            }
          ]
        },
        {
          "id": "en_t1_b6",
          "groupReference": "Group 11",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-08T10:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-15T10:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-22T10:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-01-29T10:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-05T10:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-12T10:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-19T10:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-02-26T10:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-05T10:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-12T10:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-19T10:00+01:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-03-26T10:00+01:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-09T10:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-16T10:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-23T10:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-30T10:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-07T10:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-14T10:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-21T10:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-28T10:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-04T10:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-11T10:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-18T10:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-25T10:00+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-02T10:00+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-07-09T10:00+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-07-16T10:00+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-07-23T10:00+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-07-30T10:00+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-08-06T10:00+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-08-13T10:00+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-08-20T10:00+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-08-27T10:00+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-03T10:00+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-09-10T10:00+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-09-17T10:00+02:00"
            }
          ]
        },
        {
          "id": "en_t1_b8",
          "groupReference": "Group 24",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-06T06:00:00.000-08:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-13T06:00:00.000-08:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-20T06:00:00.000-08:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-01-27T06:00:00.000-08:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-03T06:00:00.000-08:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-10T06:00:00.000-08:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-17T06:00:00.000-08:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-02-24T06:00:00.000-08:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-03T06:00:00.000-08:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-10T06:00:00.000-07:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-17T06:00:00.000-07:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-03-24T06:00:00.000-07:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-03-31T06:00:00.000-07:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-07T06:00:00.000-07:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-14T06:00:00.000-07:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-21T06:00:00.000-07:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-04-28T06:00:00.000-07:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-05T06:00:00.000-07:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-12T06:00:00.000-07:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-19T06:00:00.000-07:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-05-26T06:00:00.000-07:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-02T06:00:00.000-07:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-09T06:00:00.000-07:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-16T06:00:00.000-07:00"
            }
          ]
        },
        {
          "id": "en_t1_b9",
          "groupReference": "Group 25",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-12T06:00:00.000-08:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-19T06:00:00.000-08:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-26T06:00:00.000-08:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-02T06:00:00.000-08:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-09T06:00:00.000-08:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-16T06:00:00.000-08:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-23T06:00:00.000-08:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-02T06:00:00.000-08:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-09T06:00:00.000-07:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-16T06:00:00.000-07:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-23T06:00:00.000-07:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-03-30T06:00:00.000-07:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-06T06:00:00.000-07:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-13T06:00:00.000-07:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-20T06:00:00.000-07:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-27T06:00:00.000-07:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-04T06:00:00.000-07:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-11T06:00:00.000-07:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-18T06:00:00.000-07:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-25T06:00:00.000-07:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-01T06:00:00.000-07:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-08T06:00:00.000-07:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-15T06:00:00.000-07:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-22T06:00:00.000-07:00"
            }
          ]
        },
        {
          "id": "en_t1_b10",
          "groupReference": "Group 27",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-07T06:00:00.000-08:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-14T06:00:00.000-08:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-21T06:00:00.000-08:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-01-28T06:00:00.000-08:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-04T06:00:00.000-08:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-11T06:00:00.000-08:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-18T06:00:00.000-08:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-02-25T06:00:00.000-08:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-04T06:00:00.000-08:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-11T06:00:00.000-07:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-18T06:00:00.000-07:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-03-25T06:00:00.000-07:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-01T06:00:00.000-07:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-08T06:00:00.000-07:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-15T06:00:00.000-07:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-22T06:00:00.000-07:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-04-29T06:00:00.000-07:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-06T06:00:00.000-07:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-13T06:00:00.000-07:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-20T06:00:00.000-07:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-05-27T06:00:00.000-07:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-03T06:00:00.000-07:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-10T06:00:00.000-07:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-17T06:00:00.000-07:00"
            }
          ]
        },
        {
          "id": "en_t1_b11",
          "groupReference": "Group 29",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-08T06:00:00.000-08:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-15T06:00:00.000-08:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-22T06:00:00.000-08:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-01-29T06:00:00.000-08:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-05T06:00:00.000-08:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-12T06:00:00.000-08:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-19T06:00:00.000-08:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-02-26T06:00:00.000-08:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-05T06:00:00.000-08:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-12T06:00:00.000-07:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-19T06:00:00.000-07:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-03-26T06:00:00.000-07:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-02T06:00:00.000-07:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-09T06:00:00.000-07:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-16T06:00:00.000-07:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-23T06:00:00.000-07:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-04-30T06:00:00.000-07:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-07T06:00:00.000-07:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-14T06:00:00.000-07:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-21T06:00:00.000-07:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-05-28T06:00:00.000-07:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-04T06:00:00.000-07:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-11T06:00:00.000-07:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-18T06:00:00.000-07:00"
            }
          ]
        },
        {
          "id": "en_t1_b14",
          "groupReference": "Group 32",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-02-04T16:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-02-11T16:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-18T16:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-25T16:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-03-04T16:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-03-11T15:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-18T15:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-25T15:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-04-01T16:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-04-08T16:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-15T16:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-22T16:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-29T16:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-05-06T16:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-05-13T16:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-20T16:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-27T16:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-06-03T16:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-06-10T16:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-17T16:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-24T16:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-01T16:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-07-08T16:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-15T16:00+02:00"
            }
          ]
        },
        {
          "id": "en_t1_b15",
          "groupReference": "Group 31",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-02-03T16:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-02-10T16:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-17T16:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-24T16:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-03-03T16:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-03-10T15:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-17T15:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-24T15:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-31T16:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-04-07T16:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-14T16:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-21T16:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-28T16:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-05-05T16:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-05-12T16:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-19T16:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-26T16:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-06-02T16:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-06-09T16:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-16T16:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-23T16:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-30T16:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-07-07T16:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-14T16:00+02:00"
            }
          ]
        },
        {
          "id": "en_t1_b11",
          "groupReference": "BayerLeverkusen B1 Group2",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-02-09T09:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-02-16T09:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-23T09:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-03-02T09:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-03-09T09:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-03-16T09:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-23T09:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-30T09:00+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-04-06T09:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-04-13T09:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-20T09:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-27T09:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-05-04T09:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-05-11T09:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-05-18T09:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-25T09:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-06-01T09:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-06-08T09:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-06-15T09:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-22T09:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-29T09:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-06T09:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-07-13T09:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-20T09:00+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-27T09:00+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-08-03T09:00+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-08-10T09:00+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-08-17T09:00+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-08-24T09:00+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-08-31T09:00+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-09-07T09:00+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-09-14T09:00+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-09-21T09:00+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-28T09:00+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-10-05T09:00+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-10-12T09:00+02:00"
            }
          ]
        },
        {
          "id": "en_t1_b12",
          "groupReference": "BayerLeverkusen B1 Group3",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-02-10T09:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-02-17T09:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-24T09:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-03-03T09:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-03-10T09:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-03-17T09:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-24T09:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-31T09:00+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-04-07T09:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-04-14T09:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-21T09:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-28T09:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-05-05T09:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-05-12T09:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-05-19T09:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-26T09:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-06-02T09:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-06-09T09:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-06-16T09:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-23T09:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-30T09:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-07T09:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-07-14T09:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-21T09:00+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-28T09:00+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-08-04T09:00+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-08-11T09:00+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-08-18T09:00+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-08-25T09:00+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-09-01T09:00+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-09-08T09:00+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-09-15T09:00+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-09-22T09:00+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-29T09:00+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-10-06T09:00+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-10-13T09:00+02:00"
            }
          ]
        },
        {
          "id": "en_t1_b13",
          "groupReference": "Group 57(a)",
          "timeZone": "America/New_York",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-03-10T16:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-03-17T16:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-03-24T16:00+01:00"
            }
          ]
        }
      ],
      "blockers": []
    },
    {
      "id": "en_t2",
      "name": "Larelle Foord",
      "availabilitySlots": [
        {
          "id": "en_t2_a2",
          "weekdays": [
            1,
            2,
            3,
            4,
            5
          ],
          "startTime": "09:00",
          "endTime": "11:00",
          "startDate": "2026-01-04",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        },
        {
          "id": "en_t2_a3",
          "weekdays": [
            1,
            2,
            3,
            4,
            5
          ],
          "startTime": "15:00",
          "endTime": "16:00",
          "startDate": "2026-01-04",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        },
        {
          "id": "en_t2_a4",
          "weekdays": [
            1,
            3,
            2,
            4,
            5
          ],
          "startTime": "11:00",
          "endTime": "12:00",
          "startDate": "2026-01-31",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        },
        {
          "id": "en_t2_a4",
          "weekdays": [
            1,
            2,
            3,
            4,
            5
          ],
          "startTime": "14:00",
          "endTime": "15:00",
          "startDate": "2026-01-31",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        }
      ],
      "bookings": [
        {
          "id": "en_t2_b1",
          "groupReference": "Group 2",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-16T09:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-23T09:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-30T09:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-06T09:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-13T09:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-20T09:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-27T09:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-06T09:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-13T09:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-20T09:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-27T09:00+01:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-03T09:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-10T09:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-17T09:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-24T09:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-01T09:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-08T09:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-15T09:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-22T09:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-29T09:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-05T09:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-12T09:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-19T09:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-26T09:00+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-03T09:00+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-07-10T09:00+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-07-17T09:00+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-07-24T09:00+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-07-31T09:00+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-08-07T09:00+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-08-14T09:00+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-08-21T09:00+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-08-28T09:00+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-04T09:00+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-09-11T09:00+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-09-18T09:00+02:00"
            }
          ]
        },
        {
          "id": "en_t2_b4",
          "groupReference": "Group 3",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-15T09:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-22T09:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-29T09:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-05T09:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-12T09:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-19T09:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-26T09:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-05T09:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-12T09:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-19T09:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-26T09:00+01:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-02T09:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-09T09:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-16T09:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-23T09:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-30T09:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-07T09:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-14T09:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-21T09:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-28T09:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-04T09:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-11T09:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-18T09:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-25T09:00+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-02T09:00+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-07-09T09:00+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-07-16T09:00+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-07-23T09:00+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-07-30T09:00+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-08-06T09:00+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-08-13T09:00+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-08-20T09:00+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-08-27T09:00+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-03T09:00+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-09-10T09:00+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-09-17T09:00+02:00"
            }
          ]
        },
        {
          "id": "en_t2_b6",
          "groupReference": "Group 13",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-08T10:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-15T10:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-22T10:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-01-29T10:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-05T10:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-12T10:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-19T10:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-02-26T10:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-05T10:00+01:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-12T10:00+01:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-19T10:00+01:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-03-26T10:00+01:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-09T10:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-16T10:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-23T10:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-30T10:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-07T10:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-14T10:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-21T10:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-28T10:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-04T10:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-11T10:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-18T10:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-25T10:00+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-02T10:00+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-07-09T10:00+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-07-16T10:00+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-07-23T10:00+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-07-30T10:00+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-08-06T10:00+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-08-13T10:00+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-08-20T10:00+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-08-27T10:00+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-03T10:00+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-09-10T10:00+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-09-17T10:00+02:00"
            }
          ]
        },
        {
          "id": "en_t2_b7",
          "groupReference": "Group 23",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-07T06:00:00.000-08:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-14T06:00:00.000-08:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-21T06:00:00.000-08:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-01-28T06:00:00.000-08:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-04T06:00:00.000-08:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-11T06:00:00.000-08:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-18T06:00:00.000-08:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-02-25T06:00:00.000-08:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-04T06:00:00.000-08:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-11T06:00:00.000-07:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-18T06:00:00.000-07:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-03-25T06:00:00.000-07:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-01T06:00:00.000-07:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-08T06:00:00.000-07:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-15T06:00:00.000-07:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-22T06:00:00.000-07:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-04-29T06:00:00.000-07:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-06T06:00:00.000-07:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-13T06:00:00.000-07:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-20T06:00:00.000-07:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-05-27T06:00:00.000-07:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-03T06:00:00.000-07:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-10T06:00:00.000-07:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-17T06:00:00.000-07:00"
            }
          ]
        },
        {
          "id": "en_t2_b8",
          "groupReference": "Group 26",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-06T06:00:00.000-08:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-13T06:00:00.000-08:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-20T06:00:00.000-08:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-01-27T06:00:00.000-08:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-03T06:00:00.000-08:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-10T06:00:00.000-08:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-17T06:00:00.000-08:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-02-24T06:00:00.000-08:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-03T06:00:00.000-08:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-10T06:00:00.000-07:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-17T06:00:00.000-07:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-03-24T06:00:00.000-07:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-03-31T06:00:00.000-07:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-07T06:00:00.000-07:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-14T06:00:00.000-07:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-21T06:00:00.000-07:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-04-28T06:00:00.000-07:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-05T06:00:00.000-07:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-12T06:00:00.000-07:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-19T06:00:00.000-07:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-05-26T06:00:00.000-07:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-02T06:00:00.000-07:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-09T06:00:00.000-07:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-16T06:00:00.000-07:00"
            }
          ]
        },
        {
          "id": "en_t2_b9",
          "groupReference": "Group 28",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-12T06:00:00.000-08:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-19T06:00:00.000-08:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-26T06:00:00.000-08:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-02T06:00:00.000-08:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-09T06:00:00.000-08:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-16T06:00:00.000-08:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-23T06:00:00.000-08:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-02T06:00:00.000-08:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-09T06:00:00.000-07:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-16T06:00:00.000-07:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-23T06:00:00.000-07:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-03-30T06:00:00.000-07:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-06T06:00:00.000-07:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-13T06:00:00.000-07:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-20T06:00:00.000-07:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-27T06:00:00.000-07:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-04T06:00:00.000-07:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-11T06:00:00.000-07:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-18T06:00:00.000-07:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-25T06:00:00.000-07:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-01T06:00:00.000-07:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-08T06:00:00.000-07:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-15T06:00:00.000-07:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-22T06:00:00.000-07:00"
            }
          ]
        },
        {
          "id": "en_t2_b11",
          "groupReference": "Group 35",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-01-08T06:00:00.000-08:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-01-15T06:00:00.000-08:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-01-22T06:00:00.000-08:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-01-29T06:00:00.000-08:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-02-05T06:00:00.000-08:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-02-12T06:00:00.000-08:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-02-19T06:00:00.000-08:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-02-26T06:00:00.000-08:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-05T06:00:00.000-08:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-03-12T06:00:00.000-07:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-03-19T06:00:00.000-07:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-03-26T06:00:00.000-07:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-02T06:00:00.000-07:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-04-09T06:00:00.000-07:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-04-16T06:00:00.000-07:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-04-23T06:00:00.000-07:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-04-30T06:00:00.000-07:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-05-07T06:00:00.000-07:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-05-14T06:00:00.000-07:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-05-21T06:00:00.000-07:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-05-28T06:00:00.000-07:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-04T06:00:00.000-07:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-06-11T06:00:00.000-07:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-06-18T06:00:00.000-07:00"
            }
          ]
        },
        {
          "id": "en_t2_b9",
          "groupReference": "Group 30",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-02-03T16:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-02-10T16:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-17T16:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-24T16:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-03-03T16:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-03-10T15:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-17T15:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-24T15:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-31T16:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-04-07T16:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-14T16:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-21T16:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-28T16:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-05-05T16:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-05-12T16:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-19T16:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-26T16:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-06-02T16:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-06-09T16:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-16T16:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-23T16:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-30T16:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-07-07T16:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-14T16:00+02:00"
            }
          ]
        },
        {
          "id": "en_t2_b10",
          "groupReference": "Group 50",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-02-03T11:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-02-10T11:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-17T11:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-24T11:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-03-03T11:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-03-10T11:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-17T11:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-24T11:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-31T11:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-04-07T11:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-14T11:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-21T11:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-28T11:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-05-05T11:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-05-12T11:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-19T11:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-26T11:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-06-02T11:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-06-09T11:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-16T11:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-23T11:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-30T11:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-07-07T11:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-14T11:00+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-21T11:00+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-07-28T11:00+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-08-04T11:00+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-08-11T11:00+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-08-18T11:00+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-08-25T11:00+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-09-01T11:00+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-09-08T11:00+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-09-15T11:00+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-22T11:00+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-09-29T11:00+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-10-06T11:00+02:00"
            }
          ]
        },
        {
          "id": "en_t2_b11",
          "groupReference": "BayerLeverkusen B1 Group1",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-02-04T09:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-02-11T09:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-18T09:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-25T09:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-03-04T09:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-03-11T09:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-18T09:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-25T09:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-04-01T09:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-04-08T09:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-15T09:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-22T09:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-29T09:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-05-06T09:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-05-13T09:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-20T09:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-27T09:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-06-03T09:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-06-10T09:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-17T09:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-24T09:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-01T09:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-07-08T09:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-15T09:00+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-22T09:00+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-07-29T09:00+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-08-05T09:00+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-08-12T09:00+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-08-19T09:00+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-08-26T09:00+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-09-02T09:00+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-09-09T09:00+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-09-16T09:00+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-23T09:00+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-09-30T09:00+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-10-07T09:00+02:00"
            }
          ]
        },
        {
          "id": "en_t2_b11",
          "groupReference": "Group 10",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-02-04T11:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-02-11T11:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-18T11:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-25T11:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-03-04T11:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-03-11T11:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-18T11:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-25T11:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-04-01T11:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-04-08T11:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-15T11:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-22T11:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-29T11:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-05-06T11:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-05-13T11:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-20T11:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-27T11:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-06-03T11:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-06-10T11:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-17T11:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-24T11:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-01T11:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-07-08T11:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-15T11:00+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-22T11:00+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-07-29T11:00+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-08-05T11:00+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-08-12T11:00+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-08-19T11:00+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-08-26T11:00+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-09-02T11:00+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-09-09T11:00+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-09-16T11:00+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-23T11:00+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-09-30T11:00+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-10-07T11:00+02:00"
            }
          ]
        },
        {
          "id": "en_t2_b12",
          "groupReference": "Group 60",
          "timeZone": "America/New_York",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-03-06T15:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-03-13T14:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-03-20T14:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-03-27T14:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-04-03T15:00+02:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-04-10T15:00+02:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-04-17T15:00+02:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-04-24T15:00+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-05-01T15:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-05-08T15:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-05-15T15:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-05-22T15:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-05-29T15:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-06-05T15:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-06-12T15:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-06-19T15:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-06-26T15:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-07-03T15:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-07-10T15:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-07-17T15:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-07-24T15:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-31T15:00+02:00"
            }
          ]
        },
        {
          "id": "en_t2_b13",
          "groupReference": "Group 58",
          "timeZone": "America/New_York",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-03-05T14:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-03-12T15:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-03-19T15:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-03-26T15:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-04-02T14:00+02:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-04-09T14:00+02:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-04-16T14:00+02:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-04-23T14:00+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-04-30T14:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-05-07T14:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-05-14T14:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-05-21T14:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-05-28T14:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-06-04T14:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-06-11T14:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-06-18T14:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-06-25T14:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-07-02T14:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-07-09T14:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-07-16T14:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-07-23T14:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-30T14:00+02:00"
            }
          ]
        },
        {
          "id": "en_t2_b14",
          "groupReference": "Group 56",
          "timeZone": "America/New_York",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-03-04T14:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-03-11T15:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-03-18T15:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-03-25T15:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-04-01T14:00+02:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-04-08T14:00+02:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-04-15T14:00+02:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-04-22T14:00+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-04-29T14:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-05-06T14:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-05-13T14:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-05-20T14:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-05-27T14:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-06-03T14:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-06-10T14:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-06-17T14:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-06-24T14:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-07-01T14:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-07-08T14:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-07-15T14:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-07-22T14:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-29T14:00+02:00"
            }
          ]
        },
        {
          "id": "en_t2_b15",
          "groupReference": "Group 61",
          "timeZone": "America/New_York",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-03-06T14:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-03-13T15:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-03-20T15:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-03-27T15:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-04-03T14:00+02:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-04-10T14:00+02:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-04-17T14:00+02:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-04-24T14:00+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-05-01T14:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-05-08T14:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-05-15T14:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-05-22T14:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-05-29T14:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-06-05T14:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-06-12T14:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-06-19T14:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-06-26T14:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-07-03T14:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-07-10T14:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-07-17T14:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-07-24T14:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-31T14:00+02:00"
            }
          ]
        },
        {
          "id": "en_t2_b16",
          "groupReference": "Group 57",
          "timeZone": "America/New_York",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-03-03T14:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-03-31T14:00+02:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-04-07T14:00+02:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-04-14T14:00+02:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-04-21T14:00+02:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-04-28T14:00+02:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-05-05T14:00+02:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-05-12T14:00+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-05-19T14:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-05-26T14:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-06-02T14:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-06-09T14:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-06-16T14:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-06-23T14:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-06-30T14:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-07-07T14:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-07-14T14:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-07-21T14:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-07-28T14:00+02:00"
            }
          ]
        }
      ],
      "blockers": []
    },
    {
      "id": "en_t3",
      "name": "Zano Mfeka",
      "availabilitySlots": [
        {
          "id": "en_t3_a1",
          "weekdays": [
            1,
            2,
            3,
            4,
            5
          ],
          "startTime": "11:00",
          "endTime": "12:00",
          "startDate": "2026-01-31",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        }
      ],
      "bookings": [
        {
          "id": "en_t1_b12",
          "groupReference": "Group 12",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-02-03T11:00:00.000+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-02-10T11:00:00.000+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-17T11:00:00.000+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-24T11:00:00.000+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-03-03T11:00:00.000+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-03-10T11:00:00.000+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-17T11:00:00.000+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-24T11:00:00.000+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-31T11:00:00.000+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-04-07T11:00:00.000+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-14T11:00:00.000+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-21T11:00:00.000+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-28T11:00:00.000+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-05-05T11:00:00.000+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-05-12T11:00:00.000+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-19T11:00:00.000+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-26T11:00:00.000+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-06-02T11:00:00.000+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-06-09T11:00:00.000+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-16T11:00:00.000+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-23T11:00:00.000+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-30T11:00:00.000+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-07-07T11:00:00.000+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-14T11:00:00.000+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-21T11:00:00.000+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-07-28T11:00:00.000+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-08-04T11:00:00.000+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-08-11T11:00:00.000+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-08-18T11:00:00.000+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-08-25T11:00:00.000+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-09-01T11:00:00.000+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-09-08T11:00:00.000+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-09-15T11:00:00.000+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-22T11:00:00.000+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-09-29T11:00:00.000+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-10-06T11:00:00.000+02:00"
            }
          ]
        },
        {
          "id": "en_t3_b2",
          "groupReference": "Group 9",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-02-04T11:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-02-11T11:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-18T11:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-25T11:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-03-04T11:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-03-11T11:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-18T11:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-25T11:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-04-01T11:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-04-08T11:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-15T11:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-22T11:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-29T11:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-05-06T11:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-05-13T11:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-20T11:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-27T11:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-06-03T11:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-06-10T11:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-17T11:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-24T11:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-01T11:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-07-08T11:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-15T11:00+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-07-22T11:00+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-07-29T11:00+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-08-05T11:00+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-08-12T11:00+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-08-19T11:00+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-08-26T11:00+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-09-02T11:00+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-09-09T11:00+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-09-16T11:00+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-09-23T11:00+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-09-30T11:00+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-10-07T11:00+02:00"
            }
          ]
        }
      ],
      "blockers": []
    },
    {
      "id": "en_t4",
      "name": "Debbie Cox",
      "availabilitySlots": [
        {
          "id": "en_t4_a1",
          "weekdays": [
            2,
            3
          ],
          "startTime": "16:00",
          "endTime": "17:00",
          "startDate": "2026-01-31",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        },
        {
          "id": "en_t4_a2",
          "weekdays": [
            5
          ],
          "startTime": "09:00",
          "endTime": "12:00",
          "startDate": "2026-02-26",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        }
      ],
      "bookings": [
        {
          "id": "en_t4_b1",
          "groupReference": "Group 34",
          "timeZone": "America/Los_Angeles",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-02-03T16:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-02-10T16:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-02-17T16:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-02-24T16:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-03-03T16:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-03-10T16:00+01:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-03-17T16:00+01:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-03-24T16:00+01:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-03-31T16:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-04-07T16:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-04-14T16:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-04-21T16:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-04-28T16:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-05-05T16:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-05-12T16:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-05-19T16:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-05-26T16:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-06-02T16:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-06-09T16:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-06-16T16:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-06-23T16:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-06-30T16:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-07-07T16:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-07-14T16:00+02:00"
            }
          ]
        },
        {
          "id": "en_t4_b2",
          "groupReference": "Group 59",
          "timeZone": "America/New_York",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-03-04T16:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-03-11T16:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-03-18T16:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-03-25T16:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-04-01T16:00+02:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-04-08T16:00+02:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-04-15T16:00+02:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-04-22T16:00+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-04-29T16:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-05-06T16:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-05-13T16:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-05-20T16:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-05-27T16:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-06-03T16:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-06-10T16:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-06-17T16:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-06-24T16:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-07-01T16:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-07-08T16:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-07-15T16:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-07-22T16:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-29T16:00+02:00"
            }
          ]
        },
        {
          "id": "en_t4_b3",
          "groupReference": "Group 05",
          "timeZone": "Europe/Warsaw",
          "durationMinutes": 60,
          "sessions": [
            {
              "id": "course_s1",
              "startDateTime": "2026-02-27T09:00+01:00"
            },
            {
              "id": "course_s2",
              "startDateTime": "2026-03-06T09:00+01:00"
            },
            {
              "id": "course_s3",
              "startDateTime": "2026-03-13T09:00+01:00"
            },
            {
              "id": "course_s4",
              "startDateTime": "2026-03-20T09:00+01:00"
            },
            {
              "id": "course_s5",
              "startDateTime": "2026-03-27T09:00+01:00"
            },
            {
              "id": "course_s6",
              "startDateTime": "2026-04-03T09:00+02:00"
            },
            {
              "id": "course_s7",
              "startDateTime": "2026-04-10T09:00+02:00"
            },
            {
              "id": "course_s8",
              "startDateTime": "2026-04-17T09:00+02:00"
            },
            {
              "id": "course_s9",
              "startDateTime": "2026-04-24T09:00+02:00"
            },
            {
              "id": "course_s10",
              "startDateTime": "2026-05-01T09:00+02:00"
            },
            {
              "id": "course_s11",
              "startDateTime": "2026-05-08T09:00+02:00"
            },
            {
              "id": "course_s12",
              "startDateTime": "2026-05-15T09:00+02:00"
            },
            {
              "id": "course_s13",
              "startDateTime": "2026-05-22T09:00+02:00"
            },
            {
              "id": "course_s14",
              "startDateTime": "2026-05-29T09:00+02:00"
            },
            {
              "id": "course_s15",
              "startDateTime": "2026-06-05T09:00+02:00"
            },
            {
              "id": "course_s16",
              "startDateTime": "2026-06-12T09:00+02:00"
            },
            {
              "id": "course_s17",
              "startDateTime": "2026-06-19T09:00+02:00"
            },
            {
              "id": "course_s18",
              "startDateTime": "2026-06-26T09:00+02:00"
            },
            {
              "id": "course_s19",
              "startDateTime": "2026-07-03T09:00+02:00"
            },
            {
              "id": "course_s20",
              "startDateTime": "2026-07-10T09:00+02:00"
            },
            {
              "id": "course_s21",
              "startDateTime": "2026-07-17T09:00+02:00"
            },
            {
              "id": "course_s22",
              "startDateTime": "2026-07-24T09:00+02:00"
            },
            {
              "id": "course_s23",
              "startDateTime": "2026-07-31T09:00+02:00"
            },
            {
              "id": "course_s24",
              "startDateTime": "2026-08-07T09:00+02:00"
            },
            {
              "id": "course_s25",
              "startDateTime": "2026-08-14T09:00+02:00"
            },
            {
              "id": "course_s26",
              "startDateTime": "2026-08-21T09:00+02:00"
            },
            {
              "id": "course_s27",
              "startDateTime": "2026-08-28T09:00+02:00"
            },
            {
              "id": "course_s28",
              "startDateTime": "2026-09-04T09:00+02:00"
            },
            {
              "id": "course_s29",
              "startDateTime": "2026-09-11T09:00+02:00"
            },
            {
              "id": "course_s30",
              "startDateTime": "2026-09-18T09:00+02:00"
            },
            {
              "id": "course_s31",
              "startDateTime": "2026-09-25T09:00+02:00"
            },
            {
              "id": "course_s32",
              "startDateTime": "2026-10-02T09:00+02:00"
            },
            {
              "id": "course_s33",
              "startDateTime": "2026-10-09T09:00+02:00"
            },
            {
              "id": "course_s34",
              "startDateTime": "2026-10-16T09:00+02:00"
            },
            {
              "id": "course_s35",
              "startDateTime": "2026-10-23T09:00+02:00"
            },
            {
              "id": "course_s36",
              "startDateTime": "2026-10-30T09:00+01:00"
            }
          ]
        }
      ],
      "blockers": []
    },
    {
      "id": "en_t5",
      "name": "Jeffson Elabanjo",
      "availabilitySlots": [
        {
          "id": "en_t5_a2",
          "weekdays": [
            5
          ],
          "startTime": "09:00",
          "endTime": "12:00",
          "startDate": "2026-02-26",
          "endDate": "2026-12-30",
          "timeZone": "Europe/Warsaw"
        }
      ],
      "bookings": [],
      "blockers": []
    }
  ],
  "meta": {
    "defaultTimeZone": "Europe/Warsaw",
    "lastUpdated": "2025-02-01T12:00"
  }
}

---
BACKEND/DATA/HOURCOUNT.PY:

import json
from datetime import datetime, date, time, timedelta
import os

def parse_date(d):
    return datetime.strptime(d, "%Y-%m-%d").date()

def parse_time(t):
    return datetime.strptime(t, "%H:%M").time()

def parse_datetime(dt):
    # Example: "2026-01-15T09:00:00.000+01:00"
    dt_clean = dt.split("+")[0]
    return datetime.fromisoformat(dt_clean)

def daterange(start_date, end_date):
    for n in range((end_date - start_date).days + 1):
        yield start_date + timedelta(n)

def hours_between(t1, t2):
    return (datetime.combine(date.min, t2) - datetime.combine(date.min, t1)).seconds / 3600


def process_file(json_file, start_date, end_date):
    try:
        with open(json_file, "r") as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"\nERROR: File not found: {json_file}")
        return None
    except json.JSONDecodeError:
        print(f"\nERROR: Invalid JSON in file: {json_file}")
        return None

    total_available_hours = 0
    total_occupied_hours = 0

    for teacher in data.get("teachers", []):
        # --- AVAILABILITY ---
        for slot in teacher.get("availabilitySlots", []):
            if "startDate" not in slot:
                print("❗ Missing startDate in slot:", slot)

            slot_start = parse_date(slot["startDate"])
            slot_end = parse_date(slot["endDate"])
            slot_weekdays = slot["weekdays"]

            start_time = parse_time(slot["startTime"])
            end_time = parse_time(slot["endTime"])
            slot_duration = hours_between(start_time, end_time)

            for day in daterange(start_date, end_date):
                if slot_start <= day <= slot_end and day.isoweekday() in slot_weekdays:
                    total_available_hours += slot_duration

        # --- BOOKINGS ---
        for booking in teacher.get("bookings", []):
            duration = booking["durationMinutes"] / 60.0
            for session in booking.get("sessions", []):
                session_dt = parse_datetime(session["startDateTime"])
                if start_date <= session_dt.date() <= end_date:
                    total_occupied_hours += duration

    return total_available_hours, total_occupied_hours


def main():
    # --- USER INPUT (once) ---
    start_input = input("Enter start date (YYYY-MM-DD): ").strip()
    end_input = input("Enter end date (YYYY-MM-DD): ").strip()

    start_date = parse_date(start_input)
    end_date = parse_date(end_input)

    # --- FILES TO PROCESS ---
    languages = ["english.json", "german.json", "spanish.json"]

    overall_available = 0
    overall_occupied = 0

    print("\n====================")
    print("   RESULTS BY FILE  ")
    print("====================")

    for filename in languages:
        print(f"\nProcessing {filename}...")

        result = process_file(filename, start_date, end_date)

        if result is None:
            continue  # skip damaged/missing files

        available, occupied = result

        overall_available += available
        overall_occupied += occupied

        print(f"Total Available Hours: {available}")
        print(f"Total Occupied Hours:  {occupied}")

        if available > 0:
            utilisation = (occupied / available) * 100
            print(f"Utilisation: {utilisation:.2f}%")
        else:
            print("Utilisation: N/A (no availability found)")

    # --- OVERALL SUMMARY ---
    print("\n====================")
    print("   OVERALL TOTALS    ")
    print("====================")
    print(f"Total Available Hours: {overall_available}")
    print(f"Total Occupied Hours:  {overall_occupied}")

    if overall_available > 0:
        utilisation = (overall_occupied / overall_available) * 100
        print(f"Overall Utilisation: {utilisation:.2f}%")
    else:
        print("Overall Utilisation: N/A")


if __name__ == "__main__":
    main()


---
VENV/.DS_STORE:

[Unable to decode file: likely binary]

---
VENV/PYVENV.CFG:

home = /Library/Frameworks/Python.framework/Versions/3.12/bin
include-system-site-packages = false
version = 3.12.1
executable = /Library/Frameworks/Python.framework/Versions/3.12/bin/python3.12
command = /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -m venv /Users/wilimabrook/Documents/LEARNCUBE/Codes/Calendar/venv


---
VENV/BIN/ACTIVATE.PS1:

<#
.Synopsis
Activate a Python virtual environment for the current PowerShell session.

.Description
Pushes the python executable for a virtual environment to the front of the
$Env:PATH environment variable and sets the prompt to signify that you are
in a Python virtual environment. Makes use of the command line switches as
well as the `pyvenv.cfg` file values present in the virtual environment.

.Parameter VenvDir
Path to the directory that contains the virtual environment to activate. The
default value for this is the parent of the directory that the Activate.ps1
script is located within.

.Parameter Prompt
The prompt prefix to display when this virtual environment is activated. By
default, this prompt is the name of the virtual environment folder (VenvDir)
surrounded by parentheses and followed by a single space (ie. '(.venv) ').

.Example
Activate.ps1
Activates the Python virtual environment that contains the Activate.ps1 script.

.Example
Activate.ps1 -Verbose
Activates the Python virtual environment that contains the Activate.ps1 script,
and shows extra information about the activation as it executes.

.Example
Activate.ps1 -VenvDir C:\Users\MyUser\Common\.venv
Activates the Python virtual environment located in the specified location.

.Example
Activate.ps1 -Prompt "MyPython"
Activates the Python virtual environment that contains the Activate.ps1 script,
and prefixes the current prompt with the specified string (surrounded in
parentheses) while the virtual environment is active.

.Notes
On Windows, it may be required to enable this Activate.ps1 script by setting the
execution policy for the user. You can do this by issuing the following PowerShell
command:

PS C:\> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

For more information on Execution Policies: 
https://go.microsoft.com/fwlink/?LinkID=135170

#>
Param(
    [Parameter(Mandatory = $false)]
    [String]
    $VenvDir,
    [Parameter(Mandatory = $false)]
    [String]
    $Prompt
)

<# Function declarations --------------------------------------------------- #>

<#
.Synopsis
Remove all shell session elements added by the Activate script, including the
addition of the virtual environment's Python executable from the beginning of
the PATH variable.

.Parameter NonDestructive
If present, do not remove this function from the global namespace for the
session.

#>
function global:deactivate ([switch]$NonDestructive) {
    # Revert to original values

    # The prior prompt:
    if (Test-Path -Path Function:_OLD_VIRTUAL_PROMPT) {
        Copy-Item -Path Function:_OLD_VIRTUAL_PROMPT -Destination Function:prompt
        Remove-Item -Path Function:_OLD_VIRTUAL_PROMPT
    }

    # The prior PYTHONHOME:
    if (Test-Path -Path Env:_OLD_VIRTUAL_PYTHONHOME) {
        Copy-Item -Path Env:_OLD_VIRTUAL_PYTHONHOME -Destination Env:PYTHONHOME
        Remove-Item -Path Env:_OLD_VIRTUAL_PYTHONHOME
    }

    # The prior PATH:
    if (Test-Path -Path Env:_OLD_VIRTUAL_PATH) {
        Copy-Item -Path Env:_OLD_VIRTUAL_PATH -Destination Env:PATH
        Remove-Item -Path Env:_OLD_VIRTUAL_PATH
    }

    # Just remove the VIRTUAL_ENV altogether:
    if (Test-Path -Path Env:VIRTUAL_ENV) {
        Remove-Item -Path env:VIRTUAL_ENV
    }

    # Just remove VIRTUAL_ENV_PROMPT altogether.
    if (Test-Path -Path Env:VIRTUAL_ENV_PROMPT) {
        Remove-Item -Path env:VIRTUAL_ENV_PROMPT
    }

    # Just remove the _PYTHON_VENV_PROMPT_PREFIX altogether:
    if (Get-Variable -Name "_PYTHON_VENV_PROMPT_PREFIX" -ErrorAction SilentlyContinue) {
        Remove-Variable -Name _PYTHON_VENV_PROMPT_PREFIX -Scope Global -Force
    }

    # Leave deactivate function in the global namespace if requested:
    if (-not $NonDestructive) {
        Remove-Item -Path function:deactivate
    }
}

<#
.Description
Get-PyVenvConfig parses the values from the pyvenv.cfg file located in the
given folder, and returns them in a map.

For each line in the pyvenv.cfg file, if that line can be parsed into exactly
two strings separated by `=` (with any amount of whitespace surrounding the =)
then it is considered a `key = value` line. The left hand string is the key,
the right hand is the value.

If the value starts with a `'` or a `"` then the first and last character is
stripped from the value before being captured.

.Parameter ConfigDir
Path to the directory that contains the `pyvenv.cfg` file.
#>
function Get-PyVenvConfig(
    [String]
    $ConfigDir
) {
    Write-Verbose "Given ConfigDir=$ConfigDir, obtain values in pyvenv.cfg"

    # Ensure the file exists, and issue a warning if it doesn't (but still allow the function to continue).
    $pyvenvConfigPath = Join-Path -Resolve -Path $ConfigDir -ChildPath 'pyvenv.cfg' -ErrorAction Continue

    # An empty map will be returned if no config file is found.
    $pyvenvConfig = @{ }

    if ($pyvenvConfigPath) {

        Write-Verbose "File exists, parse `key = value` lines"
        $pyvenvConfigContent = Get-Content -Path $pyvenvConfigPath

        $pyvenvConfigContent | ForEach-Object {
            $keyval = $PSItem -split "\s*=\s*", 2
            if ($keyval[0] -and $keyval[1]) {
                $val = $keyval[1]

                # Remove extraneous quotations around a string value.
                if ("'""".Contains($val.Substring(0, 1))) {
                    $val = $val.Substring(1, $val.Length - 2)
                }

                $pyvenvConfig[$keyval[0]] = $val
                Write-Verbose "Adding Key: '$($keyval[0])'='$val'"
            }
        }
    }
    return $pyvenvConfig
}


<# Begin Activate script --------------------------------------------------- #>

# Determine the containing directory of this script
$VenvExecPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
$VenvExecDir = Get-Item -Path $VenvExecPath

Write-Verbose "Activation script is located in path: '$VenvExecPath'"
Write-Verbose "VenvExecDir Fullname: '$($VenvExecDir.FullName)"
Write-Verbose "VenvExecDir Name: '$($VenvExecDir.Name)"

# Set values required in priority: CmdLine, ConfigFile, Default
# First, get the location of the virtual environment, it might not be
# VenvExecDir if specified on the command line.
if ($VenvDir) {
    Write-Verbose "VenvDir given as parameter, using '$VenvDir' to determine values"
}
else {
    Write-Verbose "VenvDir not given as a parameter, using parent directory name as VenvDir."
    $VenvDir = $VenvExecDir.Parent.FullName.TrimEnd("\\/")
    Write-Verbose "VenvDir=$VenvDir"
}

# Next, read the `pyvenv.cfg` file to determine any required value such
# as `prompt`.
$pyvenvCfg = Get-PyVenvConfig -ConfigDir $VenvDir

# Next, set the prompt from the command line, or the config file, or
# just use the name of the virtual environment folder.
if ($Prompt) {
    Write-Verbose "Prompt specified as argument, using '$Prompt'"
}
else {
    Write-Verbose "Prompt not specified as argument to script, checking pyvenv.cfg value"
    if ($pyvenvCfg -and $pyvenvCfg['prompt']) {
        Write-Verbose "  Setting based on value in pyvenv.cfg='$($pyvenvCfg['prompt'])'"
        $Prompt = $pyvenvCfg['prompt'];
    }
    else {
        Write-Verbose "  Setting prompt based on parent's directory's name. (Is the directory name passed to venv module when creating the virtual environment)"
        Write-Verbose "  Got leaf-name of $VenvDir='$(Split-Path -Path $venvDir -Leaf)'"
        $Prompt = Split-Path -Path $venvDir -Leaf
    }
}

Write-Verbose "Prompt = '$Prompt'"
Write-Verbose "VenvDir='$VenvDir'"

# Deactivate any currently active virtual environment, but leave the
# deactivate function in place.
deactivate -nondestructive

# Now set the environment variable VIRTUAL_ENV, used by many tools to determine
# that there is an activated venv.
$env:VIRTUAL_ENV = $VenvDir

if (-not $Env:VIRTUAL_ENV_DISABLE_PROMPT) {

    Write-Verbose "Setting prompt to '$Prompt'"

    # Set the prompt to include the env name
    # Make sure _OLD_VIRTUAL_PROMPT is global
    function global:_OLD_VIRTUAL_PROMPT { "" }
    Copy-Item -Path function:prompt -Destination function:_OLD_VIRTUAL_PROMPT
    New-Variable -Name _PYTHON_VENV_PROMPT_PREFIX -Description "Python virtual environment prompt prefix" -Scope Global -Option ReadOnly -Visibility Public -Value $Prompt

    function global:prompt {
        Write-Host -NoNewline -ForegroundColor Green "($_PYTHON_VENV_PROMPT_PREFIX) "
        _OLD_VIRTUAL_PROMPT
    }
    $env:VIRTUAL_ENV_PROMPT = $Prompt
}

# Clear PYTHONHOME
if (Test-Path -Path Env:PYTHONHOME) {
    Copy-Item -Path Env:PYTHONHOME -Destination Env:_OLD_VIRTUAL_PYTHONHOME
    Remove-Item -Path Env:PYTHONHOME
}

# Add the venv to the PATH
Copy-Item -Path Env:PATH -Destination Env:_OLD_VIRTUAL_PATH
$Env:PATH = "$VenvExecDir$([System.IO.Path]::PathSeparator)$Env:PATH"


---
VENV/BIN/PYTHON3:

[Unable to decode file: likely binary]

---
VENV/BIN/PIP3.12:

#!/Users/wilimabrook/Documents/LEARNCUBE/Codes/Calendar/venv/bin/python3.12
# -*- coding: utf-8 -*-
import re
import sys
from pip._internal.cli.main import main
if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw|\.exe)?$', '', sys.argv[0])
    sys.exit(main())


---
VENV/BIN/PYTHON:

[Unable to decode file: likely binary]

---
VENV/BIN/PIP3:

#!/Users/wilimabrook/Documents/LEARNCUBE/Codes/Calendar/venv/bin/python3.12
# -*- coding: utf-8 -*-
import re
import sys
from pip._internal.cli.main import main
if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw|\.exe)?$', '', sys.argv[0])
    sys.exit(main())


---
VENV/BIN/ACTIVATE.FISH:

# This file must be used with "source <venv>/bin/activate.fish" *from fish*
# (https://fishshell.com/). You cannot run it directly.

function deactivate  -d "Exit virtual environment and return to normal shell environment"
    # reset old environment variables
    if test -n "$_OLD_VIRTUAL_PATH"
        set -gx PATH $_OLD_VIRTUAL_PATH
        set -e _OLD_VIRTUAL_PATH
    end
    if test -n "$_OLD_VIRTUAL_PYTHONHOME"
        set -gx PYTHONHOME $_OLD_VIRTUAL_PYTHONHOME
        set -e _OLD_VIRTUAL_PYTHONHOME
    end

    if test -n "$_OLD_FISH_PROMPT_OVERRIDE"
        set -e _OLD_FISH_PROMPT_OVERRIDE
        # prevents error when using nested fish instances (Issue #93858)
        if functions -q _old_fish_prompt
            functions -e fish_prompt
            functions -c _old_fish_prompt fish_prompt
            functions -e _old_fish_prompt
        end
    end

    set -e VIRTUAL_ENV
    set -e VIRTUAL_ENV_PROMPT
    if test "$argv[1]" != "nondestructive"
        # Self-destruct!
        functions -e deactivate
    end
end

# Unset irrelevant variables.
deactivate nondestructive

set -gx VIRTUAL_ENV "/Users/wilimabrook/Documents/LEARNCUBE/Codes/Calendar/venv"

set -gx _OLD_VIRTUAL_PATH $PATH
set -gx PATH "$VIRTUAL_ENV/bin" $PATH

# Unset PYTHONHOME if set.
if set -q PYTHONHOME
    set -gx _OLD_VIRTUAL_PYTHONHOME $PYTHONHOME
    set -e PYTHONHOME
end

if test -z "$VIRTUAL_ENV_DISABLE_PROMPT"
    # fish uses a function instead of an env var to generate the prompt.

    # Save the current fish_prompt function as the function _old_fish_prompt.
    functions -c fish_prompt _old_fish_prompt

    # With the original prompt function renamed, we can override with our own.
    function fish_prompt
        # Save the return status of the last command.
        set -l old_status $status

        # Output the venv prompt; color taken from the blue of the Python logo.
        printf "%s%s%s" (set_color 4B8BBE) "(venv) " (set_color normal)

        # Restore the return status of the previous command.
        echo "exit $old_status" | .
        # Output the original/"old" prompt.
        _old_fish_prompt
    end

    set -gx _OLD_FISH_PROMPT_OVERRIDE "$VIRTUAL_ENV"
    set -gx VIRTUAL_ENV_PROMPT "(venv) "
end


---
VENV/BIN/SQLFORMAT:

#!/Users/wilimabrook/Documents/LEARNCUBE/Codes/Calendar/venv/bin/python3.12
import sys
from sqlparse.__main__ import main
if __name__ == '__main__':
    if sys.argv[0].endswith('.exe'):
        sys.argv[0] = sys.argv[0][:-4]
    sys.exit(main())


---
VENV/BIN/PIP:

#!/Users/wilimabrook/Documents/LEARNCUBE/Codes/Calendar/venv/bin/python3.12
# -*- coding: utf-8 -*-
import re
import sys
from pip._internal.cli.main import main
if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw|\.exe)?$', '', sys.argv[0])
    sys.exit(main())


---
VENV/BIN/ACTIVATE:

# This file must be used with "source bin/activate" *from bash*
# You cannot run it directly

deactivate () {
    # reset old environment variables
    if [ -n "${_OLD_VIRTUAL_PATH:-}" ] ; then
        PATH="${_OLD_VIRTUAL_PATH:-}"
        export PATH
        unset _OLD_VIRTUAL_PATH
    fi
    if [ -n "${_OLD_VIRTUAL_PYTHONHOME:-}" ] ; then
        PYTHONHOME="${_OLD_VIRTUAL_PYTHONHOME:-}"
        export PYTHONHOME
        unset _OLD_VIRTUAL_PYTHONHOME
    fi

    # Call hash to forget past commands. Without forgetting
    # past commands the $PATH changes we made may not be respected
    hash -r 2> /dev/null

    if [ -n "${_OLD_VIRTUAL_PS1:-}" ] ; then
        PS1="${_OLD_VIRTUAL_PS1:-}"
        export PS1
        unset _OLD_VIRTUAL_PS1
    fi

    unset VIRTUAL_ENV
    unset VIRTUAL_ENV_PROMPT
    if [ ! "${1:-}" = "nondestructive" ] ; then
    # Self destruct!
        unset -f deactivate
    fi
}

# unset irrelevant variables
deactivate nondestructive

# on Windows, a path can contain colons and backslashes and has to be converted:
if [ "$OSTYPE" = "cygwin" ] || [ "$OSTYPE" = "msys" ] ; then
    # transform D:\path\to\venv to /d/path/to/venv on MSYS
    # and to /cygdrive/d/path/to/venv on Cygwin
    export VIRTUAL_ENV=$(cygpath "/Users/wilimabrook/Documents/LEARNCUBE/Codes/Calendar/venv")
else
    # use the path as-is
    export VIRTUAL_ENV="/Users/wilimabrook/Documents/LEARNCUBE/Codes/Calendar/venv"
fi

_OLD_VIRTUAL_PATH="$PATH"
PATH="$VIRTUAL_ENV/bin:$PATH"
export PATH

# unset PYTHONHOME if set
# this will fail if PYTHONHOME is set to the empty string (which is bad anyway)
# could use `if (set -u; : $PYTHONHOME) ;` in bash
if [ -n "${PYTHONHOME:-}" ] ; then
    _OLD_VIRTUAL_PYTHONHOME="${PYTHONHOME:-}"
    unset PYTHONHOME
fi

if [ -z "${VIRTUAL_ENV_DISABLE_PROMPT:-}" ] ; then
    _OLD_VIRTUAL_PS1="${PS1:-}"
    PS1="(venv) ${PS1:-}"
    export PS1
    VIRTUAL_ENV_PROMPT="(venv) "
    export VIRTUAL_ENV_PROMPT
fi

# Call hash to forget past commands. Without forgetting
# past commands the $PATH changes we made may not be respected
hash -r 2> /dev/null


---
VENV/BIN/DJANGO-ADMIN:

#!/Users/wilimabrook/Documents/LEARNCUBE/Codes/Calendar/venv/bin/python3.12
import sys
from django.core.management import execute_from_command_line
if __name__ == '__main__':
    if sys.argv[0].endswith('.exe'):
        sys.argv[0] = sys.argv[0][:-4]
    sys.exit(execute_from_command_line())


---
VENV/BIN/PYTHON3.12:

[Unable to decode file: likely binary]

---
VENV/BIN/ACTIVATE.CSH:

# This file must be used with "source bin/activate.csh" *from csh*.
# You cannot run it directly.

# Created by Davide Di Blasi <davidedb@gmail.com>.
# Ported to Python 3.3 venv by Andrew Svetlov <andrew.svetlov@gmail.com>

alias deactivate 'test $?_OLD_VIRTUAL_PATH != 0 && setenv PATH "$_OLD_VIRTUAL_PATH" && unset _OLD_VIRTUAL_PATH; rehash; test $?_OLD_VIRTUAL_PROMPT != 0 && set prompt="$_OLD_VIRTUAL_PROMPT" && unset _OLD_VIRTUAL_PROMPT; unsetenv VIRTUAL_ENV; unsetenv VIRTUAL_ENV_PROMPT; test "\!:*" != "nondestructive" && unalias deactivate'

# Unset irrelevant variables.
deactivate nondestructive

setenv VIRTUAL_ENV "/Users/wilimabrook/Documents/LEARNCUBE/Codes/Calendar/venv"

set _OLD_VIRTUAL_PATH="$PATH"
setenv PATH "$VIRTUAL_ENV/bin:$PATH"


set _OLD_VIRTUAL_PROMPT="$prompt"

if (! "$?VIRTUAL_ENV_DISABLE_PROMPT") then
    set prompt = "(venv) $prompt"
    setenv VIRTUAL_ENV_PROMPT "(venv) "
endif

alias pydoc python -m pydoc

rehash


---
VENV/LIB/.DS_STORE:

[Unable to decode file: likely binary]

---
VENV/LIB/PYTHON3.12/.DS_STORE:

[Unable to decode file: likely binary]

---
VENV/LIB/PYTHON3.12/SITE-PACKAGES/.DS_STORE:

[Unable to decode file: likely binary]

---
VENV/LIB/PYTHON3.12/SITE-PACKAGES/ASGIREF/SYNC.PY:

import asyncio
import asyncio.coroutines
import contextvars
import functools
import inspect
import os
import sys
import threading
import warnings
import weakref
from concurrent.futures import Future, ThreadPoolExecutor
from typing import (
    TYPE_CHECKING,
    Any,
    Awaitable,
    Callable,
    Coroutine,
    Dict,
    Generic,
    List,
    Optional,
    TypeVar,
    Union,
    overload,
)

from .current_thread_executor import CurrentThreadExecutor
from .local import Local

if sys.version_info >= (3, 10):
    from typing import ParamSpec
else:
    from typing_extensions import ParamSpec

if TYPE_CHECKING:
    # This is not available to import at runtime
    from _typeshed import OptExcInfo

_F = TypeVar("_F", bound=Callable[..., Any])
_P = ParamSpec("_P")
_R = TypeVar("_R")


def _restore_context(context: contextvars.Context) -> None:
    # Check for changes in contextvars, and set them to the current
    # context for downstream consumers
    for cvar in context:
        cvalue = context.get(cvar)
        try:
            if cvar.get() != cvalue:
                cvar.set(cvalue)
        except LookupError:
            cvar.set(cvalue)


# Python 3.12 deprecates asyncio.iscoroutinefunction() as an alias for
# inspect.iscoroutinefunction(), whilst also removing the _is_coroutine marker.
# The latter is replaced with the inspect.markcoroutinefunction decorator.
# Until 3.12 is the minimum supported Python version, provide a shim.

if hasattr(inspect, "markcoroutinefunction"):
    iscoroutinefunction = inspect.iscoroutinefunction
    markcoroutinefunction: Callable[[_F], _F] = inspect.markcoroutinefunction
else:
    iscoroutinefunction = asyncio.iscoroutinefunction  # type: ignore[assignment]

    def markcoroutinefunction(func: _F) -> _F:
        func._is_coroutine = asyncio.coroutines._is_coroutine  # type: ignore
        return func


class AsyncSingleThreadContext:
    """Context manager to run async code inside the same thread.

    Normally, AsyncToSync functions run either inside a separate ThreadPoolExecutor or
    the main event loop if it exists. This context manager ensures that all AsyncToSync
    functions execute within the same thread.

    This context manager is re-entrant, so only the outer-most call to
    AsyncSingleThreadContext will set the context.

    Usage:

    >>> import asyncio
    >>> with AsyncSingleThreadContext():
    ...     async_to_sync(asyncio.sleep(1))()
    """

    def __init__(self):
        self.token = None

    def __enter__(self):
        try:
            AsyncToSync.async_single_thread_context.get()
        except LookupError:
            self.token = AsyncToSync.async_single_thread_context.set(self)

        return self

    def __exit__(self, exc, value, tb):
        if not self.token:
            return

        executor = AsyncToSync.context_to_thread_executor.pop(self, None)
        if executor:
            executor.shutdown()

        AsyncToSync.async_single_thread_context.reset(self.token)


class ThreadSensitiveContext:
    """Async context manager to manage context for thread sensitive mode

    This context manager controls which thread pool executor is used when in
    thread sensitive mode. By default, a single thread pool executor is shared
    within a process.

    The ThreadSensitiveContext() context manager may be used to specify a
    thread pool per context.

    This context manager is re-entrant, so only the outer-most call to
    ThreadSensitiveContext will set the context.

    Usage:

    >>> import time
    >>> async with ThreadSensitiveContext():
    ...     await sync_to_async(time.sleep, 1)()
    """

    def __init__(self):
        self.token = None

    async def __aenter__(self):
        try:
            SyncToAsync.thread_sensitive_context.get()
        except LookupError:
            self.token = SyncToAsync.thread_sensitive_context.set(self)

        return self

    async def __aexit__(self, exc, value, tb):
        if not self.token:
            return

        executor = SyncToAsync.context_to_thread_executor.pop(self, None)
        if executor:
            executor.shutdown()
        SyncToAsync.thread_sensitive_context.reset(self.token)


class AsyncToSync(Generic[_P, _R]):
    """
    Utility class which turns an awaitable that only works on the thread with
    the event loop into a synchronous callable that works in a subthread.

    If the call stack contains an async loop, the code runs there.
    Otherwise, the code runs in a new loop in a new thread.

    Either way, this thread then pauses and waits to run any thread_sensitive
    code called from further down the call stack using SyncToAsync, before
    finally exiting once the async task returns.
    """

    # Keeps a reference to the CurrentThreadExecutor in local context, so that
    # any sync_to_async inside the wrapped code can find it.
    executors: "Local" = Local()

    # When we can't find a CurrentThreadExecutor from the context, such as
    # inside create_task, we'll look it up here from the running event loop.
    loop_thread_executors: "Dict[asyncio.AbstractEventLoop, CurrentThreadExecutor]" = {}

    async_single_thread_context: "contextvars.ContextVar[AsyncSingleThreadContext]" = (
        contextvars.ContextVar("async_single_thread_context")
    )

    context_to_thread_executor: "weakref.WeakKeyDictionary[AsyncSingleThreadContext, ThreadPoolExecutor]" = (
        weakref.WeakKeyDictionary()
    )

    def __init__(
        self,
        awaitable: Union[
            Callable[_P, Coroutine[Any, Any, _R]],
            Callable[_P, Awaitable[_R]],
        ],
        force_new_loop: bool = False,
    ):
        if not callable(awaitable) or (
            not iscoroutinefunction(awaitable)
            and not iscoroutinefunction(getattr(awaitable, "__call__", awaitable))
        ):
            # Python does not have very reliable detection of async functions
            # (lots of false negatives) so this is just a warning.
            warnings.warn(
                "async_to_sync was passed a non-async-marked callable", stacklevel=2
            )
        self.awaitable = awaitable
        try:
            self.__self__ = self.awaitable.__self__  # type: ignore[union-attr]
        except AttributeError:
            pass
        self.force_new_loop = force_new_loop
        self.main_event_loop = None
        try:
            self.main_event_loop = asyncio.get_running_loop()
        except RuntimeError:
            # There's no event loop in this thread.
            pass

    def __call__(self, *args: _P.args, **kwargs: _P.kwargs) -> _R:
        __traceback_hide__ = True  # noqa: F841

        if not self.force_new_loop and not self.main_event_loop:
            # There's no event loop in this thread. Look for the threadlocal if
            # we're inside SyncToAsync
            main_event_loop_pid = getattr(
                SyncToAsync.threadlocal, "main_event_loop_pid", None
            )
            # We make sure the parent loop is from the same process - if
            # they've forked, this is not going to be valid any more (#194)
            if main_event_loop_pid and main_event_loop_pid == os.getpid():
                self.main_event_loop = getattr(
                    SyncToAsync.threadlocal, "main_event_loop", None
                )

        # You can't call AsyncToSync from a thread with a running event loop
        try:
            asyncio.get_running_loop()
        except RuntimeError:
            pass
        else:
            raise RuntimeError(
                "You cannot use AsyncToSync in the same thread as an async event loop - "
                "just await the async function directly."
            )

        # Make a future for the return information
        call_result: "Future[_R]" = Future()

        # Make a CurrentThreadExecutor we'll use to idle in this thread - we
        # need one for every sync frame, even if there's one above us in the
        # same thread.
        old_executor = getattr(self.executors, "current", None)
        current_executor = CurrentThreadExecutor(old_executor)
        self.executors.current = current_executor

        # Wrapping context in list so it can be reassigned from within
        # `main_wrap`.
        context = [contextvars.copy_context()]

        # Get task context so that parent task knows which task to propagate
        # an asyncio.CancelledError to.
        task_context = getattr(SyncToAsync.threadlocal, "task_context", None)

        # Use call_soon_threadsafe to schedule a synchronous callback on the
        # main event loop's thread if it's there, otherwise make a new loop
        # in this thread.
        try:
            awaitable = self.main_wrap(
                call_result,
                sys.exc_info(),
                task_context,
                context,
                # prepare an awaitable which can be passed as is to self.main_wrap,
                # so that `args` and `kwargs` don't need to be
                # destructured when passed to self.main_wrap
                # (which is required by `ParamSpec`)
                # as that may cause overlapping arguments
                self.awaitable(*args, **kwargs),
            )

            async def new_loop_wrap() -> None:
                loop = asyncio.get_running_loop()
                self.loop_thread_executors[loop] = current_executor
                try:
                    await awaitable
                finally:
                    del self.loop_thread_executors[loop]

            if self.main_event_loop is not None:
                try:
                    self.main_event_loop.call_soon_threadsafe(
                        self.main_event_loop.create_task, awaitable
                    )
                except RuntimeError:
                    running_in_main_event_loop = False
                else:
                    running_in_main_event_loop = True
                    # Run the CurrentThreadExecutor until the future is done.
                    current_executor.run_until_future(call_result)
            else:
                running_in_main_event_loop = False

            if not running_in_main_event_loop:
                loop_executor = None

                if self.async_single_thread_context.get(None):
                    single_thread_context = self.async_single_thread_context.get()

                    if single_thread_context in self.context_to_thread_executor:
                        loop_executor = self.context_to_thread_executor[
                            single_thread_context
                        ]
                    else:
                        loop_executor = ThreadPoolExecutor(max_workers=1)
                        self.context_to_thread_executor[
                            single_thread_context
                        ] = loop_executor
                else:
                    # Make our own event loop - in a new thread - and run inside that.
                    loop_executor = ThreadPoolExecutor(max_workers=1)

                loop_future = loop_executor.submit(asyncio.run, new_loop_wrap())
                # Run the CurrentThreadExecutor until the future is done.
                current_executor.run_until_future(loop_future)
                # Wait for future and/or allow for exception propagation
                loop_future.result()
        finally:
            _restore_context(context[0])
            # Restore old current thread executor state
            self.executors.current = old_executor

        # Wait for results from the future.
        return call_result.result()

    def __get__(self, parent: Any, objtype: Any) -> Callable[_P, _R]:
        """
        Include self for methods
        """
        func = functools.partial(self.__call__, parent)
        return functools.update_wrapper(func, self.awaitable)

    async def main_wrap(
        self,
        call_result: "Future[_R]",
        exc_info: "OptExcInfo",
        task_context: "Optional[List[asyncio.Task[Any]]]",
        context: List[contextvars.Context],
        awaitable: Union[Coroutine[Any, Any, _R], Awaitable[_R]],
    ) -> None:
        """
        Wraps the awaitable with something that puts the result into the
        result/exception future.
        """

        __traceback_hide__ = True  # noqa: F841

        if context is not None:
            _restore_context(context[0])

        current_task = asyncio.current_task()
        if current_task is not None and task_context is not None:
            task_context.append(current_task)

        try:
            # If we have an exception, run the function inside the except block
            # after raising it so exc_info is correctly populated.
            if exc_info[1]:
                try:
                    raise exc_info[1]
                except BaseException:
                    result = await awaitable
            else:
                result = await awaitable
        except BaseException as e:
            call_result.set_exception(e)
        else:
            call_result.set_result(result)
        finally:
            if current_task is not None and task_context is not None:
                task_context.remove(current_task)
            context[0] = contextvars.copy_context()


class SyncToAsync(Generic[_P, _R]):
    """
    Utility class which turns a synchronous callable into an awaitable that
    runs in a threadpool. It also sets a threadlocal inside the thread so
    calls to AsyncToSync can escape it.

    If thread_sensitive is passed, the code will run in the same thread as any
    outer code. This is needed for underlying Python code that is not
    threadsafe (for example, code which handles SQLite database connections).

    If the outermost program is async (i.e. SyncToAsync is outermost), then
    this will be a dedicated single sub-thread that all sync code runs in,
    one after the other. If the outermost program is sync (i.e. AsyncToSync is
    outermost), this will just be the main thread. This is achieved by idling
    with a CurrentThreadExecutor while AsyncToSync is blocking its sync parent,
    rather than just blocking.

    If executor is passed in, that will be used instead of the loop's default executor.
    In order to pass in an executor, thread_sensitive must be set to False, otherwise
    a TypeError will be raised.
    """

    # Storage for main event loop references
    threadlocal = threading.local()

    # Single-thread executor for thread-sensitive code
    single_thread_executor = ThreadPoolExecutor(max_workers=1)

    # Maintain a contextvar for the current execution context. Optionally used
    # for thread sensitive mode.
    thread_sensitive_context: "contextvars.ContextVar[ThreadSensitiveContext]" = (
        contextvars.ContextVar("thread_sensitive_context")
    )

    # Contextvar that is used to detect if the single thread executor
    # would be awaited on while already being used in the same context
    deadlock_context: "contextvars.ContextVar[bool]" = contextvars.ContextVar(
        "deadlock_context"
    )

    # Maintaining a weak reference to the context ensures that thread pools are
    # erased once the context goes out of scope. This terminates the thread pool.
    context_to_thread_executor: "weakref.WeakKeyDictionary[ThreadSensitiveContext, ThreadPoolExecutor]" = (
        weakref.WeakKeyDictionary()
    )

    def __init__(
        self,
        func: Callable[_P, _R],
        thread_sensitive: bool = True,
        executor: Optional["ThreadPoolExecutor"] = None,
        context: Optional[contextvars.Context] = None,
    ) -> None:
        if (
            not callable(func)
            or iscoroutinefunction(func)
            or iscoroutinefunction(getattr(func, "__call__", func))
        ):
            raise TypeError("sync_to_async can only be applied to sync functions.")
        self.func = func
        self.context = context
        functools.update_wrapper(self, func)
        self._thread_sensitive = thread_sensitive
        markcoroutinefunction(self)
        if thread_sensitive and executor is not None:
            raise TypeError("executor must not be set when thread_sensitive is True")
        self._executor = executor
        try:
            self.__self__ = func.__self__  # type: ignore
        except AttributeError:
            pass

    async def __call__(self, *args: _P.args, **kwargs: _P.kwargs) -> _R:
        __traceback_hide__ = True  # noqa: F841
        loop = asyncio.get_running_loop()

        # Work out what thread to run the code in
        if self._thread_sensitive:
            current_thread_executor = getattr(AsyncToSync.executors, "current", None)
            if current_thread_executor:
                # If we have a parent sync thread above somewhere, use that
                executor = current_thread_executor
            elif self.thread_sensitive_context.get(None):
                # If we have a way of retrieving the current context, attempt
                # to use a per-context thread pool executor
                thread_sensitive_context = self.thread_sensitive_context.get()

                if thread_sensitive_context in self.context_to_thread_executor:
                    # Re-use thread executor in current context
                    executor = self.context_to_thread_executor[thread_sensitive_context]
                else:
                    # Create new thread executor in current context
                    executor = ThreadPoolExecutor(max_workers=1)
                    self.context_to_thread_executor[thread_sensitive_context] = executor
            elif loop in AsyncToSync.loop_thread_executors:
                # Re-use thread executor for running loop
                executor = AsyncToSync.loop_thread_executors[loop]
            elif self.deadlock_context.get(False):
                raise RuntimeError(
                    "Single thread executor already being used, would deadlock"
                )
            else:
                # Otherwise, we run it in a fixed single thread
                executor = self.single_thread_executor
                self.deadlock_context.set(True)
        else:
            # Use the passed in executor, or the loop's default if it is None
            executor = self._executor

        context = contextvars.copy_context() if self.context is None else self.context
        child = functools.partial(self.func, *args, **kwargs)
        func = context.run
        task_context: List[asyncio.Task[Any]] = []

        # Run the code in the right thread
        exec_coro = loop.run_in_executor(
            executor,
            functools.partial(
                self.thread_handler,
                loop,
                sys.exc_info(),
                task_context,
                func,
                child,
            ),
        )
        ret: _R
        try:
            ret = await asyncio.shield(exec_coro)
        except asyncio.CancelledError:
            cancel_parent = True
            try:
                task = task_context[0]
                task.cancel()
                try:
                    await task
                    cancel_parent = False
                except asyncio.CancelledError:
                    pass
            except IndexError:
                pass
            if exec_coro.done():
                raise
            if cancel_parent:
                exec_coro.cancel()
            ret = await exec_coro
        finally:
            if self.context is None:
                _restore_context(context)
            self.deadlock_context.set(False)

        return ret

    def __get__(
        self, parent: Any, objtype: Any
    ) -> Callable[_P, Coroutine[Any, Any, _R]]:
        """
        Include self for methods
        """
        func = functools.partial(self.__call__, parent)
        return functools.update_wrapper(func, self.func)

    def thread_handler(self, loop, exc_info, task_context, func, *args, **kwargs):
        """
        Wraps the sync application with exception handling.
        """

        __traceback_hide__ = True  # noqa: F841

        # Set the threadlocal for AsyncToSync
        self.threadlocal.main_event_loop = loop
        self.threadlocal.main_event_loop_pid = os.getpid()
        self.threadlocal.task_context = task_context

        # Run the function
        # If we have an exception, run the function inside the except block
        # after raising it so exc_info is correctly populated.
        if exc_info[1]:
            try:
                raise exc_info[1]
            except BaseException:
                return func(*args, **kwargs)
        else:
            return func(*args, **kwargs)


@overload
def async_to_sync(
    *,
    force_new_loop: bool = False,
) -> Callable[
    [Union[Callable[_P, Coroutine[Any, Any, _R]], Callable[_P, Awaitable[_R]]]],
    Callable[_P, _R],
]:
    ...


@overload
def async_to_sync(
    awaitable: Union[
        Callable[_P, Coroutine[Any, Any, _R]],
        Callable[_P, Awaitable[_R]],
    ],
    *,
    force_new_loop: bool = False,
) -> Callable[_P, _R]:
    ...


def async_to_sync(
    awaitable: Optional[
        Union[
            Callable[_P, Coroutine[Any, Any, _R]],
            Callable[_P, Awaitable[_R]],
        ]
    ] = None,
    *,
    force_new_loop: bool = False,
) -> Union[
    Callable[
        [Union[Callable[_P, Coroutine[Any, Any, _R]], Callable[_P, Awaitable[_R]]]],
        Callable[_P, _R],
    ],
    Callable[_P, _R],
]:
    if awaitable is None:
        return lambda f: AsyncToSync(
            f,
            force_new_loop=force_new_loop,
        )
    return AsyncToSync(
        awaitable,
        force_new_loop=force_new_loop,
    )


@overload
def sync_to_async(
    *,
    thread_sensitive: bool = True,
    executor: Optional["ThreadPoolExecutor"] = None,
    context: Optional[contextvars.Context] = None,
) -> Callable[[Callable[_P, _R]], Callable[_P, Coroutine[Any, Any, _R]]]:
    ...


@overload
def sync_to_async(
    func: Callable[_P, _R],
    *,
    thread_sensitive: bool = True,
    executor: Optional["ThreadPoolExecutor"] = None,
    context: Optional[contextvars.Context] = None,
) -> Callable[_P, Coroutine[Any, Any, _R]]:
    ...


def sync_to_async(
    func: Optional[Callable[_P, _R]] = None,
    *,
    thread_sensitive: bool = True,
    executor: Optional["ThreadPoolExecutor"] = None,
    context: Optional[contextvars.Context] = None,
) -> Union[
    Callable[[Callable[_P, _R]], Callable[_P, Coroutine[Any, Any, _R]]],
    Callable[_P, Coroutine[Any, Any, _R]],
]:
    if func is None:
        return lambda f: SyncToAsync(
            f,
            thread_sensitive=thread_sensitive,
            executor=executor,
            context=context,
        )
    return SyncToAsync(
        func,
        thread_sensitive=thread_sensitive,
        executor=executor,
        context=context,
    )


---
VENV/LIB/PYTHON3.12/SITE-PACKAGES/ASGIREF/COMPATIBILITY.PY:

import inspect

from .sync import iscoroutinefunction


def is_double_callable(application):
    """
    Tests to see if an application is a legacy-style (double-callable) application.
    """
    # Look for a hint on the object first
    if getattr(application, "_asgi_single_callable", False):
        return False
    if getattr(application, "_asgi_double_callable", False):
        return True
    # Uninstanted classes are double-callable
    if inspect.isclass(application):
        return True
    # Instanted classes depend on their __call__
    if hasattr(application, "__call__"):
        # We only check to see if its __call__ is a coroutine function -
        # if it's not, it still might be a coroutine function itself.
        if iscoroutinefunction(application.__call__):
            return False
    # Non-classes we just check directly
    return not iscoroutinefunction(application)


def double_to_single_callable(application):
    """
    Transforms a double-callable ASGI application into a single-callable one.
    """

    async def new_application(scope, receive, send):
        instance = application(scope)
        return await instance(receive, send)

    return new_application


def guarantee_single_callable(application):
    """
    Takes either a single- or double-callable application and always returns it
    in single-callable style. Use this to add backwards compatibility for ASGI
    2.0 applications to your server/test harness/etc.
    """
    if is_double_callable(application):
        application = double_to_single_callable(application)
    return application


---
VENV/LIB/PYTHON3.12/SITE-PACKAGES/ASGIREF/SERVER.PY:

import asyncio
import logging
import time
import traceback

from .compatibility import guarantee_single_callable

logger = logging.getLogger(__name__)


class StatelessServer:
    """
    Base server class that handles basic concepts like application instance
    creation/pooling, exception handling, and similar, for stateless protocols
    (i.e. ones without actual incoming connections to the process)

    Your code should override the handle() method, doing whatever it needs to,
    and calling get_or_create_application_instance with a unique `scope_id`
    and `scope` for the scope it wants to get.

    If an application instance is found with the same `scope_id`, you are
    given its input queue, otherwise one is made for you with the scope provided
    and you are given that fresh new input queue. Either way, you should do
    something like:

    input_queue = self.get_or_create_application_instance(
        "user-123456",
        {"type": "testprotocol", "user_id": "123456", "username": "andrew"},
    )
    input_queue.put_nowait(message)

    If you try and create an application instance and there are already
    `max_application` instances, the oldest/least recently used one will be
    reclaimed and shut down to make space.

    Application coroutines that error will be found periodically (every 100ms
    by default) and have their exceptions printed to the console. Override
    application_exception() if you want to do more when this happens.

    If you override run(), make sure you handle things like launching the
    application checker.
    """

    application_checker_interval = 0.1

    def __init__(self, application, max_applications=1000):
        # Parameters
        self.application = application
        self.max_applications = max_applications
        # Initialisation
        self.application_instances = {}

    ### Mainloop and handling

    def run(self):
        """
        Runs the asyncio event loop with our handler loop.
        """
        event_loop = asyncio.get_event_loop()
        try:
            event_loop.run_until_complete(self.arun())
        except KeyboardInterrupt:
            logger.info("Exiting due to Ctrl-C/interrupt")

    async def arun(self):
        """
        Runs the asyncio event loop with our handler loop.
        """

        class Done(Exception):
            pass

        async def handle():
            await self.handle()
            raise Done

        try:
            await asyncio.gather(self.application_checker(), handle())
        except Done:
            pass

    async def handle(self):
        raise NotImplementedError("You must implement handle()")

    async def application_send(self, scope, message):
        """
        Receives outbound sends from applications and handles them.
        """
        raise NotImplementedError("You must implement application_send()")

    ### Application instance management

    def get_or_create_application_instance(self, scope_id, scope):
        """
        Creates an application instance and returns its queue.
        """
        if scope_id in self.application_instances:
            self.application_instances[scope_id]["last_used"] = time.time()
            return self.application_instances[scope_id]["input_queue"]
        # See if we need to delete an old one
        while len(self.application_instances) > self.max_applications:
            self.delete_oldest_application_instance()
        # Make an instance of the application
        input_queue = asyncio.Queue()
        application_instance = guarantee_single_callable(self.application)
        # Run it, and stash the future for later checking
        future = asyncio.ensure_future(
            application_instance(
                scope=scope,
                receive=input_queue.get,
                send=lambda message: self.application_send(scope, message),
            ),
        )
        self.application_instances[scope_id] = {
            "input_queue": input_queue,
            "future": future,
            "scope": scope,
            "last_used": time.time(),
        }
        return input_queue

    def delete_oldest_application_instance(self):
        """
        Finds and deletes the oldest application instance
        """
        oldest_time = min(
            details["last_used"] for details in self.application_instances.values()
        )
        for scope_id, details in self.application_instances.items():
            if details["last_used"] == oldest_time:
                self.delete_application_instance(scope_id)
                # Return to make sure we only delete one in case two have
                # the same oldest time
                return

    def delete_application_instance(self, scope_id):
        """
        Removes an application instance (makes sure its task is stopped,
        then removes it from the current set)
        """
        details = self.application_instances[scope_id]
        del self.application_instances[scope_id]
        if not details["future"].done():
            details["future"].cancel()

    async def application_checker(self):
        """
        Goes through the set of current application instance Futures and cleans up
        any that are done/prints exceptions for any that errored.
        """
        while True:
            await asyncio.sleep(self.application_checker_interval)
            for scope_id, details in list(self.application_instances.items()):
                if details["future"].done():
                    exception = details["future"].exception()
                    if exception:
                        await self.application_exception(exception, details)
                    try:
                        del self.application_instances[scope_id]
                    except KeyError:
                        # Exception handling might have already got here before us. That's fine.
                        pass

    async def application_exception(self, exception, application_details):
        """
        Called whenever an application coroutine has an exception.
        """
        logging.error(
            "Exception inside application: %s\n%s%s",
            exception,
            "".join(traceback.format_tb(exception.__traceback__)),
            f"  {exception}",
        )


---
VENV/LIB/PYTHON3.12/SITE-PACKAGES/ASGIREF/LOCAL.PY:

import asyncio
import contextlib
import contextvars
import threading
from typing import Any, Dict, Union


class _CVar:
    """Storage utility for Local."""

    def __init__(self) -> None:
        self._data: "contextvars.ContextVar[Dict[str, Any]]" = contextvars.ContextVar(
            "asgiref.local"
        )

    def __getattr__(self, key):
        storage_object = self._data.get({})
        try:
            return storage_object[key]
        except KeyError:
            raise AttributeError(f"{self!r} object has no attribute {key!r}")

    def __setattr__(self, key: str, value: Any) -> None:
        if key == "_data":
            return super().__setattr__(key, value)

        storage_object = self._data.get({}).copy()
        storage_object[key] = value
        self._data.set(storage_object)

    def __delattr__(self, key: str) -> None:
        storage_object = self._data.get({}).copy()
        if key in storage_object:
            del storage_object[key]
            self._data.set(storage_object)
        else:
            raise AttributeError(f"{self!r} object has no attribute {key!r}")


class Local:
    """Local storage for async tasks.

    This is a namespace object (similar to `threading.local`) where data is
    also local to the current async task (if there is one).

    In async threads, local means in the same sense as the `contextvars`
    module - i.e. a value set in an async frame will be visible:

    - to other async code `await`-ed from this frame.
    - to tasks spawned using `asyncio` utilities (`create_task`, `wait_for`,
      `gather` and probably others).
    - to code scheduled in a sync thread using `sync_to_async`

    In "sync" threads (a thread with no async event loop running), the
    data is thread-local, but additionally shared with async code executed
    via the `async_to_sync` utility, which schedules async code in a new thread
    and copies context across to that thread.

    If `thread_critical` is True, then the local will only be visible per-thread,
    behaving exactly like `threading.local` if the thread is sync, and as
    `contextvars` if the thread is async. This allows genuinely thread-sensitive
    code (such as DB handles) to be kept stricly to their initial thread and
    disable the sharing across `sync_to_async` and `async_to_sync` wrapped calls.

    Unlike plain `contextvars` objects, this utility is threadsafe.
    """

    def __init__(self, thread_critical: bool = False) -> None:
        self._thread_critical = thread_critical
        self._thread_lock = threading.RLock()

        self._storage: "Union[threading.local, _CVar]"

        if thread_critical:
            # Thread-local storage
            self._storage = threading.local()
        else:
            # Contextvar storage
            self._storage = _CVar()

    @contextlib.contextmanager
    def _lock_storage(self):
        # Thread safe access to storage
        if self._thread_critical:
            is_async = True
            try:
                # this is a test for are we in a async or sync
                # thread - will raise RuntimeError if there is
                # no current loop
                asyncio.get_running_loop()
            except RuntimeError:
                is_async = False
            if not is_async:
                # We are in a sync thread, the storage is
                # just the plain thread local (i.e, "global within
                # this thread" - it doesn't matter where you are
                # in a call stack you see the same storage)
                yield self._storage
            else:
                # We are in an async thread - storage is still
                # local to this thread, but additionally should
                # behave like a context var (is only visible with
                # the same async call stack)

                # Ensure context exists in the current thread
                if not hasattr(self._storage, "cvar"):
                    self._storage.cvar = _CVar()

                # self._storage is a thread local, so the members
                # can't be accessed in another thread (we don't
                # need any locks)
                yield self._storage.cvar
        else:
            # Lock for thread_critical=False as other threads
            # can access the exact same storage object
            with self._thread_lock:
                yield self._storage

    def __getattr__(self, key):
        with self._lock_storage() as storage:
            return getattr(storage, key)

    def __setattr__(self, key, value):
        if key in ("_local", "_storage", "_thread_critical", "_thread_lock"):
            return super().__setattr__(key, value)
        with self._lock_storage() as storage:
            setattr(storage, key, value)

    def __delattr__(self, key):
        with self._lock_storage() as storage:
            delattr(storage, key)


---
VENV/LIB/PYTHON3.12/SITE-PACKAGES/ASGIREF/CURRENT_THREAD_EXECUTOR.PY:

import sys
import threading
from collections import deque
from concurrent.futures import Executor, Future
from typing import Any, Callable, TypeVar

if sys.version_info >= (3, 10):
    from typing import ParamSpec
else:
    from typing_extensions import ParamSpec

_T = TypeVar("_T")
_P = ParamSpec("_P")
_R = TypeVar("_R")


class _WorkItem:
    """
    Represents an item needing to be run in the executor.
    Copied from ThreadPoolExecutor (but it's private, so we're not going to rely on importing it)
    """

    def __init__(
        self,
        future: "Future[_R]",
        fn: Callable[_P, _R],
        *args: _P.args,
        **kwargs: _P.kwargs,
    ):
        self.future = future
        self.fn = fn
        self.args = args
        self.kwargs = kwargs

    def run(self) -> None:
        __traceback_hide__ = True  # noqa: F841
        if not self.future.set_running_or_notify_cancel():
            return
        try:
            result = self.fn(*self.args, **self.kwargs)
        except BaseException as exc:
            self.future.set_exception(exc)
            # Break a reference cycle with the exception 'exc'
            self = None  # type: ignore[assignment]
        else:
            self.future.set_result(result)


class CurrentThreadExecutor(Executor):
    """
    An Executor that actually runs code in the thread it is instantiated in.
    Passed to other threads running async code, so they can run sync code in
    the thread they came from.
    """

    def __init__(self, old_executor: "CurrentThreadExecutor | None") -> None:
        self._work_thread = threading.current_thread()
        self._work_ready = threading.Condition(threading.Lock())
        self._work_items = deque[_WorkItem]()  # synchronized by _work_ready
        self._broken = False  # synchronized by _work_ready
        self._old_executor = old_executor

    def run_until_future(self, future: "Future[Any]") -> None:
        """
        Runs the code in the work queue until a result is available from the future.
        Should be run from the thread the executor is initialised in.
        """
        # Check we're in the right thread
        if threading.current_thread() != self._work_thread:
            raise RuntimeError(
                "You cannot run CurrentThreadExecutor from a different thread"
            )

        def done(future: "Future[Any]") -> None:
            with self._work_ready:
                self._broken = True
                self._work_ready.notify()

        future.add_done_callback(done)
        # Keep getting and running work items until the future we're waiting for
        # is done and the queue is empty.
        while True:
            with self._work_ready:
                while not self._work_items and not self._broken:
                    self._work_ready.wait()
                if not self._work_items:
                    break
                # Get a work item and run it
                work_item = self._work_items.popleft()
            work_item.run()
            del work_item

    def submit(
        self,
        fn: Callable[_P, _R],
        /,
        *args: _P.args,
        **kwargs: _P.kwargs,
    ) -> "Future[_R]":
        # Check they're not submitting from the same thread
        if threading.current_thread() == self._work_thread:
            raise RuntimeError(
                "You cannot submit onto CurrentThreadExecutor from its own thread"
            )
        f: "Future[_R]" = Future()
        work_item = _WorkItem(f, fn, *args, **kwargs)

        # Walk up the CurrentThreadExecutor stack to find the closest one still
        # running
        executor = self
        while True:
            with executor._work_ready:
                if not executor._broken:
                    # Add to work queue
                    executor._work_items.append(work_item)
                    executor._work_ready.notify()
                    break
            if executor._old_executor is None:
                raise RuntimeError("CurrentThreadExecutor already quit or is broken")
            executor = executor._old_executor

        # Return the future
        return f


---
VENV/LIB/PYTHON3.12/SITE-PACKAGES/ASGIREF/TIMEOUT.PY:

# This code is originally sourced from the aio-libs project "async_timeout",
# under the Apache 2.0 license. You may see the original project at
# https://github.com/aio-libs/async-timeout

# It is vendored here to reduce chain-dependencies on this library, and
# modified slightly to remove some features we don't use.


import asyncio
import warnings
from types import TracebackType
from typing import Any  # noqa
from typing import Optional, Type


class timeout:
    """timeout context manager.

    Useful in cases when you want to apply timeout logic around block
    of code or in cases when asyncio.wait_for is not suitable. For example:

    >>> with timeout(0.001):
    ...     async with aiohttp.get('https://github.com') as r:
    ...         await r.text()


    timeout - value in seconds or None to disable timeout logic
    loop - asyncio compatible event loop
    """

    def __init__(
        self,
        timeout: Optional[float],
        *,
        loop: Optional[asyncio.AbstractEventLoop] = None,
    ) -> None:
        self._timeout = timeout
        if loop is None:
            loop = asyncio.get_running_loop()
        else:
            warnings.warn(
                """The loop argument to timeout() is deprecated.""", DeprecationWarning
            )
        self._loop = loop
        self._task = None  # type: Optional[asyncio.Task[Any]]
        self._cancelled = False
        self._cancel_handler = None  # type: Optional[asyncio.Handle]
        self._cancel_at = None  # type: Optional[float]

    def __enter__(self) -> "timeout":
        return self._do_enter()

    def __exit__(
        self,
        exc_type: Type[BaseException],
        exc_val: BaseException,
        exc_tb: TracebackType,
    ) -> Optional[bool]:
        self._do_exit(exc_type)
        return None

    async def __aenter__(self) -> "timeout":
        return self._do_enter()

    async def __aexit__(
        self,
        exc_type: Type[BaseException],
        exc_val: BaseException,
        exc_tb: TracebackType,
    ) -> None:
        self._do_exit(exc_type)

    @property
    def expired(self) -> bool:
        return self._cancelled

    @property
    def remaining(self) -> Optional[float]:
        if self._cancel_at is not None:
            return max(self._cancel_at - self._loop.time(), 0.0)
        else:
            return None

    def _do_enter(self) -> "timeout":
        # Support Tornado 5- without timeout
        # Details: https://github.com/python/asyncio/issues/392
        if self._timeout is None:
            return self

        self._task = asyncio.current_task(self._loop)
        if self._task is None:
            raise RuntimeError(
                "Timeout context manager should be used " "inside a task"
            )

        if self._timeout <= 0:
            self._loop.call_soon(self._cancel_task)
            return self

        self._cancel_at = self._loop.time() + self._timeout
        self._cancel_handler = self._loop.call_at(self._cancel_at, self._cancel_task)
        return self

    def _do_exit(self, exc_type: Type[BaseException]) -> None:
        if exc_type is asyncio.CancelledError and self._cancelled:
            self._cancel_handler = None
            self._task = None
            raise asyncio.TimeoutError
        if self._timeout is not None and self._cancel_handler is not None:
            self._cancel_handler.cancel()
            self._cancel_handler = None
        self._task = None
        return None

    def _cancel_task(self) -> None:
        if self._task is not None:
            self._task.cancel()
            self._cancelled = True


---
VENV/LIB/PYTHON3.12/SITE-PACKAGES/ASGIREF/__INIT__.PY:

__version__ = "3.11.0"


---
VENV/LIB/PYTHON3.12/SITE-PACKAGES/ASGIREF/PY.TYPED:



---
VENV/LIB/PYTHON3.12/SITE-PACKAGES/ASGIREF/TYPING.PY:

import sys
from typing import (
    Any,
    Awaitable,
    Callable,
    Dict,
    Iterable,
    Literal,
    Optional,
    Protocol,
    Tuple,
    Type,
    TypedDict,
    Union,
)

if sys.version_info >= (3, 11):
    from typing import NotRequired
else:
    from typing_extensions import NotRequired

__all__ = (
    "ASGIVersions",
    "HTTPScope",
    "WebSocketScope",
    "LifespanScope",
    "WWWScope",
    "Scope",
    "HTTPRequestEvent",
    "HTTPResponseStartEvent",
    "HTTPResponseBodyEvent",
    "HTTPResponseTrailersEvent",
    "HTTPResponsePathsendEvent",
    "HTTPServerPushEvent",
    "HTTPDisconnectEvent",
    "WebSocketConnectEvent",
    "WebSocketAcceptEvent",
    "WebSocketReceiveEvent",
    "WebSocketSendEvent",
    "WebSocketResponseStartEvent",
    "WebSocketResponseBodyEvent",
    "WebSocketDisconnectEvent",
    "WebSocketCloseEvent",
    "LifespanStartupEvent",
    "LifespanShutdownEvent",
    "LifespanStartupCompleteEvent",
    "LifespanStartupFailedEvent",
    "LifespanShutdownCompleteEvent",
    "LifespanShutdownFailedEvent",
    "ASGIReceiveEvent",
    "ASGISendEvent",
    "ASGIReceiveCallable",
    "ASGISendCallable",
    "ASGI2Protocol",
    "ASGI2Application",
    "ASGI3Application",
    "ASGIApplication",
)


class ASGIVersions(TypedDict):
    spec_version: str
    version: Union[Literal["2.0"], Literal["3.0"]]


class HTTPScope(TypedDict):
    type: Literal["http"]
    asgi: ASGIVersions
    http_version: str
    method: str
    scheme: str
    path: str
    raw_path: bytes
    query_string: bytes
    root_path: str
    headers: Iterable[Tuple[bytes, bytes]]
    client: Optional[Tuple[str, int]]
    server: Optional[Tuple[str, Optional[int]]]
    state: NotRequired[Dict[str, Any]]
    extensions: Optional[Dict[str, Dict[object, object]]]


class WebSocketScope(TypedDict):
    type: Literal["websocket"]
    asgi: ASGIVersions
    http_version: str
    scheme: str
    path: str
    raw_path: bytes
    query_string: bytes
    root_path: str
    headers: Iterable[Tuple[bytes, bytes]]
    client: Optional[Tuple[str, int]]
    server: Optional[Tuple[str, Optional[int]]]
    subprotocols: Iterable[str]
    state: NotRequired[Dict[str, Any]]
    extensions: Optional[Dict[str, Dict[object, object]]]


class LifespanScope(TypedDict):
    type: Literal["lifespan"]
    asgi: ASGIVersions
    state: NotRequired[Dict[str, Any]]


WWWScope = Union[HTTPScope, WebSocketScope]
Scope = Union[HTTPScope, WebSocketScope, LifespanScope]


class HTTPRequestEvent(TypedDict):
    type: Literal["http.request"]
    body: bytes
    more_body: bool


class HTTPResponseDebugEvent(TypedDict):
    type: Literal["http.response.debug"]
    info: Dict[str, object]


class HTTPResponseStartEvent(TypedDict):
    type: Literal["http.response.start"]
    status: int
    headers: Iterable[Tuple[bytes, bytes]]
    trailers: bool


class HTTPResponseBodyEvent(TypedDict):
    type: Literal["http.response.body"]
    body: bytes
    more_body: bool


class HTTPResponseTrailersEvent(TypedDict):
    type: Literal["http.response.trailers"]
    headers: Iterable[Tuple[bytes, bytes]]
    more_trailers: bool


class HTTPResponsePathsendEvent(TypedDict):
    type: Literal["http.response.pathsend"]
    path: str


class HTTPServerPushEvent(TypedDict):
    type: Literal["http.response.push"]
    path: str
    headers: Iterable[Tuple[bytes, bytes]]


class HTTPDisconnectEvent(TypedDict):
    type: Literal["http.disconnect"]


class WebSocketConnectEvent(TypedDict):
    type: Literal["websocket.connect"]


class WebSocketAcceptEvent(TypedDict):
    type: Literal["websocket.accept"]
    subprotocol: Optional[str]
    headers: Iterable[Tuple[bytes, bytes]]


class WebSocketReceiveEvent(TypedDict):
    type: Literal["websocket.receive"]
    bytes: Optional[bytes]
    text: Optional[str]


class WebSocketSendEvent(TypedDict):
    type: Literal["websocket.send"]
    bytes: Optional[bytes]
    text: Optional[str]


class WebSocketResponseStartEvent(TypedDict):
    type: Literal["websocket.http.response.start"]
    status: int
    headers: Iterable[Tuple[bytes, bytes]]


class WebSocketResponseBodyEvent(TypedDict):
    type: Literal["websocket.http.response.body"]
    body: bytes
    more_body: bool


class WebSocketDisconnectEvent(TypedDict):
    type: Literal["websocket.disconnect"]
    code: int
    reason: Optional[str]


class WebSocketCloseEvent(TypedDict):
    type: Literal["websocket.close"]
    code: int
    reason: Optional[str]


class LifespanStartupEvent(TypedDict):
    type: Literal["lifespan.startup"]


class LifespanShutdownEvent(TypedDict):
    type: Literal["lifespan.shutdown"]


class LifespanStartupCompleteEvent(TypedDict):
    type: Literal["lifespan.startup.complete"]


class LifespanStartupFailedEvent(TypedDict):
    type: Literal["lifespan.startup.failed"]
    message: str


class LifespanShutdownCompleteEvent(TypedDict):
    type: Literal["lifespan.shutdown.complete"]


class LifespanShutdownFailedEvent(TypedDict):
    type: Literal["lifespan.shutdown.failed"]
    message: str


ASGIReceiveEvent = Union[
    HTTPRequestEvent,
    HTTPDisconnectEvent,
    WebSocketConnectEvent,
    WebSocketReceiveEvent,
    WebSocketDisconnectEvent,
    LifespanStartupEvent,
    LifespanShutdownEvent,
]


ASGISendEvent = Union[
    HTTPResponseStartEvent,
    HTTPResponseBodyEvent,
    HTTPResponseTrailersEvent,
    HTTPServerPushEvent,
    HTTPDisconnectEvent,
    WebSocketAcceptEvent,
    WebSocketSendEvent,
    WebSocketResponseStartEvent,
    WebSocketResponseBodyEvent,
    WebSocketCloseEvent,
    LifespanStartupCompleteEvent,
    LifespanStartupFailedEvent,
    LifespanShutdownCompleteEvent,
    LifespanShutdownFailedEvent,
]


ASGIReceiveCallable = Callable[[], Awaitable[ASGIReceiveEvent]]
ASGISendCallable = Callable[[ASGISendEvent], Awaitable[None]]


class ASGI2Protocol(Protocol):
    def __init__(self, scope: Scope) -> None:
        ...

    async def __call__(
        self, receive: ASGIReceiveCallable, send: ASGISendCallable
    ) -> None:
        ...


ASGI2Application = Type[ASGI2Protocol]
ASGI3Application = Callable[
    [
        Scope,
        ASGIReceiveCallable,
        ASGISendCallable,
    ],
    Awaitable[None],
]
ASGIApplication = Union[ASGI2Application, ASGI3Application]


---
VENV/LIB/PYTHON3.12/SITE-PACKAGES/ASGIREF/TESTING.PY:

import asyncio
import contextvars
import time

from .compatibility import guarantee_single_callable
from .timeout import timeout as async_timeout


class ApplicationCommunicator:
    """
    Runs an ASGI application in a test mode, allowing sending of
    messages to it and retrieval of messages it sends.
    """

    def __init__(self, application, scope):
        self._future = None
        self.application = guarantee_single_callable(application)
        self.scope = scope
        self._input_queue = None
        self._output_queue = None

    # For Python 3.9 we need to lazily bind the queues, on 3.10+ they bind the
    # event loop lazily.
    @property
    def input_queue(self):
        if self._input_queue is None:
            self._input_queue = asyncio.Queue()
        return self._input_queue

    @property
    def output_queue(self):
        if self._output_queue is None:
            self._output_queue = asyncio.Queue()
        return self._output_queue

    @property
    def future(self):
        if self._future is None:
            # Clear context - this ensures that context vars set in the testing scope
            # are not "leaked" into the application which would normally begin with
            # an empty context. In Python >= 3.11 this could also be written as:
            # asyncio.create_task(..., context=contextvars.Context())
            self._future = contextvars.Context().run(
                asyncio.create_task,
                self.application(
                    self.scope, self.input_queue.get, self.output_queue.put
                ),
            )
        return self._future

    async def wait(self, timeout=1):
        """
        Waits for the application to stop itself and returns any exceptions.
        """
        try:
            async with async_timeout(timeout):
                try:
                    await self.future
                    self.future.result()
                except asyncio.CancelledError:
                    pass
        finally:
            if not self.future.done():
                self.future.cancel()
                try:
                    await self.future
                except asyncio.CancelledError:
                    pass

    def stop(self, exceptions=True):
        future = self._future
        if future is None:
            return

        if not future.done():
            future.cancel()
        elif exceptions:
            # Give a chance to raise any exceptions
            future.result()

    def __del__(self):
        # Clean up on deletion
        try:
            self.stop(exceptions=False)
        except RuntimeError:
            # Event loop already stopped
            pass

    async def send_input(self, message):
        """
        Sends a single message to the application
        """
        # Make sure there's not an exception to raise from the task
        if self.future.done():
            self.future.result()

        # Give it the message
        await self.input_queue.put(message)

    async def receive_output(self, timeout=1):
        """
        Receives a single message from the application, with optional timeout.
        """
        # Make sure there's not an exception to raise from the task
        if self.future.done():
            self.future.result()
        # Wait and receive the message
        try:
            async with async_timeout(timeout):
                return await self.output_queue.get()
        except asyncio.TimeoutError as e:
            # See if we have another error to raise inside
            if self.future.done():
                self.future.result()
            else:
                self.future.cancel()
                try:
                    await self.future
                except asyncio.CancelledError:
                    pass
            raise e

    async def receive_nothing(self, timeout=0.1, interval=0.01):
        """
        Checks that there is no message to receive in the given time.
        """
        # Make sure there's not an exception to raise from the task
        if self.future.done():
            self.future.result()

        # `interval` has precedence over `timeout`
        start = time.monotonic()
        while time.monotonic() - start < timeout:
            if not self.output_queue.empty():
                return False
            await asyncio.sleep(interval)
        return self.output_queue.empty()


---
VENV/LIB/PYTHON3.12/SITE-PACKAGES/ASGIREF/WSGI.PY:

import sys
from tempfile import SpooledTemporaryFile

from asgiref.sync import AsyncToSync, sync_to_async


class WsgiToAsgi:
    """
    Wraps a WSGI application to make it into an ASGI application.
    """

    def __init__(self, wsgi_application):
        self.wsgi_application = wsgi_application

    async def __call__(self, scope, receive, send):
        """
        ASGI application instantiation point.
        We return a new WsgiToAsgiInstance here with the WSGI app
        and the scope, ready to respond when it is __call__ed.
        """
        await WsgiToAsgiInstance(self.wsgi_application)(scope, receive, send)


class WsgiToAsgiInstance:
    """
    Per-socket instance of a wrapped WSGI application
    """

    def __init__(self, wsgi_application):
        self.wsgi_application = wsgi_application
        self.response_started = False
        self.response_content_length = None

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            raise ValueError("WSGI wrapper received a non-HTTP scope")
        self.scope = scope
        with SpooledTemporaryFile(max_size=65536) as body:
            # Alright, wait for the http.request messages
            while True:
                message = await receive()
                if message["type"] != "http.request":
                    raise ValueError("WSGI wrapper received a non-HTTP-request message")
                body.write(message.get("body", b""))
                if not message.get("more_body"):
                    break
            body.seek(0)
            # Wrap send so it can be called from the subthread
            self.sync_send = AsyncToSync(send)
            # Call the WSGI app
            await self.run_wsgi_app(body)

    def build_environ(self, scope, body):
        """
        Builds a scope and request body into a WSGI environ object.
        """
        script_name = scope.get("root_path", "").encode("utf8").decode("latin1")
        path_info = scope["path"].encode("utf8").decode("latin1")
        if path_info.startswith(script_name):
            path_info = path_info[len(script_name) :]
        environ = {
            "REQUEST_METHOD": scope["method"],
            "SCRIPT_NAME": script_name,
            "PATH_INFO": path_info,
            "QUERY_STRING": scope["query_string"].decode("ascii"),
            "SERVER_PROTOCOL": "HTTP/%s" % scope["http_version"],
            "wsgi.version": (1, 0),
            "wsgi.url_scheme": scope.get("scheme", "http"),
            "wsgi.input": body,
            "wsgi.errors": sys.stderr,
            "wsgi.multithread": True,
            "wsgi.multiprocess": True,
            "wsgi.run_once": False,
        }
        # Get server name and port - required in WSGI, not in ASGI
        if "server" in scope:
            environ["SERVER_NAME"] = scope["server"][0]
            environ["SERVER_PORT"] = str(scope["server"][1])
        else:
            environ["SERVER_NAME"] = "localhost"
            environ["SERVER_PORT"] = "80"

        if scope.get("client") is not None:
            environ["REMOTE_ADDR"] = scope["client"][0]

        # Go through headers and make them into environ entries
        for name, value in self.scope.get("headers", []):
            name = name.decode("latin1")
            if name == "content-length":
                corrected_name = "CONTENT_LENGTH"
            elif name == "content-type":
                corrected_name = "CONTENT_TYPE"
            else:
                corrected_name = "HTTP_%s" % name.upper().replace("-", "_")
            # HTTPbis say only ASCII chars are allowed in headers, but we latin1 just in case
            value = value.decode("latin1")
            if corrected_name in environ:
                value = environ[corrected_name] + "," + value
            environ[corrected_name] = value
        return environ

    def start_response(self, status, response_headers, exc_info=None):
        """
        WSGI start_response callable.
        """
        # Don't allow re-calling once response has begun
        if self.response_started:
            raise exc_info[1].with_traceback(exc_info[2])
        # Don't allow re-calling without exc_info
        if hasattr(self, "response_start") and exc_info is None:
            raise ValueError(
                "You cannot call start_response a second time without exc_info"
            )
        # Extract status code
        status_code, _ = status.split(" ", 1)
        status_code = int(status_code)
        # Extract headers
        headers = [
            (name.lower().encode("ascii"), value.encode("ascii"))
            for name, value in response_headers
        ]
        # Extract content-length
        self.response_content_length = None
        for name, value in response_headers:
            if name.lower() == "content-length":
                self.response_content_length = int(value)
        # Build and send response start message.
        self.response_start = {
            "type": "http.response.start",
            "status": status_code,
            "headers": headers,
        }

    @sync_to_async
    def run_wsgi_app(self, body):
        """
        Called in a subthread to run the WSGI app. We encapsulate like
        this so that the start_response callable is called in the same thread.
        """
        # Translate the scope and incoming request body into a WSGI environ
        environ = self.build_environ(self.scope, body)
        # Run the WSGI app
        bytes_sent = 0
        for output in self.wsgi_application(environ, self.start_response):
            # If this is the first response, include the response headers
            if not self.response_started:
                self.response_started = True
                self.sync_send(self.response_start)
            # If the application supplies a Content-Length header
            if self.response_content_length is not None:
                # The server should not transmit more bytes to the client than the header allows
                bytes_allowed = self.response_content_length - bytes_sent
                if len(output) > bytes_allowed:
                    output = output[:bytes_allowed]
            self.sync_send(
                {"type": "http.response.body", "body": output, "more_body": True}
            )
            bytes_sent += len(output)
            # The server should stop iterating over the response when enough data has been sent
            if bytes_sent == self.response_content_length:
                break
        # Close connection
        if not self.response_started:
            self.response_started = True
            self.sync_send(self.response_start)
        self.sync_send({"type": "http.response.body"})


