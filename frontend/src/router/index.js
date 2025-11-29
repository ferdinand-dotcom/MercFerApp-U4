// frontend/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import CartView from '../views/CartView.vue'
import AboutView from '../views/AboutView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/product/:id', component: ProductDetailView },
  { path: '/cart', component: CartView },
  { path: '/about', component: AboutView },
  { path: '/:pathMatch(.*)*', component: NotFoundView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
