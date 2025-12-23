import { postRequest } from "utils/auth-utils";
import { RECOVERY_PASSWORDD_REQUEST_ENDPOINT, HREF } from "features/shared/constants";

export async function resetPassword(requestBody, token, router) {
    console.log("Password recovery request.");
    try {
        const { response, json } = await postRequest(`${RECOVERY_PASSWORDD_REQUEST_ENDPOINT}/${token}`, requestBody);
        // TODO - być może zmienić post na patch
        if (!response.ok) {
            return { ok: false, error: json.data };
        }
        router.push(HREF.PASSWORD_RECOVERY_SUCCESS_PAGE);
        return { ok: true };
    } catch {
        console.log('An error occurred:', error.message);
        router.push(HREF.ERROR_PAGE);
        return { ok: false, error: "Unexpected error" };
    }
}
