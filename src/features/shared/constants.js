export const REGISTER_ENDPOINT = "http://localhost:8080/api/register";
export const LOGIN_ENDPOINT = "http://localhost:8080/api/login";
export const LOGOUT_ENDPOINT = "http://localhost:8080/api/logout";
export const REFRESH_TOKEN_ENDPOINT = "http://localhost:8080/api/refreshToken";
export const RECOVERY_PASSWORDD_REQUEST_ENDPOINT = "http://localhost:8080/api/password-recovery";
export const SET_USER_BIRTHDATE_ENDPOINT = "http://localhost:8080/api/set-user-birthdate";
export const SET_USER_CALI_START_DATE_ENDPOINT = "http://localhost:8080/api/set-user-cali-start-date";
export const USER_SETTINGS_ENDPOINT = "http://localhost:8080/api/set-user-settings";

export const USER_CONSTANTS = {
    USERNAME_MAX_LENGTH: 30,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 512
};

export const HREF = {
    MAIN_PAGE: "/",
    LOGIN_PAGE: "/login",
    REGISTRATION_PAGE: "/registration",
    PASSWORD_RECOVERY_PAGE: "/login/passwrod-recovery",
    PASSWORD_RECOVERY_SEND_PAGE: "/login/passwrod-recovery/check-email",
    PASSWORD_RECOVERY_SUCCESS_PAGE: "/login/passwrod-recovery/password-changed",
    SET_USER_BIRTHDATE: "/set-data/birthdate",
    SET_USER_CALI_START_DAY: "/set-data/cali-start-date",
    PROFILE_PAGE: "/profile",
    USER_SETTINGS_PAGE: "/profile/user-settings",
    ERROR_PAGE: "/error",
}

export const STATUS = {
    CREATED: 201,
    OK: 200,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT: 409,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
}
