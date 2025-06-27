import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const API_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const isAuthenticated = !!user;

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

  const fetchUserData = async (authToken) => {
    const response = await fetch(`${API_BACKEND_URL}/api/user/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const userData = await response.json();
    if (!response.ok) throw new Error(userData.message);
    setUser(userData);
    return userData;
  };

  const login = async (email, password) => {
    const response = await fetch(`${API_BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    return fetchUserData(data.token);
  };

  const register = async (firstName, lastName, email, password) => {
    const response = await fetch(`${API_BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    return fetchUserData(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, register, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
