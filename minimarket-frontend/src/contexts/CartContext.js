// src/contexts/CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Create CartContext
export const CartContext = createContext();

// CartProvider component to wrap your app and provide cart data
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
  
    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };
  
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };  

  // Function to update the quantity of an item in the cart
  const updateQuantity = (index, quantity) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems];
      updatedCart[index].quantity = quantity;
      return updatedCart;
    });
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Provide context values to the children components
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};