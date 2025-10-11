'use client'
import { getAccessToken } from "utils/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({isAuthenticated: false});

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      setAuthState({isAuthenticated: true });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);