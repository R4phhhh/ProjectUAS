import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext"; // Import CartContext
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext); // Use cart state and actions from CartContext

  // Fetch products from the API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stock based on cartItems (no need to update the products state)
  const getProductStock = (productId) => {
    const cartItem = cartItems.find(item => item.id === productId);
    const product = products.find(item => item.id === productId);
    
    if (product && cartItem) {
      return product.stock - cartItem.quantity; // Adjust stock based on cart quantity
    }
    return product ? product.stock : 0; // Return original stock if no item in cart
  };

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(savedProducts);
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Add product to the cart
  };

  const handleRemoveFromCart = (product, index) => {
    removeFromCart(index); // Remove item from the cart
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-page">
      <header className="header">
        <h1>In The Market - Daftar Produk</h1>
        <p className="subtitle">Seluruh produk yang tersedia di sistem</p>
      </header>

      <div className="content">
        <div className="product-list">
          {products.length === 0 ? (
            <p>Tidak ada produk tersedia.</p>
          ) : (
            products.map((product) => {
              const adjustedStock = getProductStock(product.id); // Get the adjusted stock
              return (
                <div key={product.id} className="product-item">
                  <img
                    src={product.image ? `http://localhost:8000/storage/${product.image}` : "https://via.placeholder.com/200"}
                    alt={product.productName}
                    style={{ width: "200px", height: "200px", objectFit: "cover" }}
                  />
                  <h3>{product.productName}</h3>
                  <p className="price">Harga: Rp{parseInt(product.price).toLocaleString()}</p>
                  <p className="stock">Stok: {adjustedStock}</p>
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}  // Add to cart
                    disabled={adjustedStock <= 0} // Disable button if stock is 0
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 Indomaret. All Rights Reserved.</p>
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
    </div>
  );
};

export default ProductPage;