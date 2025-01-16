import axios from "axios";

// Create an instance of axios with your backend base URL
const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",  // Ensure this matches your Laravel backend API
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors for request/response handling
apiClient.interceptors.response.use(
  (response) => {
    console.log("API response:", response);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error.response?.data || { message: "An unknown error occurred." });
  }
);

// API calls
export const productAPI = {
  // Fetch all products
  getAll: async () => {
    const response = await apiClient.get("/products");
    return response.data;
  },

  // Create a new product
  create: async (product) => {
    const response = await apiClient.post("/products", product);
    return response.data;
  },

  // Delete a product
  delete: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};