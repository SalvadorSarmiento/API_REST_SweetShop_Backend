const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // Middleware para subir imágenes
const db = require('../config/database'); // Importa la conexión a la base de datos
const Producto = require('../models/productos');

// Ruta para obtener productos
router.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.findAll();

        const productosConImagen = productos.map(prod => ({
            ...prod.toJSON(),
            imagen: `http://localhost:${process.env.PORT || 3001}/uploads/${prod.imagen}`
        }));

        res.json(productosConImagen);
    } catch (error) {
        console.error('❌ Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});


// Ruta para subir imagen de producto
router.post('/productos/upload', upload.single('imagen'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se subió ninguna imagen' });
    }
    const imageUrl = `/images/${req.file.filename}`; // Guardamos la URL de la imagen
    res.json({ message: 'Imagen subida exitosamente', url: imageUrl });
});

module.exports = router;
