import { REFRESH_TOKEN_ENDPOINT } from "lib/constants";
import { getHeaders } from "utils/auth";

export async function refreshAccessToken() {
    try {
        const response = await fetch(
            REFRESH_TOKEN_ENDPOINT,
            {
                method: "POST",
                credentials: "include",
                headers: getHeaders(),
            });

        const json = await response.json();

        if (!response.ok) {
            console.log('An error occurred:', json.message);
            router.push('/error');
        }

        // Zwracamy nowy access token
        return json.accessToken;
    } catch (error) {
        console.error("Error refreshing token:", error);
        router.push('/error');
        return null;
    }
}
