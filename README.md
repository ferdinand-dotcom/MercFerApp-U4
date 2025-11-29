# 🐾 Fermaskot

Aplicación web tipo **SPA** desarrollada con **Vue 3** y una **API en Node.js/Express** para la gestión de productos de mascotas.  
Permite listar productos, filtrarlos por categoría, buscar por nombre o descripción y añadirlos a un carrito de compras.

> Proyecto académico para la materia de Programación / Aplicaciones Web.

## ✨ Características principales

- Listado de productos con:
  - Imagen
  - Nombre
  - Descripción
  - Precio
  - Categoría
- **Búsqueda en tiempo real** por nombre o descripción.
- **Filtro por categorías** (todas, alimentos, accesorios, etc.).
- **Carrito de compras**:
  - Añadir productos
  - Visualizar los items añadidos
  - Ver totales
- Diseño responsive básico con:
  - Tarjetas modernas para los productos
  - Fondo decorativo con patrón de huellitas 🐾
  - Botones estilizados
- Arquitectura separada en:
  - `backend/` → API de productos
  - `frontend/` → SPA con Vue 3 + Vite

---

## 🧩 Tecnologías utilizadas

### Frontend

- [Vue 3](https://vuejs.org/) (Composition API)
- [Vite](https://vitejs.dev/)
- HTML5 + CSS3
- JavaScript (ES6+)

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- Manejo de datos en formato **JSON**

### Herramientas de desarrollo

- Git & GitHub
- Visual Studio Code
- npm (Node Package Manager)

---

## 🗂 Estructura del proyecto

```bash
Fermaskot/
├── backend/              # API en Node/Express
│   ├── data/             # JSON con productos y categorías
│   ├── routes/           # Rutas de la API
│   ├── controllers/      # Controladores (si aplica)
│   ├── server.js         # Punto de entrada del backend
│   └── package.json
│
├── frontend/             # Aplicación SPA con Vue 3
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── backgrounds/
│   │   │       └── paw-pattern.png   # Fondo de huellitas 🐾
│   │   ├── components/   # Componentes reutilizables (ProductCard, etc.)
│   │   ├── composables/  # useProducts, useCart, etc.
│   │   ├── router/       # Vue Router (Home, About, Cart, NotFound)
│   │   ├── views/        # Vistas principales
│   │   ├── App.vue       # Layout principal
│   │   └── main.js       # Entrada de la app
│   └── package.json
│
├── .gitignore
└── README.md             # Este archivo

🧪 Ejecución del proyecto

git clone https://github.com/ferdinand-dotcom/Fermaskot.git
cd Fermaskot
