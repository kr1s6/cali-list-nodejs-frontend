'use client'
import { useMemo, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { HREF, STATUS, USER_CONSTANTS, RECOVERY_PASSWORDD_REQUEST_ENDPOINT } from "features/shared/constants";
import { postRequest } from "utils/auth-utils";

export default function PasswordRecoveryPage({ params }) {
  const { token } = params;
  const router = useRouter();
  const [isBackendError, setBackendError] = useState(null);

  const [isFormTouched, setIsFormTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const isValid = {
    password: form.password.length >= USER_CONSTANTS.PASSWORD_MIN_LENGTH,
    confirmPassword: form.confirmPassword === form.password,
  };

  const formIsValid = useMemo(
    () => (isValid.password && isValid.confirmPassword),
    [isValid]
  );

  const submitBtnIsDisabled = useMemo(
    () => (!formIsValid),
    [formIsValid]
  );

  const submitNewPassword = async () => {
    console.log("Password recovery request.");

    const requestBody = {
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    try {
      const { response, json } = await postRequest(`${RECOVERY_PASSWORDD_REQUEST_ENDPOINT}/${token}`, requestBody);
      // TODO - być może zmienić post na patch

      if (response.ok) {
        setBackendError(null);
        router.push(HREF.PASSWORD_RECOVERY_SUCCESS_PAGE);
      } else if (response.status === STATUS.BAD_REQUEST) {
        setBackendError(json.data);
      } else {
        router.push(HREF.ERROR_PAGE);
      }

    } catch (error) {
      console.log("An error occurred:", error.message);
      router.push(HREF.ERROR_PAGE);
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnBlur = (e) => {
    setIsFormTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  return (
    <div className="hero min-h-[60vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Set new password</legend>

        <label htmlFor="passInput" className="label">Password</label>
        <input
          id="passInput"
          type="password"
          className="input"
          placeholder="Password"
          minLength={USER_CONSTANTS.PASSWORD_MIN_LENGTH}
          maxLength={USER_CONSTANTS.PASSWORD_MAX_LENGTH}
          required
          name="password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleOnBlur}
        />
        {isFormTouched.password && !isValid.password && (
          <p className="validator-hint">Minimum 8 characters.</p>
        )}

        <label htmlFor="confirmPassInput" className="label">Confirm Password</label>
        <input
          id="confirmPassInput"
          type="password"
          className="input"
          placeholder="Confirm Password"
          required
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          onBlur={handleOnBlur}
        />
        {isFormTouched.confirmPassword && !isValid.confirmPassword && (
          <p className="validator-hint">Passwords do not match.</p>
        )}

        <button className="btn btn-neutral mt-4" disabled={submitBtnIsDisabled} onClick={submitNewPassword}>Change password</button>

        {isBackendError && (
          <p className="validator-hint">{isBackendError}</p>
        )}
      </fieldset>
    </div>
  );
}
