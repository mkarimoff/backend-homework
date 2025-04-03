import  { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { baseApi } from "./utils/api";
import { ModalCon, NewProductCon, ProductsCon, ProductsWrap } from "./style";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  type: string;
}

const App = () => {

  const navigate = useNavigate();


  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        const expirationTime = decoded.exp * 5000; // Convert to milliseconds

        if (Date.now() >= expirationTime) {
          console.log("Token expired, logging out...");
          localStorage.removeItem("authToken"); // Remove expired token
          navigate("/login"); // Redirect to login
        }
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 5000); // Check every 5s

    return () => clearInterval(interval);
  }, [navigate]);

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseApi}/products/getProducts`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const addProduct = async () => {
    setError(null); // Reset error on new submission

    if (!name || !price || !description || !type) {
      setError("All fields are required.");
      return;
    }
    
    if (typeof price !== "number" || price <= 0) {
      setError("Price must be a valid number greater than zero.");
      return;
    }

    try {
      await axios.post(`${baseApi}/products/add`, { name, price, description, type });

      fetchProducts();
      setName("");
      setPrice("");
      setDescription("");
      setType("");
      setOpen(false); // Close modal after success
    } catch (error) {
      console.error("Failed to add product", error);
      setError("Failed to add product. Please try again.");
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`${baseApi}/products/delete/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <>
      <div className="main-con">
        <NewProductCon>
          <h3>Products List</h3>
          <button onClick={() => setOpen(true)}>Add new product</button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6">
                Add New Product
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <ModalCon>
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : "")}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Select product type</option>
                    <option value="fruits">Fruits</option>
                    <option value="vegan">Vegan</option>
                    <option value="drinks">Drinks</option>
                    <option value="foods">Food</option>
                  </select>
                  {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
                  <button onClick={addProduct}>Submit</button>
                </ModalCon>
              </Typography>
            </Box>
          </Modal>
        </NewProductCon>
        <ProductsCon>
          {products.map((product) => (
            <ProductsWrap key={product._id} >
              <h3>{product.name}</h3>
              <div className="price-desc">
              <p>{product.price}$</p>
              <h5>{product.description}</h5>
              </div>
              <button onClick={() => deleteProduct(product._id)}>
                Delete
              </button>
            </ProductsWrap>
          ))}
        </ProductsCon>
      </div>
    </>
  );
};

export default App;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 410,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
