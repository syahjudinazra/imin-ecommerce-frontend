//api.js
import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Replace with your actual API base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers you need
    // 'Authorization': 'Bearer your-token-here',
  },
});

// Request interceptor - runs before every request
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens, logging, etc. here
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - runs after every response
api.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    // Handle error response
    console.error("API Error:", error.response?.status, error.message);

    // You can handle specific error codes here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // Maybe redirect to login page
    } else if (error.response?.status === 500) {
      // Handle server errors
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  newArrivals: "/products/new-arrivals",
  products: "/products",
  categories: "/categories",
  reviews: "/reviews", // Added reviews endpoint
  productReviews: "/products/{id}/reviews", // Reviews for specific product
};

// API functions
export const apiService = {
  // Fetch new arrivals
  getNewArrivals: async () => {
    try {
      const response = await api.get(endpoints.products);
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch new arrivals: ${error.message}`);
    }
  },

  // Fetch all products
  getProducts: async (params = {}) => {
    try {
      const response = await api.get(endpoints.products, { params });
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },

  // Fetch product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`${endpoints.products}/${id}`);
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch product ${id}: ${error.message}`);
    }
  },

  // Fetch all reviews
  getReviews: async (params = {}) => {
    try {
      const response = await api.get(endpoints.reviews, { params });
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(`Failed to fetch reviews: ${error.message}`);
    }
  },

  // Fetch reviews for specific product
  getProductReviews: async (productId, params = {}) => {
    try {
      const url = endpoints.productReviews.replace("{id}", productId);
      const response = await api.get(url, { params });
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch reviews for product ${productId}: ${error.message}`
      );
    }
  },

  // Create new review
  createReview: async (reviewData) => {
    try {
      const response = await api.post(endpoints.reviews, reviewData);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(`Failed to create review: ${error.message}`);
    }
  },

  // Update review
  updateReview: async (reviewId, reviewData) => {
    try {
      const response = await api.put(
        `${endpoints.reviews}/${reviewId}`,
        reviewData
      );
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(`Failed to update review ${reviewId}: ${error.message}`);
    }
  },

  // Delete review
  deleteReview: async (reviewId) => {
    try {
      const response = await api.delete(`${endpoints.reviews}/${reviewId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete review ${reviewId}: ${error.message}`);
    }
  },

  // Add more API functions as needed
};

export default api;
