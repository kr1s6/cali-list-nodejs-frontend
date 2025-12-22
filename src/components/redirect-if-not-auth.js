'use client'
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "features/shared/context/AuthProvider";
import { HREF } from "features/shared/constants";

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