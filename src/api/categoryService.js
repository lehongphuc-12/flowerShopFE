import apiClient from "./apiClient";

const categoryService = {
  getCategories: async () => {
    const response = await apiClient.get("/categories/");
    return response.data;
  },
};

export default categoryService;
