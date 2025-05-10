'use client'
import { validate } from "email-validator";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Registration() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [nameValue, setName] = useState('');
  const [emailValue, setEmail] = useState('');
  const [passwordValue, setPassword] = useState('');

  useEffect(() => {
    if (2 <= nameValue.length <= 50) {
      if (validate(emailValue)) {
        if(passwordValue.length >= 8){
          setIsDisabled(false);
          return;
        }
      }
    }
    setIsDisabled(true);
  }, [nameValue, emailValue, passwordValue]);

  return (
    <div className="hero min-h-[60vh]">
      <fieldset className="fieldset bg-base-200 border-neutral/10 rounded-box 
      w-xs border p-4 inset-shadow-sm inset-shadow-base-300">
        <legend className="fieldset-legend">Registration</legend>

        <label className="label">Name</label>
        <input type="text" className="input" placeholder="Name"  
        value={nameValue} onChange={e => setName(e.target.value)}/>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" 
        value={emailValue} onChange={e => setEmail(e.target.value)}/>

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" 
        value={passwordValue} onChange={e => setPassword(e.target.value)}/>

        <button className="btn btn-neutral mt-4" disabled={isDisabled}>Login</button>

        <div className="mt-2 w-full flex justify-end">
          <Link href="/login" className="link link-hover">Login to existing account</Link>
        </div>
      </fieldset>
    </div>
  );
}