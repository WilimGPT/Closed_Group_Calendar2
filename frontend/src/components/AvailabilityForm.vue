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
