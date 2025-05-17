'use client'
import { useEffect, useState, useRef } from "react";

export default function NameInput() {
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
            <label className="label">Name</label>
            <input ref={inputRef} type="text" className="input" placeholder="Name" maxLength="30" required
                value={value} onChange={e => setValue(e.target.value)}
                onBlur={() => setIsTouched(true)} />
            {isTouched && !isValid && (
                <div className="validator-hint">Enter name</div>
            )}
        </>
    );
}