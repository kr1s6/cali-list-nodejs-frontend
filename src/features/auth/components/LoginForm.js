'use client';
import Link from "next/link";
import useLoginForm from "../hooks/useLoginForm";
import { USER_CONSTANTS, HREF } from "features/shared/constants";

export default function LoginForm() {
    const {
        form,
        errorValue,
        isValid,
        isFormTouched,
        submitBtnIsDisabled,
        emailRef,
        handleChange,
        handleOnBlur,
        submit
    } = useLoginForm();

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

                <button
                    className="btn btn-neutral mt-4"
                    disabled={submitBtnIsDisabled}
                    onClick={submit}>
                    Login
                </button>

                {errorValue !== null && (<p className="validator-hint">{errorValue}</p>)}

                <div className="mt-2 w-full flex justify-end">
                    <Link href={HREF.REGISTRATION_PAGE} className="link link-hover">Create new account</Link>
                </div>
            </fieldset>
        </div>
    );
}
