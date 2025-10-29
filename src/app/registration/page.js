'use client'
import Link from "next/link";
import { useContext, useMemo, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { HREF, REGISTER_ENDPOINT, STATUS, USER_CONSTANTS } from "lib/constants";
import { handleAuthData, authRequest } from "utils/auth-utils";
import { AuthContext } from "context/AuthProvider";

export default function Registration() {
  const [errorValue, setErrorValue] = useState(null);
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);

  const [isFormTouched, setIsFormTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  })

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const usernameRef = useRef(null);
  const emailRef = useRef(null);

  const isValid = {
    username: usernameRef.current?.checkValidity() ?? false,
    email: emailRef.current?.checkValidity() ?? false,
    password: form.password.length >= USER_CONSTANTS.PASSWORD_MIN_LENGTH,
    confirmPassword: form.confirmPassword === form.password,
  };

  const formIsValid = useMemo(() =>
    (isValid.username && isValid.email && isValid.password && isValid.confirmPassword), [isValid]);

  const submitBtnIsDisabled = useMemo(() => (!formIsValid), [formIsValid]);

  const userRegistration = async () => {
    console.log("-----SEND Register Request-----");
    const requestBody = {
      username: form.username,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    try {
      const { response, json } = await authRequest(REGISTER_ENDPOINT, requestBody);
      if (response.ok) {
        setErrorValue(null);
        // Save user and accessToken
        handleAuthData(json);
        dispatch({ type: "login" });
        router.push(HREF.PROFILE_PAGE);
      }
      else if (response.status === STATUS.CONFLICT) {
        setErrorValue(json.data);
      } else {
        router.push(HREF.ERROR_PAGE);
      }
    } catch (error) {
      console.log('An error occurred:', error.message);
      router.push(HREF.ERROR_PAGE);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleOnBlur(e) {
    setIsFormTouched(prev => ({ ...prev, [e.target.name]: true }));
  }

  return (
    <div className="hero min-h-[70vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Registration</legend>

        <label htmlFor="usernameInput" className="label">Username</label>
        <input
          ref={usernameRef}
          id="usernameInput"
          type="text"
          className="input"
          placeholder="Username"
          maxLength={USER_CONSTANTS.USERNAME_MAX_LENGTH}
          required
          name="username"
          value={form.username}
          onChange={handleChange}
          onBlur={handleOnBlur}
        />
        {isFormTouched.username && !isValid.username && (
          <p className="validator-hint">Enter unique username.</p>
        )}

        <label htmlFor="emailInput" className="label">Email</label>
        <input
          ref={emailRef}
          id="emailInput"
          type="email"
          className="input"
          placeholder="Email"
          required
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleOnBlur}
        />
        {isFormTouched.email && !isValid.email && (
          <p className="validator-hint">Enter email address.</p>
        )}

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
          minLength={USER_CONSTANTS.PASSWORD_MIN_LENGTH}
          maxLength={USER_CONSTANTS.PASSWORD_MAX_LENGTH}
          required
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          onBlur={handleOnBlur}
        />
        {isFormTouched.confirmPassword && !isValid.confirmPassword && (
          <p className="validator-hint">Wrong password.</p>
        )}

        <button id="registerBtn" className="btn btn-neutral mt-4" disabled={submitBtnIsDisabled} onClick={userRegistration}>Register</button>
        {errorValue !== null && (
          Object.values(errorValue).map(error => <p className="validator-hint">{error}</p>)
        )}

        <div className="mt-2 w-full flex justify-end">
          <Link href={HREF.LOGIN_PAGE} className="link link-hover">Login to existing account.</Link>
        </div>
      </fieldset>
    </div>
  );
}