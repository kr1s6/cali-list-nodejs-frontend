'use client'
import moment from "moment";

export default function OnboardingForm({
    key,
    legendValue,
    value,
    onChange,
    submit,
    errorValue
}) {

    return (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">{legendValue}</legend>
            <input id={key + "Input"} type="date" className="input"
                name={key}
                max={moment().format("YYYY-MM-DD")}
                value={value ?? null}
                onChange={(e) => onChange(e.target.value)}
            />
            <button className="btn btn-neutral mt-4" onClick={submit} disabled={!value}>Confirm</button>
            {errorValue !== null && (<p className="validator-hint">{errorValue}</p>)}
        </fieldset>
    );
}