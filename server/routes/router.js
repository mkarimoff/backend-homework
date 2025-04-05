const express = require("express");
const router = express.Router()
const { DeleteProduct, GetProduct, GetProductById, AddProduct } = require("../controller/controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Define upload folder



router.get("/getProducts",GetProduct);
router.post("/add", upload.single("image"), AddProduct);
router.delete("/delete/:id",DeleteProduct);
router.get("/getProducts/:id",GetProductById);

module.exports = router;