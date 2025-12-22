'use client'

import usePasswordRecoveryForm from "features/auth/hooks/password-recovery/usePasswordRecoveryForm";

export default function SendPasswordRecoveryForm() {
    const {
        form,
        emailRef,
        isFormTouched,
        isValid,
        submitIsDisabled,
        handleChange,
        handleBlur,
        sendPasswordRecoveryEmail,
        errorValue
    } = usePasswordRecoveryForm();

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
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {isFormTouched.email && !isValid.email && (
                    <p className="validator-hint">Enter email address.</p>
                )}

                <button className="btn btn-neutral mt-4" disabled={submitIsDisabled} onClick={sendPasswordRecoveryEmail}>Send email</button>
                {errorValue && (
                    <p className="validator-hint">{errorValue}</p>
                )}
            </fieldset>
        </div>
    );
}