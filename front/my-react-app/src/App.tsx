import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { baseApi } from "./utils/api";

interface product {
  _id: string;
  name: string;
  price: number;
  description: string;
  type: string;
}

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [products, setProducts] = useState<product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");


  const fetchProduct = async () => {
    try {
      const response = await axios.get(
      baseApi + "/products/getProducts"
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("failed to fetch products list", error);
    }
  };

  const AddProduct = async () => {
    try {
      await axios.post("http://localhost:5050/dev-api/products/add", {
        name,
        price,
        description,
        type,
      });
      fetchProduct();
      setName("");
      setPrice(0);
      setDescription("");
      setType("");
    } catch (error) {
      console.error("failed to add products", error);
    }
  };

  const DeeletProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5050/dev-api/products/delete/${id}`);
      fetchProduct();
    } catch (error) {
      console.error("failed to delete products", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <div className="main-con">
        <div className="title-button">
          <h3>Products List</h3>
          <button onClick={handleOpen}>Add new product</button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New Product
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form
                  action=""
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="price"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                  />
                  <input
                    type="text"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <select name="category" id="category" onChange={(e) => setType(e.target.value)} >
                    <option value="">Select product type</option>
                    <option value="fruits">Fruits</option>
                    <option value="vegan">Vegan</option>
                    <option value="drinks">Drinks</option>
                    <option value="foods">Food</option>
                  </select>
                  <button onClick={AddProduct}>Submit</button>
                </form>
              </Typography>
            </Box>
          </Modal>
        </div>
        <ul>
          {products.map((products) => (
            <li
              key={products._id}
              style={{ display: "flex", justifyContent: "space-between" ,gap:'30px',alignItems:'center'}}
            >
              <h3>{products.name}</h3>
              <p>{products.price}</p>
              <p>{products.description}</p>
              <button onClick={() => DeeletProduct(products._id)} style={{backgroundColor:'red',color:'white',width:'80px',cursor:"pointer"}}>
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
