'use client'
import { getAccessToken, refreshTokenRequest } from "utils/auth-utils";
import { createContext, useEffect, useReducer, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import Footer from "components/footer";
import { LoadingNavabar } from "components/navbar";

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
  const [state, dispatch] = useReducer(reducer, { isAuthenticated: false });

  useEffect(() => {
    async function checkAuth() {
      try {
        const accessToken = getAccessToken();
        if (!accessToken) {
          dispatch({ type: "setAuth", payload: false });
          return;
        }
        const decodedAccessToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000 - 60;

        if (decodedAccessToken.exp > currentTime) {
          console.log("ACCESS TOKEN - VALID");
          dispatch({ type: "setAuth", payload: true });
        } else {
          console.log("ACCESS TOKEN - EXPIRED");
          setIsExpired(true);
        }

      } catch (error) {
        console.error("Error decoding token:", error);
        dispatch({ type: "setAuth", payload: false });
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

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
      <>
        <LoadingNavabar></LoadingNavabar>
        <Footer></Footer>
      </>
    );
  }

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}