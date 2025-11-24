'use client'
import { HREF, RECOVERY_PASSWORDD_REQUEST_ENDPOINT, STATUS } from "lib/constants";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { handleAuthData, postRequest } from "utils/auth-utils";

export default function SendPasswordRecovery() {
  const [isBackendError, setBackendError] = useState(false);
  const [errorValue, setErrorValue] = useState(null);
  const router = useRouter();

  const [isFormTouched, setIsFormTouched] = useState({
    email: false,
  })

  const [form, setForm] = useState({
    email: "",
  });

  const emailRef = useRef(null);

  const isValid = {
    email: emailRef.current?.checkValidity() ?? false,
  };

  const formIsValid = useMemo(() => (isValid.email), [isValid]);

  const submitBtnIsDisabled = useMemo(() => (!formIsValid), [formIsValid]);

  const sendPasswordRecoveryEmail = async () => {
    console.log("Password recovery request.");
    const requestBody = {
      email: form.email,
    };

    try {
      const { response, json } = await postRequest(RECOVERY_PASSWORDD_REQUEST_ENDPOINT, requestBody);
      if (response.ok) {
        setBackendError(null);
        handleAuthData(json);
        router.push(HREF.PASSWORD_RECOVERY_SEND_PAGE);
      }
      else if (response.status === STATUS.INTERNAL_SERVER_ERROR) {
        setErrorValue(json.data);
      } else {
        router.push(HREF.ERROR_PAGE);
      }
    } catch (error) {
      console.log('An error occurred:', error.message);
      router.push(HREF.ERROR_PAGE);
    }
  };

  return (
    <div className="hero min-h-[60vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Password recovery</legend>

        <label htmlFor="emailInput" className="label">Email</label>
        <input
          ref={emailRef}
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

        <button className="btn btn-neutral mt-4" disabled={submitBtnIsDisabled} onClick={sendPasswordRecoveryEmail}>Send email</button>
        {isBackendError && (
          <p className="validator-hint">{errorValue}</p>
        )}
      </fieldset>
    </div>
  );
}