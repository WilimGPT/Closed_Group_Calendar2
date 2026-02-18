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
