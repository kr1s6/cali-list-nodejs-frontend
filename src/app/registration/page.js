'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Registration() {
  const userConst = {
    USERNAME_MAX_LENGTH: 30,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 512
  };

  const [registerBtnIsDisabled, setRegisterBtnIsDisabled] = useState(true);
  const [isBackendError, setIsBackendError] = useState(false);
  const [errorValue, setErrorValue] = useState(null);
  const router = useRouter();

  const [usernameIsTouched, usernameSetIsTouched] = useState(false);
  const [emailIsTouched, emailSetIsTouched] = useState(false);
  const [passwordIsTouched, passwordSetIsTouched] = useState(false);
  const [confirmPasswordIsTouched, confirmPasswordSetIsTouched] = useState(false);

  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

  const [usernameIsValid, nameSetIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwrodIsValid, setPasswordIsValid] = useState(false);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);

  const refs = {
    username: useRef(null),
    email: useRef(null),
  };

  useEffect(() => {
    if (usernameIsValid && emailIsValid && passwrodIsValid && confirmPasswordIsValid) {
      setRegisterBtnIsDisabled(false);
    } else {
      setRegisterBtnIsDisabled(true);
    }
  }, [usernameIsValid, emailIsValid, passwrodIsValid, confirmPasswordIsValid]);

  useEffect(() => {
    if (refs.username.current) {
      nameSetIsValid(refs.username.current.checkValidity());
    }
  }, [usernameValue]);

  useEffect(() => {
    if (refs.email.current) {
      setEmailIsValid(refs.email.current.checkValidity());
    }
  }, [emailValue]);

  useEffect(() => {
    setPasswordIsValid(passwordValue.length >= 8);
  }, [passwordValue]);

  useEffect(() => {
    setConfirmPasswordIsValid(confirmPasswordValue === passwordValue);
  }, [confirmPasswordValue, passwordValue]);

  const registrationPostRequest = async () => {
    const requestBody = {
      name: usernameValue,
      email: emailValue,
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
    };
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const error = await response.text();
        setErrorValue(error);
        setIsBackendError(true);
        console.log(`Error ${response.status}: ${error}`);
        return;
      }

      setIsBackendError(false);
      const successMessage = await response.text();
      console.log("Response:", successMessage);
      // router.push();

    } catch (error) {
      console.log('An error occurred:', error.message);
      router.push('/error');
    }
  };

  return (
    <div className="hero min-h-[60vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Registration</legend>

        <label htmlFor="usernameInput" className="label">Username</label>
        <input ref={refs.username} id="usernameInput" type="text" className="input" placeholder="Username" maxLength={userConst.USERNAME_MAX_LENGTH} required
          value={usernameValue} onChange={e => setUsernameValue(e.target.value)}
          onBlur={() => usernameSetIsTouched(true)} />
        {usernameIsTouched && !usernameIsValid && (
          <div className="validator-hint">Enter unique username.</div>
        )}

        <label htmlFor="emailInput" className="label">Email</label>
        <input ref={refs.email} id="emailInput" type="email" className="input" placeholder="Email" required
          value={emailValue} onChange={e => setEmailValue(e.target.value)}
          onBlur={() => emailSetIsTouched(true)} />
        {emailIsTouched && !emailIsValid && (
          <div className="validator-hint">Enter email address.</div>
        )}

        <label htmlFor="passInput" className="label">Password</label>
        <input id="passInput" type="password" className="input" placeholder="Password"
          minLength={userConst.PASSWORD_MIN_LENGTH} maxLength={userConst.PASSWORD_MAX_LENGTH} required
          value={passwordValue} onChange={e => setPasswordValue(e.target.value)}
          onBlur={() => passwordSetIsTouched(true)} />
        <div>
          {passwordIsTouched && !passwrodIsValid && (
            <p className="validator-hint">Minimum 8 characters.</p>
          )}
        </div>

        <label htmlFor="confirmPassInput" className="label">Confirm Password</label>
        <input id="confirmPassInput" type="password" className="input" placeholder="Confirm Password"
          minLength={userConst.PASSWORD_MIN_LENGTH} maxLength={userConst.PASSWORD_MAX_LENGTH} required
          value={confirmPasswordValue} onChange={e => setConfirmPasswordValue(e.target.value)}
          onBlur={() => confirmPasswordSetIsTouched(true)} />
        <div>
          {confirmPasswordIsTouched && !confirmPasswordIsValid && (
            <p className="validator-hint">Wrong password.</p>
          )}
        </div>

        <button id="registerBtn" className="btn btn-neutral mt-4" disabled={registerBtnIsDisabled} onClick={registrationPostRequest}>Register</button>
        {isBackendError && (<p className="validator-hint">{errorValue}</p>)}

        <div className="mt-2 w-full flex justify-end">
          <Link href="/login" className="link link-hover">Login to existing account.</Link>
        </div>
      </fieldset>
    </div>
  );
}