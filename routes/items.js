const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//rif id, nombre, nombre_corto, descripcion, unidad_medida, precio_unitario, id_linea


//Create Item

router.post("/items", async(req, res)=> {
    try {
       const { id, nombre, nombre_corto, descripcion, unidad_medida, precio_unitario, id_linea } = req.body;
       const newItem = await pool.query(
           "INSERT INTO item (id, nombre, nombre_corto, descripcion, unidad_medida, precio_unitario, id_linea) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
           [ id, nombre, nombre_corto, descripcion, unidad_medida, precio_unitario, id_linea ]
        );

    res.json(newItem.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Items

router.get ("/items", async (req, res) =>{
    try {
        const allItems = await pool.query(
            "SELECT * FROM item"
        );
    res.json(allItems.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Item

router.get("/items/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const item = await pool.query(
            "SELECT * FROM item WHERE id = $1",
            [id]
        );
    res.json(item.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

router.get("/Lineaitems/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const item = await pool.query(
            "SELECT * FROM item WHERE id_linea = $1",
            [id]
        );
    res.json(item.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Item

router.put("/items/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { id_item, nombre, nombre_corto, descripcion, unidad_medida, precio_unitario, id_linea } = req.body;
        const updateItem = await pool.query(
            "UPDATE item SET id = $1, nombre = $2, nombre_corto = $3, descripcion = $4, unidad_medida = $5, precio_unitario = $6, id_linea = $7 WHERE id = $8",
            [ id, nombre, nombre_corto, descripcion, unidad_medida, precio_unitario, id_linea, id ]
        );
    res.json ("Item was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Item

router.delete ("/items/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteItem = await pool.query(
            "DELETE FROM item WHERE id = $1",
            [id]
        );
    res.json("Item was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router