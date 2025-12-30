import apiClient from "./apiClient";

const categoryService = {
  getCategories: async () => {
    return apiClient.get("/categories/");
  },
};

export default categoryService;
