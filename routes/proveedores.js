const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//rif int , razon social, telefono, correo, direccion

//Create Proveedor

router.post("/proveedores", async(req, res)=> {
    try {
       const { rif, razon_social, telefono, correo, direccion } = req.body;
       const newProveedor = await pool.query(
           "INSERT INTO proveedor (rif, razon_social, telefono, correo, direccion) VALUES($1, $2, $3, $4, $5) RETURNING *",
           [ rif, razon_social, telefono, correo, direccion ]
        );

    res.json(newProveedor.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Proveedores

router.get ("/proveedores", async (req, res) =>{
    try {
        const allProveedores = await pool.query(
            "SELECT * FROM proveedor"
        );
    res.json(allProveedores.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Proveedores

router.get("/proveedores/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const proveedor = await pool.query(
            "SELECT * FROM proveedor WHERE rif = $1",
            [id]
        );
    res.json(proveedor.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

router.get("/proveedores_linea/:id_linea", async(req, res) =>{
    try {
        const { id_linea } = req.params;
        const proveedor = await pool.query(
            " SELECT proveedor.rif,proveedor.razon_social,proveedor.telefono,proveedor.correo,proveedor.direccion FROM proveedor,linea_proveedor  WHERE linea_proveedor.id_linea=$1 AND linea_proveedor.rif=proveedor.rif",
            [id_linea]
        );
    res.json(proveedor.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Proveedorr

router.put("/proveedores/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { rif, razon_social, telefono, correo, direccion } = req.body;
        const updateProveedor = await pool.query(
            "UPDATE proveedor SET rif = $1, razon_social = $2, telefono = $3, correo = $4, direccion = $5 WHERE  rif = $6",
            [ rif, razon_social, telefono, correo, direccion, id  ]
        );
    res.json ("Proveedor was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Proveedor

router.delete ("/proveedores/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteProveedor = await pool.query(
            "DELETE FROM proveedor WHERE rif = $1",
            [id]
        );
    res.json("Proveedor was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router