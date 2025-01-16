import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://your-backend-api-url.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch semua produk
export const getProducts = () => apiClient.get("/products");

// Tambah produk baru
export const addProduct = (product) => apiClient.post("/products", product);

// Hapus produk
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);

export default apiClient;
