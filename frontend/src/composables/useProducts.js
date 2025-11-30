// frontend/src/composables/useProducts.js
import { ref } from 'vue'
import { useApi } from './useApi'

// OJO: useApi ya tiene por defecto 'http://localhost:3001/api'
const apiProducts = useApi()      // para productos
const apiCategories = useApi()    // otra instancia para categorías

const products = ref([])          // lista de productos
const categories = ref([])        // lista de categorías

const loading = ref(false)
const error = ref(null)

const loadingCategories = ref(false)
const errorCategories = ref(null)

async function loadProducts () {
  loading.value = true
  error.value = null
  try {
    // como la base ya trae /api, aquí solo ponemos /products
    await apiProducts.request('/products')
    const data = apiProducts.data.value
    products.value = Array.isArray(data) ? data : []
  } catch (err) {
    console.error('Error cargando productos:', err)
    error.value = err
  } finally {
    loading.value = false
  }
}

async function loadCategories () {
  loadingCategories.value = true
  errorCategories.value = null
  try {
    await apiCategories.request('/categories')
    const data = apiCategories.data.value
    categories.value = Array.isArray(data) ? data : []
  } catch (err) {
    console.error('Error cargando categorías:', err)
    errorCategories.value = err
  } finally {
    loadingCategories.value = false
  }
}

export function useProducts () {
  return {
    products,
    categories,
    loading,
    error,
    loadingCategories,
    errorCategories,
    loadProducts,
    loadCategories
  }
}
