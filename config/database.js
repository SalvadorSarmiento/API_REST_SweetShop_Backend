require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mssql', // Asegurar que el dialecto esté definido
    dialectOptions: {
        options: {
            encrypt: false, // Desactivar encriptación si hay problemas de conexión
            trustServerCertificate: true // Agregado para evitar errores SSL
        }
    },
    logging: console.log, // Habilitar logs para ver consultas SQL
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a SQL Server establecida con éxito.');
        console.log("📡 Base de datos conectada a:", sequelize.getDatabaseName());
    } catch (error) {
        console.error('❌ Error al conectar con SQL Server:', error);
    }
};

testConnection();

module.exports = sequelize;
