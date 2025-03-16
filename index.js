require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Importar conexión a la BD

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Permitir servir imágenes desde la carpeta uploads
app.use('/uploads', express.static('public/uploads'));

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});

// Ruta de prueba
app.get('/', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.send('✅ Conexión a SQL Server exitosa.');
    } catch (error) {
        res.status(500).send('❌ Error en la conexión con la base de datos.');
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
