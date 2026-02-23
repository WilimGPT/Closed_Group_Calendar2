<template>
  <div class="app-wrapper">

    <!-- LOGIN SCREEN -->
    <div v-if="!loggedIn" class="login-box">
      <h2>Please enter the password</h2>

      <el-input
        v-model="passwordInput"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Password"
        @keyup.enter="attemptLogin"
        class="mb-3"
      >
        <template slot="suffix">
          <i
            class="el-input__icon el-icon-view"
            :style="{ opacity: showPassword ? 1 : 0.5, cursor: 'pointer' }"
            @click.stop="showPassword = !showPassword"
          ></i>
        </template>
      </el-input>

      <el-button
        type="primary"
        :loading="loggingIn"
        @click="attemptLogin"
      >
        Log In
      </el-button>

      <div v-if="loginError" class="error-text">
        {{ loginError }}
      </div>
    </div>

    <!-- MAIN APP -->
    <div v-else>
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

  </div>
</template>

<script>
import AddAvailability from "./components/AddAvailability.vue"
import ViewAvailability from "./components/ViewAvailability.vue"
import AvailabilityChecker from "./components/AvailabilityChecker.vue"
import api from "./api"

export default {
  components: {
    AddAvailability,
    ViewAvailability,
    AvailabilityChecker
  },

  data() {
    return {
      view: null,

      // login-related
      loggedIn: false,
      passwordInput: "",
      loginError: "",
      loggingIn: false,

      showPassword: false
    }
  },

  mounted() {
    // If we already have a stored password, try it silently on load
    const stored = localStorage.getItem("calendarPassword")
    if (stored) {
      this.tryPassword(stored, { silent: true })
    }
  },

  methods: {
    async attemptLogin() {
      this.loginError = ""
      const pw = this.passwordInput.trim()
      if (!pw) {
        this.loginError = "Please enter a password"
        return
      }

      this.loggingIn = true
      await this.tryPassword(pw)
      this.loggingIn = false
    },

    async tryPassword(pw, { silent = false } = {}) {
      // Temporarily save password so axios interceptor will attach it
      localStorage.setItem("calendarPassword", pw)

      try {
        // Test with a simple call
        await api.get("en")

        // If it worked, mark user as logged in
        this.loggedIn = true
        this.passwordInput = ""
      } catch (err) {
        // If it failed, clear the stored password and show error
        localStorage.removeItem("calendarPassword")
        this.loggedIn = false
        if (!silent) {
          this.loginError = "Incorrect password"
        }
        console.error("Login failed", err)
      }
    }
  }
}
</script>

<style>
.app-wrapper {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 16px;
}

.login-box {
  max-width: 320px;
  margin: 80px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  text-align: center;
}

.mb-3 {
  margin-bottom: 12px;
}

.mb-4 {
  margin-bottom: 16px;
}

.ml-2 {
  margin-left: 8px;
}

.spacer-24 {
  height: 24px;
}

.error-text {
  margin-top: 10px;
  color: #d33;
  font-weight: 600;
}
</style>