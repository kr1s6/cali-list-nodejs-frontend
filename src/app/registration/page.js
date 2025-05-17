'use client'
import EmailInput from "components/inputs/emailInput";
import NameInput from "components/inputs/nameInput";
import PasswordInput from "components/inputs/passwordInput";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Registration() {
  const [isDisabled, setIsDisabled] = useState(true);

  // useEffect(() => {
  //   let nameInput = document.getElementById("nameInput");
  //   let emailInput = document.getElementById("emailInput");
  //   let passInput = document.getElementById("passInput");

  //   if (
  //     nameInput.checkValidity() &&
  //     emailInput.checkValidity() &&
  //     passInput.checkValidity()
  //   ) {
  //     setIsDisabled(false);
  //   }
  //   else {
  //     setIsDisabled(true);
  //   }
  // }, [nameValue, emailValue, passwordValue]);

  return (
    <div className="hero min-h-[60vh]">
      <fieldset className="fieldset bg-base-300 border-neutral/10 rounded-box w-xs border p-4 inset-shadow-sm 
        inset-shadow-base-300">
        <legend className="fieldset-legend">Registration</legend>

        <NameInput/>
        <EmailInput/>
        <PasswordInput/>

        <button className="btn btn-neutral mt-4" disabled={isDisabled}>Login</button>

        <div className="mt-2 w-full flex justify-end">
          <Link href="/login" className="link link-hover">Login to existing account</Link>
        </div>
      </fieldset>
    </div>
  );
}