import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  const login = (accessToken, refreshToken, userId, role) => {
    try {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUserId(userId);
      setRole(role);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };


  const logout = () => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
    setAccessToken(null);
    setRefreshToken(null);
    setUserId(null);
    setRole(null);
  };

  const isAuthenticated = () => {
    return !!accessToken;
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
