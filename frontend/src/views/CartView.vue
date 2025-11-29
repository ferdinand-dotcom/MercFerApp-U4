<template>
  <div>
    <h2 class="title">Carrito de compras</h2>

    <div v-if="cart.length === 0" class="status">
      Carrito vacío
    </div>

    <div v-else class="cart">
      <div
        v-for="item in cart"
        :key="item.product.id"
        class="cart-item"
      >
        <div class="main">
          <h3>{{ item.product.name }}</h3>
          <p class="price-unit">
            Precio unitario: ${{ item.product.price }}
          </p>
        </div>

        <div class="controls">
          <label>
            Cantidad:
            <input
              type="number"
              min="1"
              v-model.number="item.quantity"
              @change="updateQuantity(item)"
            />
          </label>

          <p class="subtotal">
            Subtotal: ${{ (item.quantity * item.product.price).toFixed(2) }}
          </p>

          <button class="btn remove" @click="removeItem(item.product.id)">
            Quitar
          </button>
        </div>
      </div>

      <div class="summary">
        <p>Productos totales: {{ totalItems }}</p>
        <p>Total a pagar: ${{ totalPrice.toFixed(2) }}</p>
        <button class="btn clear" @click="clearCart">
          Vaciar carrito
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../composables/useCart'

const {
  cart,
  changeQuantity,
  removeFromCart,
  clearCart,
  totalItems,
  totalPrice
} = useCart()

const updateQuantity = (item) => {
  changeQuantity(item.product.id, item.quantity)
}

const removeItem = (id) => {
  removeFromCart(id)
}
</script>

<style scoped>
.title {
  font-size: 28px;
  margin-bottom: 25px;
  color: #1d3557;
}

.status {
  margin-top: 20px;
  font-size: 18px;
}

.cart {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
  gap: 15px;
}

.main h3 {
  margin-bottom: 6px;
}

.price-unit {
  font-size: 14px;
  color: #555;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.controls input {
  width: 70px;
  padding: 4px;
}

.subtotal {
  font-weight: 600;
}

.summary {
  margin-top: 20px;
  padding: 15px 20px;
  background: #f1faee;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.btn {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.btn.remove {
  background: #e63946;
  color: white;
}

.btn.clear {
  background: #457b9d;
  color: white;
}
</style>

