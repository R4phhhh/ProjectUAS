import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 9999,
  };

  const updateProductStock = (cartItem, newQuantity) => {
    const productList = JSON.parse(localStorage.getItem("products") || "[]");

    // Update the stock for the product
    const updatedProducts = productList.map((product) => {
      if (product.id === cartItem.id) {
        return { ...product, stock: product.stock - (newQuantity - cartItem.quantity) };
      }
      return product;
    });

    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity > 0 && newQuantity <= cartItems[index].stock) {
      const updatedCart = [...cartItems];
      updatedCart[index].quantity = newQuantity;

      try {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        updateProductStock(cartItems[index], newQuantity);
        updateQuantity(index, newQuantity);
      } catch (error) {
        if (error.name === "QuotaExceededError") {
          alert("Storage quota exceeded. Please clear your browser data.");
        }
      }
    }
  };

  const handleRemoveItem = (index) => {
    const removedItem = cartItems[index];
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);

    try {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      removeFromCart(index);
      updateProductStock(removedItem, 0);
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        alert("Storage quota exceeded. Please clear your browser data.");
      }
    }
  };

  const handlePayment = () => {
    const payment = parseFloat(paymentAmount);
    if (isNaN(payment) || payment < totalPrice) {
      alert("Pembayaran tidak valid atau kurang dari total belanja");
      return;
    }

    const change = payment - totalPrice;
    const transaction = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      total: totalPrice,
      payment: payment,
      change: change,
    };

    const productList = JSON.parse(localStorage.getItem("products") || "[]");

    const updatedProducts = productList.map((product) => {
      const cartItem = cartItems.find(item => item.id === product.id);
      if (cartItem) {
        return { ...product, stock: product.stock - cartItem.quantity };
      }
      return product;
    });

    try {
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      const transactionLogs = JSON.parse(localStorage.getItem("transactionLogs") || "[]");
      transactionLogs.push(transaction);
      localStorage.setItem("transactionLogs", JSON.stringify(transactionLogs));
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        alert("Storage quota exceeded. Please clear your browser data.");
      }
    }

    setShowPayment(true);
    setReceipt(transaction);
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
  
    // Kosongkan keranjang di context saja
    try {
      clearCart(); // Fungsi untuk mengosongkan keranjang di context
      localStorage.setItem("cart", JSON.stringify([])); // Kosongkan data keranjang di localStorage
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        alert("Storage quota exceeded. Please clear your browser data.");
      }
    }
  };  

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      savedCart.forEach(item => {
        // Sync each item with context (if necessary)
      });
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        alert("Storage quota exceeded. Please clear your browser data.");
      }
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2>Keranjang Belanja</h2>
      {cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Harga: Rp {item.price.toLocaleString()}</p>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex align-items-center justify-content-center">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleQuantityChange(index, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleQuantityChange(index, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <p className="text-end mb-0">
                        Total: Rp {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <div className="col-md-1">
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="btn btn-danger btn-sm"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="payment-section mt-4">
            <div className="card">
              <div className="card-body">
                <h5>Total: Rp {totalPrice.toLocaleString()}</h5>
                {!showPayment ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowPayment(true)}
                  >
                    Bayar
                  </button>
                ) : (
                  <div className="payment-form">
                    <div className="mb-3">
                      <label className="form-label">Jumlah Pembayaran:</label>
                      <input
                        type="number"
                        className="form-control"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        min={totalPrice}
                        placeholder={`Minimal Rp ${totalPrice.toLocaleString()}`}
                      />
                    </div>
                    <button
                      className="btn btn-success me-2"
                      onClick={handlePayment}
                      disabled={!paymentAmount || parseFloat(paymentAmount) < totalPrice}
                    >
                      Proses Pembayaran
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowPayment(false);
                        setPaymentAmount("");
                      }}
                    >
                      Batal
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {showReceipt && receipt && (
            <div className="receipt-popup" style={popupStyle}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Struk Pembayaran</h5>
                  <p><strong>Tanggal:</strong> {receipt.date}</p>
                  <p><strong>Total Pembayaran:</strong> Rp {receipt.payment.toLocaleString()}</p>
                  <p><strong>Total Belanja:</strong> Rp {receipt.total.toLocaleString()}</p>
                  <p><strong>Kembalian:</strong> Rp {receipt.change.toLocaleString()}</p>
                  <h6>Rincian Belanja:</h6>
                  <ul>
                    {receipt.items.map((item, index) => (
                      <li key={index}>
                        {item.name} x{item.quantity} = Rp {item.total.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                  <button onClick={handleCloseReceipt} className="btn btn-primary">
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="alert alert-warning" role="alert">
          Keranjang belanja Anda kosong.
        </div>
      )}
    </div>
  );
};

export default CartPage;