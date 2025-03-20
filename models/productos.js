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
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: "Productos", 
    timestamps: false 
});

const testQuery = async () => {
    try {
        const productos = await Producto.findAll();
        console.log("📦 Productos obtenidos:", productos);
    } catch (error) {
        console.error("❌ Error al obtener productos:", error);
    }
};

testQuery();

module.exports = Producto;

