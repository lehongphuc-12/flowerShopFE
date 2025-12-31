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
  getProfile: async () => {
    return apiClient.get("/users/profile");
  },
  updateProfile: async (profileData) => {
    return apiClient.put("/users/updateProfile", profileData);
  },
  googleLogin: async (token) => {
    return apiClient.post("/users/loginWithGoogle", { token });
  },
};

export default authService;
