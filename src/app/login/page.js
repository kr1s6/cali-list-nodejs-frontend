'use client'
import Link from "next/link";
import { useContext, useMemo, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { HREF, LOGIN_ENDPOINT, USER_CONSTANTS } from "lib/constants";
import { handleAuthData, postRequest } from "utils/auth-utils";
import { AuthContext } from "context/AuthProvider";

export default function Login() {
  const [errorValue, setErrorValue] = useState(null);
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);

  const [isFormTouched, setIsFormTouched] = useState({
    email: false,
    password: false,
  })

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const emailRef = useRef(null);
  const isValid = {
    email: emailRef.current?.checkValidity() ?? false,
    password: form.password.length >= USER_CONSTANTS.PASSWORD_MIN_LENGTH,
  };

  const formIsValid = useMemo(() => (isValid.email && isValid.password), [isValid]);
  const submitBtnIsDisabled = useMemo(() => (!formIsValid), [formIsValid]);


  const loginPostRequest = async () => {
    console.log("Login request.");
    const requestBody = {
      email: form.email,
      password: form.password,
    };

    try {
      const { response, json } = await postRequest(LOGIN_ENDPOINT, requestBody);
      if (response.ok) {
        setErrorValue(null);
        // Save user and accessToken
        handleAuthData(json);
        dispatch({ type: "login" });
        router.push(HREF.PROFILE_PAGE);
      }
      else {
        setErrorValue(json.data);
      }
    } catch (error) {
      console.log('An error occurred:', error.message);
      router.push(HREF.ERROR_PAGE);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  const handleOnBlur = (e) => {
    setIsFormTouched(prev => ({ ...prev, [e.target.name]: true }));
  }

  return (
    <div className="hero min-h-[70vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

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
          <p className="validator-hint">Min 8 characters.</p>
        )}

        <div>
          <Link href={HREF.PASSWORD_RECOVERY_PAGE} className="link link-hover">Forgot password?</Link>
        </div>

        <button className="btn btn-neutral mt-4" disabled={submitBtnIsDisabled} onClick={loginPostRequest}>Login</button>
        {errorValue !== null && (<p className="validator-hint">{errorValue}</p>)}

        <div className="mt-2 w-full flex justify-end">
          <Link href={HREF.REGISTRATION_PAGE} className="link link-hover">Create new account</Link>
        </div>
      </fieldset>
    </div>
  );
}