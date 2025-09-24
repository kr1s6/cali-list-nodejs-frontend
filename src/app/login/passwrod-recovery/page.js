'use client'
import { useEffect, useRef, useState } from "react";

export default function Login() {
  const [submitBtnIsDisabled, setSubmitBtnIsDisabled] = useState(true);
  const [isBackendError, setIsBackendError] = useState(false);
  const [errorValue, setErrorValue] = useState(null);

  const [isFormTouched, setIsFormTouched] = useState({
    email: false,
  })

  const [form, setForm] = useState({
    email: "",
  });

  const refs = {
    email: useRef(null),
  };

  const isValid = {
    email: refs.email.current?.checkValidity() ?? false,
  }

  useEffect(() => {
    setSubmitBtnIsDisabled(!isValid.email)
  }, [isValid.email]);

  return (
    <div className="hero min-h-[60vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Password recovery</legend>

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

        <button className="btn btn-neutral mt-4" disabled={submitBtnIsDisabled}>Send email</button>
        {isBackendError && (
          <p className="validator-hint">{errorValue}</p>
        )}
      </fieldset>
    </div>
  );
}