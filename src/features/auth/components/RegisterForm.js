'use client';

import { HREF, USER_CONSTANTS } from "features/shared/constants";
import useRegisterForm from "../hooks/useRegisterForm";

export default function RegisterForm() {
    const {
        form,
        errorValue,
        isValid,
        isFormTouched,
        submitBtnIsDisabled,
        usernameRef,
        emailRef,
        handleChange,
        handleOnBlur,
        userRegistration } = useRegisterForm();

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