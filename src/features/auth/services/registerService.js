import { HREF, REGISTER_ENDPOINT } from "features/shared/constants";
import { handleUserData, postRequest, redirectToNextStepAfterLogin } from "utils/auth-utils";

export async function register(requestBody, router, dispatch) {
    console.log("Register request.");
    try {
        const { response, json } = await postRequest(REGISTER_ENDPOINT, requestBody);
        if (!response.ok) {
            return {
                ok: false,
                error: json.data
            };
        }
        handleUserData(json);
        dispatch({ type: "login" });
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