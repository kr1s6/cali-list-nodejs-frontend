'use client'
import { useEffect, useState } from "react";

export default function PasswordInput() {
    const [isTouched, setIsTouched] = useState(false);
    const [passwordValue, setPassword] = useState('');
    const [isValidLength, setIsValidLength] = useState(false);
    const [isOneNumber, setIsOneNumber] = useState(false);
    const [isOneLowerCase, setIsOneLowerCase] = useState(false);
    const [isOneUpperCase, setIsOneUpperCase] = useState(false);
    const minOneNumberRegex = /\d/;
    const minOneLowerCaseRegex = /[a-z]/;
    const minOneUpperCaseRegex = /[A-Z]/;

    useEffect(() => {
        setIsValidLength(passwordValue.length >= 8);
        setIsOneNumber(minOneNumberRegex.test(passwordValue));
        setIsOneLowerCase(minOneLowerCaseRegex.test(passwordValue));
        setIsOneUpperCase(minOneUpperCaseRegex.test(passwordValue));
    }, [passwordValue]);

    return (
        <>
            <label className="label">Password</label>
            <input id="passInput" type="password" className="input" placeholder="Password" minLength="8" required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                value={passwordValue} onChange={e => setPassword(e.target.value)}
                onBlur={() => setIsTouched(true)} />
            <div>
                {isTouched && !isValidLength && (
                    <p className="validator-hint">Must be more than 8 characters</p>
                )}
                {isTouched && !isOneNumber && (
                    <p className="validator-hint">At least one number</p>
                )}
                {isTouched && !isOneLowerCase && (
                    <p className="validator-hint">At least one lowercase letter</p>
                )}
                {isTouched && !isOneUpperCase && (
                    <p className="validator-hint">At least one uppercase letter</p>
                )}
            </div>
        </>
    );
}