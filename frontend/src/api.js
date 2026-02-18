import axios from "axios"

// Default to same-origin /api/ (works on Cloudflare Pages + Worker)
// Override locally with VUE_APP_API_BASE_URL, e.g. http://localhost:8787/api/
const baseURL = process.env.VUE_APP_API_BASE_URL || "/api/"

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
})

export default api
