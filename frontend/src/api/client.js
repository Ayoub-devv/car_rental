import axios from 'axios'

export const ADMIN_TOKEN_STORAGE_KEY = 'car-rental-admin-token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
  },
})

export function applyAdminToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    window.localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token)
    return
  }

  delete api.defaults.headers.common.Authorization
  window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY)
}

const savedToken =
  typeof window !== 'undefined'
    ? window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY)
    : null

if (savedToken) {
  applyAdminToken(savedToken)
}

export default api
