'use client'
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "context/AuthProvider";
import { HREF } from "lib/constants";

export default function RedirectIfUnauth({ children }) {
  const { state } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!state.isAuthenticated) {
      router.replace(HREF.LOGIN_PAGE);
    }
  }, [state.isAuthenticated, router]);

  if (!state.isAuthenticated) return null;

  return children;
}