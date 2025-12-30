/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import authService from "../api/authService";

const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserStatus = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchUserStatus();
  }, [fetchUserStatus]);

  const login = useCallback(async (credentials) => {
    const data = await authService.login(credentials);
    if (data.state) {
      await fetchUserStatus();
    }
    return data;
  }, [fetchUserStatus]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      refreshStatus: fetchUserStatus,
    }),
    [user, loading, login, logout, fetchUserStatus]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
