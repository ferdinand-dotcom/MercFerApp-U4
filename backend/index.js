const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Rutas a los archivos de datos
const productsPath = path.join(__dirname, 'data', 'products.json');
const categoriesPath = path.join(__dirname, 'data', 'categories.json');

// Helpers para leer y escribir JSON
function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Middlewares
app.use(cors());
app.use(express.json());

// ---------------- CATEGORIES ----------------

// GET /api/categories
app.get('/api/categories', (req, res) => {
  try {
    const categories = readJson(categoriesPath);
    res.json(categories);
  } catch (error) {
    console.error('Error leyendo categorías:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// ---------------- PRODUCTS ----------------

// Validación simple de producto
function validateProduct(body) {
  const errors = [];

  if (!body.name || typeof body.name !== 'string') {
    errors.push('name es obligatorio y debe ser string');
  }

  if (!body.description || typeof body.description !== 'string') {
    errors.push('description es obligatorio y debe ser string');
  }

  if (body.price == null || typeof body.price !== 'number' || body.price <= 0) {
    errors.push('price debe ser un número > 0');
  }

  if (!body.imageUrl || typeof body.imageUrl !== 'string') {
    errors.push('imageUrl es obligatorio y debe ser string');
  }

  if (body.categoryId == null || typeof body.categoryId !== 'number') {
    errors.push('categoryId es obligatorio y debe ser number');
  }

  if (body.stock == null || typeof body.stock !== 'number' || body.stock < 0) {
    errors.push('stock debe ser un número >= 0');
  }

  return errors;
}

// GET /api/products
app.get('/api/products', (req, res) => {
  try {
    const products = readJson(productsPath);
    res.json(products);
  } catch (error) {
    console.error('Error leyendo productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  try {
    const products = readJson(productsPath);
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error leyendo producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// POST /api/products
app.post('/api/products', (req, res) => {
  try {
    const products = readJson(productsPath);
    const body = req.body;

    const errors = validateProduct(body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Datos inválidos', errors });
    }

    const newId =
      products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = { id: newId, ...body };
    products.push(newProduct);

    writeJson(productsPath, products);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creando producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PUT /api/products/:id
app.put('/api/products/:id', (req, res) => {
  try {
    const products = readJson(productsPath);
    const id = Number(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const body = req.body;
    const errors = validateProduct(body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Datos inválidos', errors });
    }

    const updatedProduct = { id, ...body };
    products[index] = updatedProduct;

    writeJson(productsPath, products);

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// DELETE /api/products/:id
app.delete('/api/products/:id', (req, res) => {
  try {
    const products = readJson(productsPath);
    const id = Number(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const deleted = products.splice(index, 1)[0];
    writeJson(productsPath, products);

    res.json({ message: 'Producto eliminado', product: deleted });
  } catch (error) {
    console.error('Error eliminando producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta raíz solo como prueba
app.get('/', (req, res) => {
  res.send('Backend Fermaskot API funcionando ✅');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
