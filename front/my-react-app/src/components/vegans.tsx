import axios from "axios";
import { useEffect, useState } from "react";
import { baseApi } from "../utils/api";


interface product {
  _id: string;
  name: string;
  price: number;
  description: string;
  type: string;
}
const Vegans = () => {

  const [products, setProducts] = useState<product[]>([]);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(baseApi + "/products/getProducts");
      setProducts(response.data.products);
    } catch (error) {
      console.error("failed to fetch products list", error);
    }
  };
  const DeeletProduct = async (id: string) => {
    try {
      await axios.delete(`${baseApi}/products/delete/${id}`);
      fetchProduct();
    } catch (error) {
      console.error("failed to delete products", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const filteredFruits = products.filter((item) => item.type === "vegan");
  return (
    <div>
      <ul style={{marginTop: "100px",}}>
        {filteredFruits.map((value) => (
          <li
            key={value._id}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              alignItems: "center",
            }}
          >
            <h3>{value.name}</h3>
            <p>{value.price}</p>
            <p>{value.description}</p>
            <button
              onClick={() => DeeletProduct(value._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                width: "80px",
                cursor: "pointer",
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vegans;