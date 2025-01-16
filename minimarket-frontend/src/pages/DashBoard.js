import React from "react";
import { Link } from "react-router-dom"; // Pastikan Link diimpor
import { FaPlus, FaBoxes, FaShoppingCart, FaBox, FaFileInvoice } from "react-icons/fa"; // eslint-disable-next-line


const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <h1>In The Market</h1>
      <p>Kelola produk dan transaksi dengan mudah!</p>
    </div>
  );
};

const DashboardCards = () => {
  return (
    <div className="container">
    <div className="row g-4">
      <div className="col-md-3">
        <Link to="/add" className="text-decoration-none">
          <div className="dashboard-card">
            <FaPlus size={40} className="icon" />
            <h3>Tambah Produk</h3>
            <p>Tambahkan produk baru ke sistem dengan mudah</p>
          </div>
        </Link>
      </div>
      <div className="col-md-3">
        <Link to="/products" className="text-decoration-none">
          <div className="dashboard-card">
            <FaBox size={40} className="icon" />
            <h3>Daftar Produk</h3>
            <p>Lihat, kelola, dan edit semua produk yang tersedia</p>
          </div>
        </Link>
      </div>
      <div className="col-md-3">
        <Link to="/cart" className="text-decoration-none">
          <div className="dashboard-card">
            <FaShoppingCart size={40} className="icon" />
            <h3>Keranjang</h3>
            <p>Lihat daftar produk yang akan dibeli</p>
          </div>
        </Link>
      </div>
      
      {/* Tambahkan Kartu untuk Log Transaksi */}
      <div className="col-md-3">
        <Link to="/transaction-logs" className="text-decoration-none">
          <div className="dashboard-card">
            <FaFileInvoice size={40} className="icon" />
            <h3>Log Transaksi</h3>
            <p>Lihat riwayat transaksi yang telah dilakukan</p>
          </div>
        </Link>
      </div>
    </div>
  </div>
  );
};

const DashBoard = () => {
  return (
    <div>
      <DashboardHeader />
      <DashboardCards />
    </div>
  );
};

export default DashBoard;
