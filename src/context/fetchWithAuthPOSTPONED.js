import { getAccessToken, setAccessToken } from "utils/auth";
import { refreshAccessToken } from "./refreshAccessTokenPOSTPONED";

export async function fetchWithAuth(url, options = {}) {
    let accessToken = getAccessToken();

    const config = {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
    };

    let response = await fetch(url, config);

    if (response.status === 401) {
        console.warn("Access token expired — trying to refresh...");
        const newToken = await refreshAccessToken();

        if (newToken) {
            setAccessToken(newToken);

            config.headers.Authorization = `Bearer ${newToken}`;
            response = await fetch(url, config);
        } else {
            console.error("Session expired — please log in again.");
            sessionStorage.removeItem("accessToken");
            router.push('/error');
        }
    }

    return response;
}