import { LOGIN_ENDPOINT, HREF } from "features/shared/constants";
import { postRequest, handleUserData, redirectToNextStepAfterLogin } from "utils/auth-utils";

export async function login(requestBody, router, dispatch) {
  console.log("Login request.");
  try {
    const { response, json } = await postRequest(LOGIN_ENDPOINT, requestBody);
    if (!response.ok) {
      return {
        ok: false,
        error: json.data
      };
    }
    handleUserData(json);
    dispatch({ type: "login" });
    redirectToNextStepAfterLogin(json.data, router);
    return {
      ok: true
    };

  } catch (error) {
    console.log('An error occurred:', error.message);
    router.push(HREF.ERROR_PAGE);
    return {
      ok: false,
      error: "Unexpected error"
    };
  }
}
