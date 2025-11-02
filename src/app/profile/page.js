'use client'
import { AuthContext } from 'context/AuthProvider';
import { HREF } from 'lib/constants';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function Profile() {
  const router = useRouter();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push(HREF.LOGIN_PAGE);
    }
  }, [state.isAuthenticated, router]);

  if (!state.isAuthenticated) return null;

  return (
    <>
      <p>Siema</p>
    </>
  );
}
