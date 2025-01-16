import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center py-4">
      <div className="container">
        <p className="mb-1">
          &copy; 2024 Supermarket App. All Rights Reserved.
        </p>
        <p className="mb-0">
          <a href="/privacy" className="text-decoration-none">
            Kebijakan Privasi
          </a>{" "}
          |{" "}
          <a href="/contact" className="text-decoration-none">
            Hubungi Kami
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
