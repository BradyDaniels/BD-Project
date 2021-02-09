const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//Create Trabajador

router.get("/respuesta_cotizacion/:id_cotizacion", async(req, res) =>{ //El valor lo devuelve como Sum
    try {
        const { id_cotizacion } = req.params;
        const respuesta_cotizacion = await pool.query(
            "SELECT * FROM respuesta WHERE id_cotizacion = $1",
            [id_cotizacion]
        );
    res.json(respuesta_cotizacion.rows);
    } catch (err) {
        console.error(err.message);
    }
})


module.exports = router