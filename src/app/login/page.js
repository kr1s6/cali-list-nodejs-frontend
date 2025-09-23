'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isBackendError, setIsBackendError] = useState(false);
  const [errorValue, setErrorValue] = useState(null);
  const router = useRouter();

  const [emailIsTouched, emailSetIsTouched] = useState(false);
  const [passwordIsTouched, passwordSetIsTouched] = useState(false);

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const refs = {
    password: useRef(null),
    email: useRef(null),
  };

  useEffect(() => {
    if (passwordIsValid && emailIsValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [emailIsValid, passwordIsValid]);

  useEffect(() => {
    if (refs.email.current) {
      setEmailIsValid(refs.email.current.checkValidity());
    }
  }, [emailValue]);

  useEffect(() => {
    if (refs.password.current) {
      setPasswordIsValid(refs.password.current.checkValidity());
    }
  }, [passwordValue]);


  const loginPostRequest = async () => {
    const requestBody = {
      email: emailValue,
      password: passwordValue,
    };
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
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
        <legend className="fieldset-legend">Login</legend>

        <label htmlFor="emailInput" className="label">Email</label>
        <input ref={refs.email} id="emailInput" className="input" placeholder="Email" required
          value={emailValue} onChange={e => setEmailValue(e.target.value)}
          onBlur={() => emailSetIsTouched(true)} />
        {emailIsTouched && !emailIsValid && (
          <div className="validator-hint">Enter email address</div>
        )}

        <label htmlFor="passwordInput" className="label">Password</label>
        <input ref={refs.password} type="password" id="passwordInput" className="input" placeholder="Password" required
          value={passwordValue} onChange={e => setPasswordValue(e.target.value)}
          onBlur={() => passwordSetIsTouched(true)} />
        {passwordIsTouched && !passwordIsValid && (
          <div className="validator-hint">Enter password</div>
        )}

        <div>
          <Link href="/login/passwrod-recovery" className="link link-hover">Forgot password?</Link>
        </div>

        <button className="btn btn-neutral mt-4" disabled={isDisabled} onClick={loginPostRequest}>Login</button>
        {isBackendError && (<p className="validator-hint">{errorValue}</p>)}

        <div className="mt-2 w-full flex justify-end">
          <Link href="/registration" className="link link-hover">Create new account</Link>
        </div>
      </fieldset>
    </div>
  );
}