import  { useEffect, useState } from "react";
import { getProducts } from "./api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal memuat produk:", error);
      });
  }, []);

  return (
    <div>
      <h1>Daftar Produk</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - Rp{product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;