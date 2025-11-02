'use client'

import { setAccessToken } from "utils/auth-utils";

const { createContext } = require("react")

const RefreshTokenContext = createContext();

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

export function RefreshTokenProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { isAuthenticated: false }, async (init) => {
    const accessToken = getAccessToken();
    try {
      const decodedAccessToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000 - 60;
      if (decodedAccessToken.exp > currentTime) {
        console.log("ACCESS TOKEN - VALID");
        return ({ ...init, isAuthenticated: true });
      };
    }
    catch (error) {
      console.error('Error decoding token:', error);
      return ({ ...init, isAuthenticated: false });
    }

    console.log("ACCESS TOKEN - EXPIRED");
    const { response, json } = await refreshTokenRequest(accessToken);
    if (response.ok) {
      setAccessToken(json.accessToken);
      console.log("Response: OK - ", json.accessToken);
      return ({ ...init, isAuthenticated: true });
    } else {
      return ({ ...init, isAuthenticated: false });
    }
  });

  return (
    <RefreshTokenContext.Provider value={{ state, dispatch }}>
      {children}
    </RefreshTokenContext.Provider>
  );
}