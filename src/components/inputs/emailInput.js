'use client'
import { useEffect, useState, useRef } from "react";

export default function EmailInput() {
    const [isTouched, setIsTouched] = useState(false);
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            setIsValid(inputRef.current.checkValidity());
        }
    }, [value]);

    return (
        <>
            <label className="label">Email</label>
            <input ref={inputRef} type="email" className="input" placeholder="Email" required
                value={value} onChange={e => setValue(e.target.value)}
                onBlur={() => setIsTouched(true)} />
            {isTouched && !isValid && (
                <div className="validator-hint">Enter valid email address</div>
            )}
        </>
    );
}