import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import Compressor from "compressorjs";
import axios from 'axios';

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    stock: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image input changes
  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const productFormData = new FormData();
      productFormData.append('productName', formData.productName);
      productFormData.append('price', formData.price);
      productFormData.append('stock', formData.stock);
  
      if (formData.image) {
        productFormData.append('image', formData.image);
      }
  
      const response = await axios.post('http://localhost:8000/api/debug-product', productFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log("Product created successfully:", response.data);
      navigate("/products");
    } catch (error) {
      console.error("Error saving product:", error.response ? error.response.data : error.message);
      alert("Error saving product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };   

  return (
    <div className="add-product-page">
      <div className="container">
        <h1 className="page-title">Tambah Produk Baru</h1>
        <ProductForm
          formData={formData}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

const CashierSection = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Fetch products from localStorage (or API if needed)
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  // Update quantity of products in the cart
  const handleQuantityChange = (productId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + change,
    }));
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    alert(`Product "${product.productName}" added to cart.`);
  };

  return (
    <div className="cashier-section container mt-4">
      <h2>Kasir</h2>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="product-card card">
              <img
                src={product.image || "https://via.placeholder.com/200"}
                className="card-img-top product-image"
                alt={product.productName}
              />
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">Rp {parseInt(product.price).toLocaleString()}</p>
                <p className="card-text">Stok: {product.stock}</p>
                <div className="quantity-controls">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleQuantityChange(product.id, -1)}
                    disabled={!quantities[product.id]}
                  >
                    -
                  </button>
                  <span className="mx-2">{quantities[product.id] || 0}</span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleQuantityChange(product.id, 1)}
                    disabled={quantities[product.id] >= product.stock}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleAddToCart(product)}
                  disabled={!quantities[product.id]}
                >
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProductPage;