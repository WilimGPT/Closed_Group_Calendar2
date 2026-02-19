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

    <!-- ADD EXTRA CLASS BUTTON (EDIT MODE ONLY) -->
    <div v-if="editMode && sessions.length" class="extra-class-row">
      <el-button type="primary" size="mini" @click="openAddClass">
        Add Extra Class
      </el-button>
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

    <!-- ADD EXTRA CLASS MODAL -->
    <el-dialog
      title="Add Extra Class"
      :visible.sync="showAddClassModal"
      width="400px"
    >
      <div class="form-row">
        <label>Date</label>
        <el-date-picker v-model="addClassDate" type="date" />
      </div>

      <div class="form-row">
        <label>Time</label>
        <el-time-picker v-model="addClassTime" format="HH:mm" />
      </div>

      <div class="dialog-buttons">
        <el-button @click="showAddClassModal = false">Cancel</el-button>
        <el-button type="primary" @click="saveNewClass">OK</el-button>
      </div>
    </el-dialog>

    <!-- DELETE SESSION CONFIRM -->
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

    <!-- DELETE COURSE BUTTON + CONFIRM (EDIT MODE ONLY) -->
    <div v-if="editMode" class="delete-course-row">
      <el-button type="danger" @click="showDeleteCourseModal = true">
        Delete Course
      </el-button>
    </div>

    <el-dialog
      title="Delete Course"
      :visible.sync="showDeleteCourseModal"
      width="400px"
    >
      <p>
        Are you sure you want to delete this course and all of its classes?
      </p>

      <div class="dialog-buttons">
        <el-button @click="showDeleteCourseModal = false">Cancel</el-button>
        <el-button type="danger" @click="confirmDeleteCourse">
          Yes, delete course
        </el-button>
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
        groupReference: "",
      },

      sessions: [],
      results: [],

      editingIndex: null,
      editDate: null,
      editTime: null,

      showDeleteModal: false,
      deleteIndex: null,

      showConflictModal: false,
      pendingTeacher: null,

      // Add Extra Class modal
      showAddClassModal: false,
      addClassDate: null,
      addClassTime: null,

      // Delete Course modal
      showDeleteCourseModal: false
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

        const slotStart = DateTime.fromISO(
          `${slot.startDate}T${slot.startTime}`,
          { zone: slot.timeZone }
        ).toUTC()

        const slotEnd = DateTime.fromISO(
          `${slot.endDate}T${slot.endTime}`,
          { zone: slot.timeZone }
        ).toUTC()

        const weekdayOK = weekdaysArray.includes(
          sessionUTC.setZone(slot.timeZone).weekday
        )
        const withinDateRange =
          sessionUTC >= slotStart && endUTC <= slotEnd

        return weekdayOK && withinDateRange
      })

      const hasBookingConflict = (teacher.bookings || []).some(course =>
        course.sessions.some(s => {
          const cStart = DateTime.fromISO(s.startDateTime).toUTC()
          const cEnd = cStart.plus({ minutes: course.durationMinutes })
          return (
            (sessionUTC >= cStart && sessionUTC < cEnd) ||
            (endUTC > cStart && endUTC <= cEnd)
          )
        })
      )

      if (!hasAvailability) {
        return {
          teacherId: teacher.id,
          ok: false,
          message: "No availability"
        }
      }

      if (hasBookingConflict) {
        return {
          teacherId: teacher.id,
          ok: false,
          message: "Booking conflict"
        }
      }

      return {
        teacherId: teacher.id,
        ok: true,
        message: "OK"
      }
    },

    //---------------------------------------------------------------------
    // Edit existing session
    //---------------------------------------------------------------------
    openEditor(i) {
      this.editingIndex = i

      const s = this.sessions[i]
      const local = s.localDateTime.setZone(this.timeZone)

      this.editDate = local.toJSDate()
      this.editTime = local.toJSDate()
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
    // Add Extra Class (session) - edit mode only
    //---------------------------------------------------------------------
    openAddClass() {
      this.addClassDate = null
      this.addClassTime = null
      this.showAddClassModal = true
    },

    saveNewClass() {
      if (!this.addClassDate || !this.addClassTime) {
        this.$message.error("Please select both date and time for the new class.")
        return
      }

      const datePart = DateTime.fromJSDate(this.addClassDate)
      const timePart = DateTime.fromJSDate(this.addClassTime)

      const newLocal = datePart
        .set({
          hour: timePart.hour,
          minute: timePart.minute
        })
        .setZone(this.timeZone)

      const newSession = {
        localDateTime: newLocal,
        utcDateTime: newLocal.toUTC(),
        isCustom: true
      }

      this.sessions.push(newSession)
      this.recheck()

      this.showAddClassModal = false
      this.addClassDate = null
      this.addClassTime = null
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
        groupReference: this.form.groupReference,
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
    },

    //---------------------------------------------------------------------
    // Delete entire course (edit mode only)
    //---------------------------------------------------------------------
    confirmDeleteCourse() {
      this.showDeleteCourseModal = false
      this.$emit("delete-course", { id: this.courseId })
    }
  }
}
</script>

<style scoped>
/* Wrapper around the course sessions table */
.table-wrapper {
  width: 100%;
  overflow-x: auto;      /* 👉 horizontal scroll when content is wider */
}

/* The table itself */
.availability-table {
  border-collapse: collapse;
  width: max-content;    /* size to content so scroll works properly */
  min-width: 100%;       /* but never smaller than the wrapper */
}

/* Optional: make cells a bit tighter so more fits on screen */
.availability-table th,
.availability-table td {
  padding: 6px 8px;
  white-space: nowrap;   /* keep teacher headers on one line */
}
</style>
