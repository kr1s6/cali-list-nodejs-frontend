export const REGISTER_ENDPOINT = "http://localhost:8080/register";
export const LOGIN_ENDPOINT = "http://localhost:8080/login";
export const LOGOUT_ENDPOINT = "http://localhost:8080/logout";
export const REFRESH_TOKEN_ENDPOINT = "http://localhost:8080/refreshToken";

export const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

export const USER_CONSTANTS = {
    USERNAME_MAX_LENGTH: 30,
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 512
};

export const HREF = {
    LOGIN_PAGE: "/login",
    REGISTRATION_PAGE: "/registration",
    PASSWORD_RECOVERY_PAGE: "/login/passwrod-recovery",
}

export const STATUS = {
    CREATED: 201,
    OK: 200,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT: 409,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
}
