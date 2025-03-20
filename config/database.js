require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT || 1433, // Puerto predeterminado para SQL Server
    dialect: process.env.DB_DIALECT || 'mssql', 
    dialectOptions: {
        options: {
            encrypt: true, // Recomendado para conexiones seguras
            trustServerCertificate: true, // Evita errores SSL
            requestTimeout: 60000 // Aumenta timeout a 60 segundos
        }
    },
    pool: { // Configurar el pool de conexiones para mejor rendimiento
        max: 10, // Máximo de conexiones activas
        min: 0, // Mínimo de conexiones
        acquire: 30000, // Tiempo máximo de espera para adquirir conexión
        idle: 10000 // Tiempo antes de liberar conexión inactiva
    },
    logging: false, // Desactiva logs en producción (puedes activarlos con `console.log`)
});

// Función para probar la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a SQL Server establecida con éxito.');
        console.log("📡 Base de datos conectada a:", sequelize.getDatabaseName());
    } catch (error) {
        console.error('❌ Error al conectar con SQL Server:', error);
        
        // Si el error es por timeout, muestra una sugerencia
        if (error.parent && error.parent.code === 'ETIMEOUT') {
            console.error('⏳ El tiempo de espera se agotó. Intenta aumentar el requestTimeout.');
        }
    }
};

testConnection();

module.exports = sequelize;
