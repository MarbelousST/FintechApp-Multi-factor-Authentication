// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface AuthContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
