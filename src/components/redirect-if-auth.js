'use client'
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "context/AuthProvider";
import { HREF } from "lib/constants";

export default function RedirectIfAuth({ children }) {
  const { state } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (state.isAuthenticated) {
      console.log("Redirect to main page from login page if authenticated.");
      router.replace(HREF.SET_INIT_DATA);
    }
  }, [state.isAuthenticated, router]);

  return children;
}