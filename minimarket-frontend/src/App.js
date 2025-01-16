import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import Nbar from "./components/Nbar";
import Footer from "./components/Footer";
import AddProductPage from "./pages/AddProductPage";
import TransactionLogs from "./pages/TransactionLogs";
import ErrorBoundary from "./components/ErrorBoundary";
import PropTypes from 'prop-types';

// Komponen untuk wrapper halaman dengan ErrorBoundary
const PageWrapper = ({ children }) => (
  <ErrorBoundary>
    {children}
  </ErrorBoundary>
);

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

const App = () => {
  console.log('App rendered');
  return (
    <Router>
      <ErrorBoundary>
        <Nbar />
        <div style={{ minHeight: "calc(100vh - 120px)" }}>
          <Routes>
            <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
            <Route 
              path="/cart" 
              element={
                <PageWrapper>
                  <CartPage cartItems={[]} />
                </PageWrapper>
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <PageWrapper>
                  <CheckoutPage cartItems={[]} />
                </PageWrapper>
              } 
            />
            <Route 
              path="/products" 
              element={
                <PageWrapper>
                  <ProductPage />
                </PageWrapper>
              } 
            />
            <Route 
              path="/add" 
              element={
                <PageWrapper>
                  <AddProductPage />
                </PageWrapper>
              } 
            />
            <Route 
              path="/transaction-logs" 
              element={
                <PageWrapper>
                  <TransactionLogs />
                </PageWrapper>
              } 
            />
          </Routes>
        </div>
        <Footer />
      </ErrorBoundary>
    </Router>
  );
};

// PropTypes untuk komponen-komponen yang menerima props
CartPage.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      productName: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
      stock: PropTypes.number
    })
  )
};

CheckoutPage.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      productName: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
      stock: PropTypes.number
    })
  )
};

export default App;