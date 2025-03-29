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

const All = () => {
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
    <div>
      <ul>
        {products.map((products) => (
          <li
            key={products._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "30px",
              alignItems: "center",
            }}
          >
            <h3>{products.name}</h3>
            <p>{products.price}</p>
            <p>{products.description}</p>
            <button
              onClick={() => DeeletProduct(products._id)}
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

export default All;
