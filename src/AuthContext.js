import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (accessToken, refreshToken, userId) => {
    try {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUserId(userId);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };


  const logout = () => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
    setAccessToken(null);
    setRefreshToken(null);
    setUserId(null);
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
