import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import "./CashierSection.css";

const CashierSection = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    try {
      setLoading(true);
      const savedProducts = localStorage.getItem("products");
      const parsedProducts = savedProducts ? JSON.parse(savedProducts) : [];
      
      const formattedProducts = parsedProducts.map(product => ({
        id: product.id || Math.random().toString(36).substr(2, 9),
        name: product.name,
        price: product.price,
        stock: product.stock,
        image: product.image || "https://via.placeholder.com/150" // Gambar default jika tidak ada
      }));
      
      // Initialize quantities state
      const initialQuantities = {};
      formattedProducts.forEach(product => {
        initialQuantities[product.id] = 0;
      });
      setQuantities(initialQuantities);
      
      setProducts(formattedProducts);
      setError(null);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);  

  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => {
      const currentQty = prev[productId] || 0;
      const product = products.find(p => p.id === productId);
      const newQty = Math.max(0, Math.min(currentQty + change, product.stock));
      return { ...prev, [productId]: newQty };
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id];
    if (quantity > 0) {
      const cartItem = {
        ...product,
        quantity
      };
      addToCart(cartItem);
  
      // Reset quantity after adding to cart
      setQuantities(prev => ({ ...prev, [product.id]: 0 }));
  
      // Update product stock
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === product.id
            ? { ...p, stock: p.stock - quantity }
            : p
        )
      );
  
      // Update localStorage with the new product stock
      const updatedProducts = products.map(p =>
        p.id === product.id
          ? { ...p, stock: p.stock - quantity }
          : p
      );
      try {
        localStorage.setItem("products", JSON.stringify(updatedProducts));
      } catch (error) {
        if (error.name === "QuotaExceededError") {
          alert("Storage quota exceeded. Please clear your browser data.");
        }
      }
    }
  };  

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
};

export default CashierSection;