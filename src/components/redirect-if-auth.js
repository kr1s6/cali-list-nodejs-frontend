'use client'
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "features/shared/context/AuthProvider";
import { HREF } from "features/shared/constants";

export default function RedirectIfAuth({ children }) {
  const { state } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    console.log("RedirectIfAuth");
    if (state.isAuthenticated) {
      console.log("Redirect to main page from login page if authenticated.");
      router.replace(HREF.SET_USER_CALI_START_DAY);
    }
  }, [state.isAuthenticated, router]);

  return children;
}