import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ProductForm.css";

const ProductForm = ({ formData, handleChange, handleSubmit, isLoading }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange({
        target: {
          name: 'image',
          value: file
        }
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="product-form-container">
      <div className="product-form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="image-upload-section">
              <div className="image-preview">
                {preview ? (
                  <img src={preview} alt="Preview" className="preview-image"/>
                ) : (
                  <div className="image-placeholder">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Upload Gambar Produk</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
                required
              />
              <label htmlFor="image" className="image-upload-button">
                Pilih Gambar
              </label>
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="productName">Nama Produk</label>
              <input
                type="text"
                id="name"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Masukkan nama produk"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Harga (Rp)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Masukkan harga"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stok</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Masukkan jumlah stok"
                min="0"
              />
            </div>

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Menyimpan...
                </>
              ) : (
                'Tambah Produk'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductForm.propTypes = {
  formData: PropTypes.shape({
    productName: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    stock: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ProductForm;