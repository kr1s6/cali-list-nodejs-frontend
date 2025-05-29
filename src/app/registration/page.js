'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Registration() {
  const [isDisabled, setIsDisabled] = useState(true);

  const [nameIsTouched, nameSetIsTouched] = useState(false);
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, passwordSetIsTouched] = useState(false);

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [nameIsValid, nameSetIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [isValidLength, setIsValidLength] = useState(false);
  const [isOneNumber, setIsOneNumber] = useState(false);
  const [isOneLowerCase, setIsOneLowerCase] = useState(false);
  const [isOneUpperCase, setIsOneUpperCase] = useState(false);
  const minOneNumberRegex = /\d/;
  const minOneLowerCaseRegex = /[a-z]/;
  const minOneUpperCaseRegex = /[A-Z]/;

  const refs = {
    name: useRef(null),
    email: useRef(null),
  };

  useEffect(() => {
    if (nameIsValid && emailIsValid && isValidLength && isOneNumber && isOneLowerCase && isOneUpperCase) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [nameIsValid, emailIsValid, isValidLength, isOneNumber, isOneLowerCase, isOneUpperCase]);

  useEffect(() => {
    if (refs.name.current) {
      nameSetIsValid(refs.name.current.checkValidity());
    }
  }, [nameValue]);

  useEffect(() => {
    if (refs.email.current) {
      setEmailIsValid(refs.email.current.checkValidity());
    }
  }, [emailValue]);

  useEffect(() => {
    setIsValidLength(passwordValue.length >= 8);
    setIsOneNumber(minOneNumberRegex.test(passwordValue));
    setIsOneLowerCase(minOneLowerCaseRegex.test(passwordValue));
    setIsOneUpperCase(minOneUpperCaseRegex.test(passwordValue));
  }, [passwordValue]);

  const registrationPostRequest = async () => {
    const requestBody = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    };
    console.log("Request body:", JSON.stringify(requestBody));

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error ${response.status}: ${errorMessage}`);
      }

      const json = await response.json();
      console.log("Response:", json);

    } catch (error) {
      console.error('An error occurred:', error.message);
      console.log('An error occurred:', error.message);
    }
  };

  return (
    <div className="hero min-h-[60vh]">
      <fieldset className="fieldset bg-base-300 border-neutral/10 rounded-box w-xs border p-4 inset-shadow-sm 
        inset-shadow-base-300">
        <legend className="fieldset-legend">Registration</legend>

        <label htmlFor="nameInput" className="label">Name</label>
        <input ref={refs.name} id="nameInput" type="text" className="input" placeholder="Name" maxLength="30" required
          value={nameValue} onChange={e => setNameValue(e.target.value)}
          onBlur={() => nameSetIsTouched(true)} />
        {nameIsTouched && !nameIsValid && (
          <div className="validator-hint">Enter name</div>
        )}

        <label htmlFor="emailInput" className="label">Email</label>
        <input ref={refs.email} id="emailInput" type="email" className="input" placeholder="Email" required
          value={emailValue} onChange={e => setEmailValue(e.target.value)}
          onBlur={() => setEmailIsTouched(true)} />
        {emailIsTouched && !emailIsValid && (
          <div className="validator-hint">Enter valid email address</div>
        )}

        <label htmlFor="passInput" className="label">Password</label>
        <input id="passInput" type="password" className="input" placeholder="Password" minLength="8" required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          value={passwordValue} onChange={e => setPasswordValue(e.target.value)}
          onBlur={() => passwordSetIsTouched(true)} />
        <div>
          {passwordIsTouched && !isValidLength && (
            <p className="validator-hint">Must be more than 8 characters</p>
          )}
          {passwordIsTouched && !isOneNumber && (
            <p className="validator-hint">At least one number</p>
          )}
          {passwordIsTouched && !isOneLowerCase && (
            <p className="validator-hint">At least one lowercase letter</p>
          )}
          {passwordIsTouched && !isOneUpperCase && (
            <p className="validator-hint">At least one uppercase letter</p>
          )}
        </div>

        <button className="btn btn-neutral mt-4" disabled={isDisabled} onClick={registrationPostRequest}>Register</button>
        <div className="mt-2 w-full flex justify-end">
          <Link href="/login" className="link link-hover">Login to existing account</Link>
        </div>
      </fieldset>
    </div>
  );
}