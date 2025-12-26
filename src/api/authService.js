import apiClient from "./apiClient";

const authService = {
  login: async (credentials) => {
    return apiClient.post("/users/login", credentials);
  },
  register: async (userData) => {
    return apiClient.post("/users/register", userData);
  },
  getLoginStatus: async () => {
    return apiClient.get("/users/logInStatus");
  },
  logout: async () => {
    return apiClient.post("/users/logout");
  },
};

export default authService;
