'use client'
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { HEADERS, HREF, REGISTER_ENDPOINT, STATUS, USER_CONSTANTS } from "lib/constants";

export default function Registration() {
  const [errorValue, setErrorValue] = useState(null);
  const router = useRouter();

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

  const refs = {
    username: useRef(null),
    email: useRef(null),
  };

  const isValid = {
    username: refs.username.current?.checkValidity() ?? false,
    email: refs.email.current?.checkValidity() ?? false,
    password: form.password.length >= 8,
    confirmPassword: form.confirmPassword === form.password,
  }

  const formIsValid = isValid.username && isValid.email && isValid.password && isValid.confirmPassword;
  const submitBtnIsDisabled = !formIsValid;

  const registrationPostRequest = async () => {
    const requestBody = {
      username: form.username,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    try {
      const response = await fetch(REGISTER_ENDPOINT, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(requestBody),
      });

      const responseJson = await response.json();
      console.log("Response status:", response.status);
      console.log("Json Response:", responseJson);

      if (response.status === STATUS.CREATED) {
        setErrorValue(null);
        localStorage.setItem("jwt", responseJson.jwt);
        // router.push();
      }
      else if (response.status === STATUS.CONFLICT) {
        setErrorValue(responseJson);
        return;
      }
      else {
        router.push('/error');
      }
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
        <input
          ref={refs.username}
          id="usernameInput"
          type="text"
          className="input"
          placeholder="Username"
          maxLength={USER_CONSTANTS.USERNAME_MAX_LENGTH}
          required
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          onBlur={() => setIsFormTouched({ ...isFormTouched, username: true })}
        />
        {isFormTouched.username && !isValid.username && (
          <p className="validator-hint">Enter unique username.</p>
        )}

        <label htmlFor="emailInput" className="label">Email</label>
        <input
          ref={refs.email}
          id="emailInput"
          type="email"
          className="input"
          placeholder="Email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          onBlur={() => setIsFormTouched({ ...isFormTouched, email: true })}
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
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onBlur={() => setIsFormTouched({ ...isFormTouched, password: true })}
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
          value={form.confirmPassword}
          onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
          onBlur={() => setIsFormTouched({ ...isFormTouched, confirmPassword: true })}
        />
        {isFormTouched.confirmPassword && !isValid.confirmPassword && (
          <p className="validator-hint">Wrong password.</p>
        )}

        <button id="registerBtn" className="btn btn-neutral mt-4" disabled={submitBtnIsDisabled} onClick={registrationPostRequest}>Register</button>
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