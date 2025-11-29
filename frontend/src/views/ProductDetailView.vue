<template>
  <div v-if="product">
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
    <p><b>Precio:</b> ${{ product.price }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref(null)

onMounted(async () => {
  const res = await fetch(`http://localhost:3001/api/products/${route.params.id}`)
  product.value = await res.json()
})
</script>
