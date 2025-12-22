'use client';

import PasswordResetForm from "features/auth/components/password-recovery/PasswordResetForm";

export default function PasswordRecoveryTokenPage({ token }) {
  return <PasswordResetForm token={token} />;
}
