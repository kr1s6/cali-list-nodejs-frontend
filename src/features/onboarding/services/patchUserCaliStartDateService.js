import { HREF, SET_USER_CALI_START_DATE_ENDPOINT } from "features/shared/constants";
import { handleAuthData, patchRequest, redirectToNextStepAfterLogin } from "utils/auth-utils";

export async function patchUserCaliStartDate(requestBody, router) {
    console.log("Set user's cali start date.");
    try {
        const { response, json } = await patchRequest(SET_USER_CALI_START_DATE_ENDPOINT, requestBody);
        if (!response.ok) {
            return {
                ok: false,
                error: json.data
            };
        }
        handleAuthData(json);
        redirectToNextStepAfterLogin(json.data, router);
        return { ok: true };

    } catch (error) {
        console.log('An error occurred:', error.message);
        router.push(HREF.ERROR_PAGE);
        return {
            ok: false,
            error: "Unexpected error"
        };
    }

}