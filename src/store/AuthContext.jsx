import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token, name: null, email: null, password: null } : { token: null, name: null, email: null, password: null };
  });

  const setAuthInfo = ({ token, name, email, password }) => {
    setAuthData({ token, name, email, password });
    localStorage.setItem('token', token);
  };

  const clearAuthInfo = () => {
    setAuthData({ token: null, name: null, email: null, password: null });
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthData((prevData) => ({ ...prevData, token }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authData, setAuthInfo, clearAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
