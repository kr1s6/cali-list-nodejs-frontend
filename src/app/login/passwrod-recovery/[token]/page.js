'use client'

import PasswordRecoveryTokenPage from "features/auth/pages/password-recovery/PasswordRecoveryToken";

export default function PasswordRecoveryToken({ params }) {
  return <PasswordRecoveryTokenPage token={params.token} />;
}
