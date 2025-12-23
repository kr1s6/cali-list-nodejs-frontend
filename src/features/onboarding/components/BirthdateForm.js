'use client'
import useBirthdateForm from "../hooks/useBirthdateForm";
import OnboardingForm from "./OnboardingForm";

export default function BirthdateForm() {
    const {
        birthdate,
        setBirthdate,
        submit,
        errorValue
    } = useBirthdateForm();

    return (
        <div className="hero min-h-[70vh]">
            <OnboardingForm
                key="birthdate"
                legendValue="Your birthdate"
                value={birthdate}
                onChange={setBirthdate}
                submit={submit}
                errorValue={errorValue} />;
        </div>
    );
}