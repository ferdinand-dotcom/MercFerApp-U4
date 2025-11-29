// frontend/src/composables/useProducts.js
import { ref } from 'vue'
import { useApi } from './useApi'

export function useProducts() {
  const {
    data: productsData,
    loading,
    error,
    get,
    post,
    put,
    del
  } = useApi()

  const {
    data: categoriesData,
    loading: loadingCategories,
    error: errorCategories,
    get: getCategoriesApi
  } = useApi()

  const products = ref([])
  const categories = ref([])

  const loadProducts = async () => {
    const result = await get('/api/products')
    if (result) products.value = result
  }

  const loadCategories = async () => {
    const result = await getCategoriesApi('/api/categories')
    if (result) categories.value = result
  }

  const getProductById = async (id) => {
    return await get(`/api/products/${id}`)
  }

  const createProduct = async (product) => {
    return await post('/api/products', product)
  }

  const updateProduct = async (id, product) => {
    return await put(`/api/products/${id}`, product)
  }

  const deleteProduct = async (id) => {
    return await del(`/api/products/${id}`)
  }

  return {
    // estados
    products,
    categories,
    loading,
    error,
    loadingCategories,
    errorCategories,
    // acciones
    loadProducts,
    loadCategories,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  }
}
