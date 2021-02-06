const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//Create Trabajador

router.get("/subtotal/:id", async(req, res) =>{ //El valor lo devuelve como Sum
    try {
        const { id } = req.params;
        const trabajador = await pool.query(
            "SELECT SUM (precio_compra) FROM detalle_compra WHERE id_respuesta = $1",
            [id]
        );
    res.json(trabajador.rows);
    } catch (err) {
        console.error(err.message);
    }
})



module.exports = router