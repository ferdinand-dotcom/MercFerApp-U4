# Fermaskot – Tienda de Mascotas (Unidad 4)

Aplicación web para la gestión y visualización de productos para mascotas.  
El proyecto está dividido en **backend (API)** y **frontend (SPA con Vue)**, ambos desplegados en la nube.

---

## 🧑‍💻 Datos del proyecto

- **Alumno:** Coque Taipe Nelson Fernando
- **Materia:** Aplicaciones Web
- **Universidad:** Universidad Politécnica Salesiana
- **Unidad:** U4 – Consumo de APIs y despliegue en la nube

---

## 🌐 Enlaces de despliegue

- **Frontend (Netlify):**  
  `https://stately-torrone-b4e00b.netlify.app`

- **Backend (Railway – API):**  
  Base URL: `https://mercferapp-u4-production.up.railway.app/api`  

  Endpoints principales:
  - `/health` – Verifica que el backend esté funcionando.
  - `/products` – Lista de productos.
  - `/categories` – Lista de categorías.

---

## 🏗️ Arquitectura del proyecto

- **Backend**
  - Node.js + Express
  - Controladores para productos y categorías
  - Endpoint de health check
  - Desplegado en **Railway**

- **Frontend**
  - Vue 3 + Vite
  - Consumo de API mediante un composable `useApi.js`
  - Filtros por nombre/descrición y categoría
  - Carrito básico
  - Desplegado en **Netlify**

---

## ⚙️ Variables de entorno

### Frontend (`frontend/.env`)

```env
VITE_API_URL=https://mercferapp-u4-production.up.railway.app/api
