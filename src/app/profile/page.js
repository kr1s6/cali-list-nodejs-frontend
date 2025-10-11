'use client'
import { useAuth } from 'context/AuthProvider';
import { HREF } from 'lib/constants';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Profile() {
  const router = useRouter();
  const { authState } = useAuth();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push(HREF.LOGIN_PAGE);
    }
  }, [authState.isAuthenticated, router]);

  if (!authState.isAuthenticated) return null;

  return (
    <>
      <p>Siema</p>
    </>
  );
}
