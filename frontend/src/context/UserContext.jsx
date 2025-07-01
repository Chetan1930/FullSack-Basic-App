import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create context
const UserContext = createContext();

// Create provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // ✅ LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log(res);
      if (res.data && res.data.user) {
        setUser(res.data);
        setIsAuthenticated(true);
        navigate('/');
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      toast?.error?.("Login failed. Please try again.");
    }
  };

  // ✅ LOGOUT FUNCTION
  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err.message);
    } finally {
      setUser({});
      setIsAuthenticated(false);
    }
  };

  // ✅ REGISTER FUNCTION
  const register = async (username, email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        { username, email, password },
        { withCredentials: true }
      );
      if (res.data && res.data.user) {
        setUser(res.data);
        setIsAuthenticated(true);
        toast?.success?.("Registered successfully!");
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
      toast?.error?.("Registration failed. Please try again.");
    }
  };

  // ✅ AUTO-CHECK LOGIN (optional, if token stored in cookies)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/me`,
          { withCredentials: true }
        );
        if (res.data && res.data.user) {
          setUser(res.data.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout, register, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context
export const useAuth = () => useContext(UserContext);
