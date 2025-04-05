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
  image: string;
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
      <ProductsCon>
        {products.map((products) => (
          <ProductsWrap
            key={products._id}>
            <img src={products.image} alt="image" />
            <h3>{products.name}</h3>
            <div className="price-desc">
            <p>{products.price}</p>
            <p>{products.description}</p>
            </div>
            <button
              onClick={() => DeeletProduct(products._id)} >
              delete
            </button>
          </ProductsWrap>
        ))}
      </ProductsCon>
    </div>
  );
};

export default All;
