'use client'
import { HREF, LOGOUT_ENDPOINT, REFRESH_TOKEN_ENDPOINT } from "features/shared/constants";

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

export async function postRequest(endpoint, requestBody = null) {
    console.log("endpoint:" + endpoint);
    const response = await fetch(endpoint, {
        method: "POST",
        headers: getHeaders(),
        body: requestBody ? JSON.stringify(requestBody) : null,
        credentials: "include",
    });

    const json = await response.json();
    console.log("Response status:", response.status);
    console.log("Json Response:", json);

    return { response, json };
}

export async function patchRequest(endpoint, requestBody = null) {
    console.log("endpoint:" + endpoint);
    const response = await fetch(endpoint, {
        method: "PATCH",
        headers: getHeaders(),
        body: requestBody ? JSON.stringify(requestBody) : null,
        credentials: "include",
    });

    const json = await response.json();
    console.log("Response status:", response.status);
    console.log("Json Response:", json);

    return { response, json };
}

export async function refreshTokenRequest(accessToken) {
    console.log("Refresh token request.");
    const requestBody = {
        token: accessToken,
    };
    const { response, json } = await postRequest(REFRESH_TOKEN_ENDPOINT, requestBody);
    if (response.ok) {
        handleUserData(json);
        console.log("RefreshToken - Response OK!");
        return (true);
    } else {
        console.log("RefreshToken - Response Failed!");
        return (false);
    }
}

export async function logout(router, dispatch) {
    console.log("Logout request.");
    try {
        const { response } = await postRequest(LOGOUT_ENDPOINT);
        removeAccessToken();
        removeUserData();

        if (response.ok) {
            console.log("PUSH HOME PAGE");
            router.push(HREF.MAIN_PAGE);
        } else {
            console.error("Logout request failed:", response.status);
            router.push(HREF.ERROR_PAGE);
        }
    } catch (error) {
        console.log('An error occurred:', error.message);
        router.push(HREF.ERROR_PAGE);
    }

    dispatch({ type: "logout" });
};

export function handleUserData(json){
    handleAuthData(json);
    setAccessToken(json.accessToken);
}

export function handleAuthData(json) {
    localStorage.setItem("user", JSON.stringify(json.data));
    setAccessToken(json.accessToken);
}

export function removeUserData() {
    console.log("remove user");
    localStorage.removeItem("user");
}

export function getAccessToken() {
    if (typeof window !== "undefined") {
        return sessionStorage.getItem("accessToken");
    }
    return null;
}

export function getValueFromLocalStorage(key) {
    if (typeof window !== "undefined") {
        return localStorage.getItem(key);
    }
    return null;
}

export function setAccessToken(token) {
    console.log("Set access token");
    sessionStorage.setItem("accessToken", token)
}

export function removeAccessToken() {
    console.log("remove access token");
    sessionStorage.removeItem("accessToken");
}

export function redirectToNextStepAfterLogin(user, router) {
    console.log("redirectToNextStepAfterLogin function");
    if (!user.birthdate) {
        console.log("go to SET_USER_BIRTHDATE");
        return router.replace(HREF.SET_USER_BIRTHDATE);
    }
    if (!user.trainingDuration) {
        console.log("go to SET_USER_CALI_START_DAY");
        return router.replace(HREF.SET_USER_CALI_START_DAY);
    }

    console.log("go to PROFILE_PAGE");
    return router.replace(HREF.PROFILE_PAGE);
}

