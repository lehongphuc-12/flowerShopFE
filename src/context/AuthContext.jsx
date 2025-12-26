import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserStatus = async () => {
    setLoading(true);
    try {
      const data = await authService.getLoginStatus();
      if (data.status) {
        setUser({ fullName: data.fullName });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStatus();
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    if (data.state) {
      await fetchUserStatus();
    }
    return data;
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    refreshStatus: fetchUserStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
