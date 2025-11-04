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
      router.replace(HREF.MAIN_PAGE);
    }
  }, [state.isAuthenticated, router]);

  return children;
}