import axios from "axios";
import { useEffect, useState } from "react";
import { baseApi } from "../utils/api";
import { ProductsCon, ProductsWrap } from "../style";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  type: string;
}

const Foods = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseApi}/products/getProducts`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products list", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`${baseApi}/products/delete/${id}`);
      // ✅ Update state without full re-fetch
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  // ✅ Normalize types to avoid mismatches
  const filteredProducts = products.filter((item) => item.type === "foods");

  return (
    <div>
      <ProductsCon>
        {filteredProducts.map((value) => (
          <ProductsWrap key={value._id}>
            <h3>{value.name}</h3>
            <div className="price-desc">
              <p>${value.price.toFixed(2)}</p>
              <h5>{value.description}</h5>
            </div>
            <button onClick={() => deleteProduct(value._id)}>Delete</button>
          </ProductsWrap>
        ))}
      </ProductsCon>
    </div>
  );
};

export default Foods;

