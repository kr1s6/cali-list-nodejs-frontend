'use client'
import { getAccessToken, refreshTokenRequest } from "utils/auth-utils";
import { createContext, useEffect, useReducer, useState } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      console.log("AuthContext - login");
      return { ...state, isAuthenticated: true };
    case "logout":
      console.log("AuthContext - logout");
      return { ...state, isAuthenticated: false };
    case "setAuth":
      console.log("AuthContext - setAuth");
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [isExpired, setIsExpired] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [state, dispatch] = useReducer(reducer, { isAuthenticated: false }, (init) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        return ({ ...init, isAuthenticated: false });
      }
      const decodedAccessToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000 - 60;

      if (decodedAccessToken.exp > currentTime) {
        console.log("ACCESS TOKEN - VALID");
        return ({ ...init, isAuthenticated: true });
      } else {
        console.log("ACCESS TOKEN - EXPIRED");
        setIsExpired(true);
      }

    } catch (error) {
      console.error('Error decoding token:', error);
      return ({ ...init, isAuthenticated: false });
    } finally {
      setIsCheckingAuth(false);
    }

  });

  useEffect(() => {
    async function refreshToken() {
      const accessToken = getAccessToken();
      const isSuccess = await refreshTokenRequest(accessToken);
      dispatch({ type: "setAuth", payload: !!isSuccess });
      setIsCheckingAuth(false);
    }

    if (isExpired) {
      refreshToken();
    }
  }, [isExpired]);


  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}