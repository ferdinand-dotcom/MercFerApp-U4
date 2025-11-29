<template>
  <div class="product-card">
    <img
      v-if="product.imageUrl"
      :src="product.imageUrl"
      :alt="product.name"
      class="thumb"
    />

    <h3>{{ product.name }}</h3>
    <p class="description">{{ product.description }}</p>
    <p class="price">${{ product.price }}</p>

    <div class="actions">
      <RouterLink :to="`/product/${product.id}`" class="btn secondary">
        Ver detalles
      </RouterLink>

      <button class="btn primary" @click="$emit('added-to-cart', product)">
        Añadir al carrito
      </button>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['added-to-cart'])
</script>

<style scoped>
.product-card {
  width: 260px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: 0.2s ease;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-card:hover {
  transform: translateY(-4px);
}

.thumb {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.description {
  font-size: 14px;
  color: #444;
}

.price {
  font-size: 18px;
  color: #457b9d;
  font-weight: 600;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  flex: 1;
  padding: 8px 10px;
  border-radius: 6px;
  border: none;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
}

.btn.primary {
  background: #457b9d;
  color: white;
}

.btn.primary:hover {
  background: #1d3557;
}

.btn.secondary {
  background: #f1faee;
  color: #1d3557;
}

.btn.secondary:hover {
  background: #e5f4ff;
}
</style>
