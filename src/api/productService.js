import apiClient from "./apiClient";

const productService = {
  getProducts: async (filters) => {
    return apiClient.post("/product/getProducts", filters);
  },
  getProductById: async (id) => {
    return apiClient.get(`/product/${id}`);
  },
};

export default productService;
