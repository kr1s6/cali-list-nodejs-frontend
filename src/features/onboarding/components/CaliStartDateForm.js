'use client'
import useCaliStartDateForm from "../hooks/useCaliStartDateForm";
import OnboardingForm from "./OnboardingForm";

export default function CaliStartDateForm() {
    const {
        caliStartDate,
        setCaliStartDate,
        submit,
        errorValue
    } = useCaliStartDateForm();

    return (
        <div className="hero min-h-[70vh]">
            <OnboardingForm
                key="caliStartDate"
                legendValue="When have you started training calisthenics?"
                value={caliStartDate}
                onChange={setCaliStartDate}
                submit={submit}
                errorValue={errorValue} />;
        </div>
    );
}