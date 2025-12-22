'use client'
import { HREF, SET_USER_CALI_START_DATE_ENDPOINT } from "features/shared/constants";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleAuthData, patchRequest, redirectToNextStepAfterLogin } from "utils/auth-utils";
import { getLocalStorageItem } from "utils/local-storage-utils";

export default function SetUserCaliStartDate() {
    const router = useRouter();
    const [backendError, setBackendError] = useState(null);
    const [caliStartDate, setCaliStartDate] = useState("");
    const [trainingDuration, setTrainingDuration] = useState(getLocalStorageItem("user").trainingDuration || null);

    if (trainingDuration != null) {
        console.log("Pus from set training duration");
        router.push(HREF.PROFILE_PAGE);
    }

    const patchUserCaliStartDate = async () => {
        console.log("Set user's cali start date.");
        const requestBody = {
            caliStartDate: caliStartDate
        };

        try {
            const { response, json } = await patchRequest(SET_USER_CALI_START_DATE_ENDPOINT, requestBody);
            if (response.ok) {
                setBackendError(null);
                handleAuthData(json);
                redirectToNextStepAfterLogin(json.data, router);
            } else {
                setBackendError(json.data);
            }
        } catch (error) {
            console.log('An error occurred:', error.message);
            router.push(HREF.ERROR_PAGE);
        }
    };


    return (
        <div className="hero min-h-[70vh]">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

                <legend className="fieldset-legend">When have you started training calisthenics?</legend>
                <input id="caliStartInput" type="date" className="input"
                    name="caliStartDate"
                    max={moment().format("YYYY-MM-DD")}
                    value={caliStartDate}
                    onChange={(e) => setCaliStartDate(e.target.value)}
                />
                <button className="btn btn-neutral mt-4" onClick={patchUserCaliStartDate}>Confirm</button>

                {backendError !== null && (<p className="validator-hint">{backendError}</p>)}
            </fieldset>
        </div>
    );


}