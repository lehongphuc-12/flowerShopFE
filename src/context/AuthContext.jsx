/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useCallback } from "react";
import authService from "../api/authService";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserStatus = useCallback(async () => {
    setLoading(true);
    try {
      const data = await authService.getLoginStatus();
      if (data.state || data.status) {
        setUser({
          fullName: data.fullName || data.username || data.name,
          ...data,
        });
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

  const login = useCallback(
    async (credentials) => {
      const data = await authService.login(credentials);
      if (data.state) {
        await fetchUserStatus();
      }
      return data;
    },
    [fetchUserStatus]
  );

  const loginWithGoogle = useCallback(
    async (token) => {
      try {
        const data = await authService.googleLogin(token);
        if (data.state) {
          await fetchUserStatus();
        }
        return data;
      } catch (error) {
        console.error("Google login failed:", error);
        return {
          state: false,
          message: error.message || "Google login failed",
        };
      }
    },
    [fetchUserStatus]
  );

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
      loginWithGoogle,
      logout,
      refreshStatus: fetchUserStatus,
    }),
    [user, loading, login, loginWithGoogle, logout, fetchUserStatus]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
