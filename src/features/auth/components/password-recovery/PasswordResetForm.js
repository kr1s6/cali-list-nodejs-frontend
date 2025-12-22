'use client';
import usePasswordResetForm from "features/auth/hooks/password-recovery/usePasswordResetForm";
import { USER_CONSTANTS } from "features/shared/constants";

export default function PasswordResetForm({ token }) {
    const {
        form,
        isValid,
        isFormTouched,
        submitDisabled,
        backendError,
        handleChange,
        handleOnBlur,
        submit
    } = usePasswordResetForm(token);

    return (
        <div className="hero min-h-[60vh]">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Set new password</legend>

                <label className="label">Password</label>
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

                <label className="label">Confirm Password</label>
                <input
                    id="confirmPassInput"
                    type="password"
                    className="input"
                    placeholder="Confirm Password"
                    required
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleOnBlur}
                />
                {isFormTouched.confirmPassword && !isValid.confirmPassword && (
                    <p className="validator-hint">Passwords do not match.</p>
                )}

                <button className="btn btn-neutral mt-4" disabled={submitDisabled} onClick={submit}>
                    Change password
                </button>

                {backendError && <p className="validator-hint">{backendError}</p>}
            </fieldset>
        </div>
    );
}
