import apiClient from "./apiClient";

const productService = {
  getProducts: async (filters) => {
    const response = await apiClient.post("/product/getProducts", filters);
    return response.data;
  },
  getProductById: async (id) => {
    const response = await apiClient.get(`/product/${id}`);
    return response.data;
  },
};

export default productService;
