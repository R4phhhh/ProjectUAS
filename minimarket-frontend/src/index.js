import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App'; // Pastikan file App.js sudah benar
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { CartProvider } from './contexts/CartContext'; // Import CartProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();
