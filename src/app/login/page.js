'use client'
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { HEADERS, HREF, LOGIN_ENDPOINT, USER_CONSTANTS } from "lib/constants";

export default function Login() {
  const [errorValue, setErrorValue] = useState(null);
  const router = useRouter();

  const [isFormTouched, setIsFormTouched] = useState({
    email: false,
    password: false,
  })

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const refs = {
    password: useRef(null),
    email: useRef(null),
  };

  const isValid = {
    email: refs.email.current?.checkValidity() ?? false,
    password: refs.password.current?.checkValidity() ?? false
  }

  const formIsValid = isValid.email && isValid.password;
  const submitBtnIsDisabled = !formIsValid


  const loginPostRequest = async () => {
    const requestBody = {
      email: form.email,
      password: form.password,
    };

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(requestBody),
      });

      const responseJson = await response.json();
      console.log("Response status:", response.status);
      console.log("Json Response:", responseJson);

      if (!response.ok) {
        setErrorValue(responseJson);
        return;
      }

      console.log("Response:", responseJson);
      // router.push();

    } catch (error) {
      console.log('An error occurred:', error.message);
      router.push('/error');
    }
  };

  return (
    <div className="hero min-h-[70vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

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
          ref={refs.password}
          id="passInput"
          type="password"
          className="input"
          placeholder="Password"
          maxLength={USER_CONSTANTS.PASSWORD_MAX_LENGTH}
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onBlur={() => setIsFormTouched({ ...isFormTouched, password: true })}
        />
        {isFormTouched.password && !isValid.password && (
          <p className="validator-hint">Enter password.</p>
        )}

        <div>
          <Link href={HREF.PASSWORD_RECOVERY_PAGE} className="link link-hover">Forgot password?</Link>
        </div>

        <button className="btn btn-neutral mt-4" disabled={submitBtnIsDisabled} onClick={loginPostRequest}>Login</button>
        {errorValue !== null && (
          Object.values(errorValue).map(error => <p className="validator-hint">{error}</p>)
        )}

        <div className="mt-2 w-full flex justify-end">
          <Link href={HREF.REGISTRATION_PAGE} className="link link-hover">Create new account</Link>
        </div>
      </fieldset>
    </div>
  );
}