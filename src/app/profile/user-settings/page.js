'use client'

import { HREF, STATUS, USER_SETTINGS_ENDPOINT } from "features/shared/constants";
import { useEffect, useState } from "react";

export default function UserSettings() {

    const postUserSettings = async () => {
        console.log("Change settings request.");
        const requestBody = {
            pfp: form.pfp
        };

        try {
            const { response, json } = await postRequest(USER_SETTINGS_ENDPOINT, requestBody);
            if (response.ok) {
            }
            else if (response.status === STATUS.CONFLICT) {
                setBackendError(json.data);
            } else {
                router.push(HREF.ERROR_PAGE);
            }
        } catch (error) {
            console.log('An error occurred:', error.message);
            router.push(HREF.ERROR_PAGE);
        }
    };

    return (
        <>
        </>
    );
}