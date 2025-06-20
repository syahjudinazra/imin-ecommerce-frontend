import axios from "axios";

const BASE_API_URL = "http://127.0.0.1:8000/api";
const BASE_IMAGE_URL = "http://127.0.0.1:8000";

const token = localStorage.getItem("token") || "";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (typeof imagePath !== "string") return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `${BASE_IMAGE_URL}${imagePath}`;
};

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
  reviews: "/reviews",
  reviewDetail: "/reviews/{id}",
  productReviews: "/products/{id}/reviews",
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
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch product ${id}: ${error.message}`);
    }
  },

  // Fetch all reviews with optional filters
  getReviews: async (params = {}) => {
    try {
      const response = await api.get(endpoints.reviews, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch reviews: ${error.message}`);
    }
  },

  // NEW: Fetch detailed review by ID
  getReviewDetail: async (reviewId) => {
    try {
      const url = endpoints.reviewDetail.replace("{id}", reviewId);
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch review detail ${reviewId}: ${error.message}`
      );
    }
  },

  // Fetch reviews for specific product with statistics
  getProductReviews: async (productId, params = {}) => {
    try {
      const url = endpoints.productReviews.replace("{id}", productId);
      const response = await api.get(url, { params });
      return response.data.data;
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

export { api, BASE_IMAGE_URL, getImageUrl };
