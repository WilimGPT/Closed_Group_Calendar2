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
