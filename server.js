require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const Producto = require("./models/productos");
const productosRoutes = require('./routes/productos.routes');
require('dotenv').config();

console.log(process.env.DB_HOST); // localhost
console.log(process.env.JWT_SECRET); // claveultrasecreta

const app = express();
const PORT = process.env.PORT || 3001; 

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200', // Solamente se modifica si cambio el dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Permite enviar cookies y headers personalizados
}));


// Servir archivos estáticos desde la carpeta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Rutas
app.use('/api', productosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor corriendo 🚀');
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error('❌ Error en el servidor:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Conectar a la base de datos y luego iniciar el servidor
sequelize.authenticate()
    .then(async() => {
        console.log('✅ Conectado a SQL Server correctamente.');
        const productos = await Producto.findAll({ raw: true });
        console.log('📌 Productos en la BD:', productos); // <-- Verifica si hay productos
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('❌ Error al conectar con SQL Server:', error);
    });
