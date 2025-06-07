import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const fetchUserData = async (authToken) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/me', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const userData = await response.json();
      if (!response.ok) throw new Error(userData.message);
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);
      
      setToken(data.token);
      localStorage.setItem('token', data.token);
      
      // Fetch user data after successful login
      const userData = await fetchUserData(data.token);
      return { token: data.token, user: userData };
    } catch (error) {
      throw error;
    }
  };

  const register = async (firstName, lastName, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);
      
      setToken(data.token);
      localStorage.setItem('token', data.token);
      
      // Fetch user data after successful registration
      const userData = await fetchUserData(data.token);
      return { token: data.token, user: userData };
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};