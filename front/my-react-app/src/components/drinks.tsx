import axios from "axios";
import { useEffect, useState } from "react";
import { baseApi } from "../utils/api";
import { ProductsCon, ProductsWrap } from "../style";


interface product {
  _id: string;
  name: string;
  price: number;
  description: string;
  type: string;
}
const Drinks = () => {
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

  const filteredFruits = products.filter((item) => item.type === "drinks");
  return (
    <div>
      <ProductsCon>
        {filteredFruits.map((value) => (
          <ProductsWrap key={value._id}>
            <h3>{value.name}</h3>
            <div className="price-desc">
              <p>{value.price}</p>
              <h5>{value.description}</h5>
            </div>
            <button onClick={() => DeeletProduct(value._id)}>Delete</button>
          </ProductsWrap>
        ))}
      </ProductsCon>
    </div>
  );
};

export default Drinks;
