// frontend/src/composables/useCart.js
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'fermaskot-cart'

// Estado global del carrito (se comparte en toda la app)
const cart = ref(loadInitialCart())

function loadInitialCart() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Error leyendo carrito de localStorage', e)
    return []
  }
}

// Guardar en localStorage cada vez que cambie el carrito
watch(
  cart,
  (value) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true }
)

// Añadir producto al carrito
function addToCart(product) {
  const existing = cart.value.find((item) => item.product.id === product.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({ product, quantity: 1 })
  }
}

// Eliminar producto por id
function removeFromCart(productId) {
  cart.value = cart.value.filter((item) => item.product.id !== productId)
}

// Cambiar cantidad
function changeQuantity(productId, quantity) {
  const item = cart.value.find((i) => i.product.id === productId)
  if (!item) return

  if (quantity <= 0) {
    removeFromCart(productId)
  } else {
    item.quantity = quantity
  }
}

// Vaciar carrito
function clearCart() {
  cart.value = []
}

// Totales
const totalItems = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0)
)

const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
)

export function useCart() {
  return {
    cart,
    addToCart,
    removeFromCart,
    changeQuantity,
    clearCart,
    totalItems,
    totalPrice
  }
}
