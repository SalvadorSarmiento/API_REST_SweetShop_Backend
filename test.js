const sequelize = require("./config/database");
const Producto = require("./models/productos")(sequelize, require("sequelize"));

async function testDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión establecida con éxito");

        const productos = await Producto.findAll();
        console.log("📦 Productos en la base de datos:", productos);
    } catch (error) {
        console.error("❌ Error al conectar con la base de datos:", error);
    } finally {
        await sequelize.close();
    }
}

testDB();
