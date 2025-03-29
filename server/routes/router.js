const express = require("express");
const { AddProduct, DeleteProduct, GetProduct, GetProductById } = require("../controller/controller");
const router = express.Router()

router.get("/getProducts",GetProduct);
router.post("/add",AddProduct);
router.delete("/delete/:id",DeleteProduct);
router.get("/getProducts/:id",GetProductById);

module.exports = router;