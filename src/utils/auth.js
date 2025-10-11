export const getHeaders = () => {
    const token = getAccessToken();
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return new Headers(headers);
}

export async function authRequest(endpoint, requestBody) {
    console.log("endpoint:" + endpoint);
    
    const response = await fetch(endpoint, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(requestBody),
        credentials: "include"
    });

    const json = await response.json();
    console.log("Response status:", response.status);
    console.log("Json Response:", json);

    return { response, json };
}

export function handleAuthData(json) {
    localStorage.setItem("user", JSON.stringify(json.data));
    setAccessToken(json.accessToken);
}

export function getAccessToken() {
    return sessionStorage.getItem("accessToken");
}

export function setAccessToken(token) {
    sessionStorage.setItem("accessToken", token)
}

export function removeAccessToken() {
    sessionStorage.removeItem("accessToken");
}