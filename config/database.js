require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    dialect: 'mssql',
    dialectOptions: {
        options: { encrypt: false } // Desactivar encriptación si hay problemas de conexión
    },
    logging: false, // Desactiva logs en la consola
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a SQL Server establecida con éxito.');
    } catch (error) {
        console.error('❌ Error al conectar con SQL Server:', error);
    }
};

testConnection();

module.exports = sequelize;
