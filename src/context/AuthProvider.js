'use client'
import { getAccessToken } from "utils/auth-utils";
import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const reducer = (state, action) => {
  console.log("Reducer");
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true };
    case "logout":
      return { ...state, isAuthenticated: false };
    case "setAuth":
      return {...state, isAuthenticated: action.payload};
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { isAuthenticated: false });

  useEffect(() => {
    const accessToken = getAccessToken();
    dispatch({ type: "setAuth", payload: !!accessToken });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}