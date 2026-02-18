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
