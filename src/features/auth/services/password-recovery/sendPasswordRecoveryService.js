import { HREF, RECOVERY_PASSWORDD_REQUEST_ENDPOINT } from "features/shared/constants";
import { handleAuthData, postRequest } from "utils/auth-utils";

export async function sendPasswordRecovery(requestBody, router) {
    console.log("Request for email with password recovery.");
    try {
        const { response, json } = await postRequest(RECOVERY_PASSWORDD_REQUEST_ENDPOINT, requestBody);
        if (!response.ok) {
            return {
                ok: false,
                error: json.data
            };
        }
        handleAuthData(json);
        router.push(HREF.PASSWORD_RECOVERY_SEND_PAGE);
        return { ok: true };
    } catch {
        console.log('An error occurred:', error.message);
        router.push(HREF.ERROR_PAGE);
        return {
            ok: false,
            error: "Unexpected error"
        };
    }
}
