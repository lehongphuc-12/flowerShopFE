import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for standardization
apiClient.interceptors.response.use(
  (response) => {
    // Return only the data from the response
    return response.data;
  },
  (error) => {
    // Standardize error structure
    const standardizedError = {
      message: error.response?.data?.message || error.message || "Đã có lỗi xảy ra",
      status: error.response?.status || 500,
      state: false,
      error: error.response?.data || error.message,
    };

    console.error("[API Error]:", standardizedError);
    return Promise.reject(standardizedError);
  }
);

export default apiClient;
