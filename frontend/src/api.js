import axios from "axios"

// Default: local dev uses /api; production uses VUE_APP_API_BASE_URL
const baseURL = process.env.VUE_APP_API_BASE_URL || "/api/"

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
})

// Attach password from localStorage to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem("calendarPassword")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api