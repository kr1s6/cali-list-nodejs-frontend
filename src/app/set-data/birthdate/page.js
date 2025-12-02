'use client'
import { HREF, SET_USER_BIRTHDATE_ENDPOINT } from "lib/constants";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleAuthData, patchRequest, redirectToNextStepAfterLogin } from "utils/auth-utils";

export default function SetUserBirthdate() {
    const router = useRouter();
    const [birthdate, setBirthdate] = useState("");
    const [backendError, setBackendError] = useState(null);

    const patchUserBirthdate = async () => {
        console.log("Set user's birthdate.");
        const requestBody = {
            birthdate: birthdate
        };

        try {
            const { response, json } = await patchRequest(SET_USER_BIRTHDATE_ENDPOINT, requestBody);
            if (response.ok) {
                setBackendError(null);
                handleAuthData(json);
                redirectToNextStepAfterLogin(json.data, router);
            } else {
                setBackendError(json.data);
            }
        } catch(error) {
            console.log('An error occurred:', error.message);
            router.push(HREF.ERROR_PAGE);
        }
    };


    return (
        <div className="hero min-h-[70vh]">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

                <legend className="fieldset-legend">Your birthdate</legend>
                <input id="birthdateInput" type="date" className="input"
                    name="birthdate"
                    max={moment().format("YYYY-MM-DD")}
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                />
                <button className="btn btn-neutral mt-4" onClick={patchUserBirthdate}>Confirm</button>

                {backendError !== null && (<p className="validator-hint">{backendError}</p>)}
            </fieldset>
        </div>
    );

}