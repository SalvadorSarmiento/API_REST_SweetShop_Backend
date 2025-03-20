require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const Producto = require("./models/productos");
const productosRoutes = require('./routes/productos.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Rutas
app.use('/api', productosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor corriendo 🚀');
});

// Middleware de errores
app.use((err, req, res, next) => {
    console.error('❌ Error en el servidor:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Conectar a la base de datos y luego iniciar el servidor
sequelize.authenticate()
    .then(() => {
        console.log('✅ Conectado a SQL Server correctamente.');
        return sequelize.sync(); // 🔹 Sin alter para producción
    })
    .then(async () => {
        try {
            const productos = await Producto.findAll({ raw: true, limit: 10 }); // 🔹 Evitar sobrecarga
            console.log('📌 Productos en la BD:', productos);
        } catch (err) {
            console.error('⚠️ Error al obtener productos:', err);
        }
        app.listen(PORT, () => {
            console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('❌ Error al conectar con SQL Server:', error);
        process.exit(1); // 🔹 Detener el proceso si falla la conexión
    });
