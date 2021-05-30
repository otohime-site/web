export const apiHost =
  process.env.NODE_ENV === "production" ? "api.otohi.me" : "localhost:8080"

const host =
  process.env.NODE_ENV === "production" ? "otohi.me" : "localhost:8080"
export default host
