import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaShoppingCart, FaHome, FaBoxes } from 'react-icons/fa';

const Nbar = ({ brandName = "Supermarket App" }) => {
  const navItems = [
    { path: "/", text: "Home", icon: <FaHome />, exact: true },
    { path: "/products", text: "Produk", icon: <FaBoxes /> },
    { path: "/cart", text: "Keranjang", icon: <FaShoppingCart /> }
  ];

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <div className="navbar-brand-container">
          <span className="navbar-brand d-flex align-items-center">
            {brandName}
          </span>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                  }
                  to={item.path}
                  end={item.exact}
                >
                  {item.icon}
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Nbar.propTypes = {
  brandName: PropTypes.string,
};

export default Nbar;