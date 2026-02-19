<template>
  <div class="form-card wide">
    <h2>Availability Checker</h2>

    <!-- INPUTS -->
    <div class="checker-grid">

      <div class="form-row">
        <label>Language</label>
        <el-select v-model="language">
          <el-option label="English" value="en" />
          <el-option label="Spanish" value="es" />
          <el-option label="German" value="de" />
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
      language: "en",

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
