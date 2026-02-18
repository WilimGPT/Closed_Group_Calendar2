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
