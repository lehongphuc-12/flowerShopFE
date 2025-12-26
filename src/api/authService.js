import apiClient from "./apiClient";

const authService = {
  login: async (credentials) => {
    const response = await apiClient.post("/users/login", credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await apiClient.post("/users/register", userData);
    return response.data;
  },
  getLoginStatus: async () => {
    const response = await apiClient.get("/users/logInStatus");
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.post("/users/logout");
    return response.data;
  },
};

export default authService;
