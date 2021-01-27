const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//id_linea, rif


//Create Linea_Proveedor

router.post("/linea_proveedor", async(req, res)=> {
    try {
       const { id_linea, rif } = req.body;
       const newLineaProveedor = await pool.query(
           "INSERT INTO linea_proveedor (id_linea, rif) VALUES($1, $2) RETURNING *",
           [ id_linea, rif ]
        );

    res.json(newLineaProveedor.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Linea_Proveedor

router.get ("/linea_proveedor", async (req, res) =>{
    try {
        const allLineasProveedor = await pool.query(
            "SELECT * FROM linea_proveedor"
        );
    res.json(allLineasProveedor.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a linea_proveedor //Revisar por que no se si se busca por linea o por rif

router.get("/linea_proveedor/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const LineaProveedor = await pool.query(
            "SELECT * FROM linea_proveedor WHERE id_linea = $1",
            [id]
        );
    res.json(LineaProveedor.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a linea_proveedor No creo que se use pero igual revisar  

router.put("/linea_proveedor/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { id_lineaProveedor, rif } = req.body;
        const updateLineaProveedor = await pool.query(
            "UPDATE linea_proveedor SET id_linea = $1, rif = $2 WHERE id_linea = $3",
            [ id, rif, id ]
        );
    res.json ("Linea Proveedor was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a linea_proveedor //Hay que ver esto bien por que tendria que ser compuesto id y rif

router.delete ("/linea_proveedor/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteLineaProveedor = await pool.query(
            "DELETE FROM linea_proveedor WHERE id_linea = $1",
            [id]
        );
    res.json("Linea Proveedor was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router