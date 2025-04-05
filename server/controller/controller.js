const Product = require ("../models/model")
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store images in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
});
const upload = multer({ storage });

exports.AddProduct = async (req,res) =>{
    try {
        const { name, price, description, type } = req.body;
        const image = req.file ? req.file.path : null; // Get image path

        const newProduct = new Product ({name,price,description,type, image});
        await newProduct.save();

        res.status(201).json({message:"product added",Product:newProduct})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Failed to add product"})

    }
}

exports.DeleteProduct = async(req,res) =>{
    try {
        const{id} = req.params;
        const deleteProduct = await Product.findByIdAndDelete(id);

        if(!deleteProduct){
            return res.status(404).json({error:"product not found"})
        }
        res.status(200).json({message:'product deleted successfully!'})
    } catch (error) {
        res.status(500).json({error:"Failed to delete product"})
        
    }
};

exports.GetProduct = async (req,res) =>{
    try {
       const products = await Product.find()
       res.status(200).json({products});

    } catch (error) {
        res.status(500).json({error:"Failed to get product list"})
    }
};

exports.GetProductById = async (req,res) =>{
    try {
        const{id} = req.params;
        const product = await Product.findById(id);

        if (!product){
            return res.status(404).jso({error:"product not found"})
        }

        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({error:"Failed to fetch product"})
    }
}