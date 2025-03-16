const { DataTypes } = require('sequelize'); // Importando DataTypes de Sequelize
const sequelize = require('../config/database'); // Importando la conexión a la BD

const Producto = sequelize.define("Productos", {
    producto_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tienda_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    imagen: {  // 📌 Agregamos el campo imagen
        type: DataTypes.STRING(255),  
        allowNull: false  // Puede ser null si aún no hay imagen
    }
}, {
    tableName: "Productos", 
    timestamps: false 
});

module.exports = Producto;
