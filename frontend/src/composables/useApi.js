// frontend/src/composables/useApi.js
import { ref, onBeforeUnmount } from 'vue'

const DEFAULT_BASE_URL = import.meta.env.VITE_API_URL || 'https://mercferapp-u4-production.up.railway.app/api'


export function useApi(baseUrl = DEFAULT_BASE_URL) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  let controller = null

  const request = async (endpoint, options = {}, { retry = true } = {}) => {
    loading.value = true
    error.value = null
    data.value = null

    if (controller) controller.abort()
    controller = new AbortController()
    options.signal = controller.signal

    const url = baseUrl + endpoint

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        },
        ...options
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Error HTTP ${response.status}`)
      }

      data.value = await response.json()
    } catch (err) {
      console.error('Error en request:', err)
      error.value = err.message || 'Error en la solicitud'
    } finally {
      loading.value = false
    }
  }

  onBeforeUnmount(() => {
    if (controller) controller.abort()
  })

  return {
    data,
    loading,
    error,
    request
  }
}
