// frontend/src/composables/useApi.js
import { ref, onBeforeUnmount } from 'vue'

export function useApi(baseUrl = 'http://localhost:3001') {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  let controller = null

  const request = async (endpoint, options = {}, { retry = true } = {}) => {
    loading.value = true
    error.value = null
    data.value = null

    // cancelar petición anterior si existe
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
        const bodyText = await response.text().catch(() => '')
        throw new Error(`Error ${response.status}: ${bodyText || response.statusText}`)
      }

      const json = await response.json()
      data.value = json
      return json
    } catch (err) {
      if (err.name === 'AbortError') {
        // petición cancelada, no marcamos error
        return
      }

      // reintento simple UNA vez
      if (retry) {
        return request(endpoint, options, { retry: false })
      }

      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  const get = (endpoint) => request(endpoint)
  const post = (endpoint, body) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body) })
  const put = (endpoint, body) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body) })
  const del = (endpoint) => request(endpoint, { method: 'DELETE' })

  const cancel = () => {
    if (controller) controller.abort()
  }

  onBeforeUnmount(cancel)

  return { data, loading, error, get, post, put, del, cancel }
}
