'use client'
import { getValueFromLocalStorage, logout } from "utils/auth-utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "features/shared/context/AuthProvider";
import { HREF } from "features/shared/constants";

export default function Navbar() {
    const { state } = useContext(AuthContext);

    return (
        <nav className="navbar shadow-sm px-60">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">Calisthenics Hub</Link>
            </div>

            <div className="flex-none">
                {state.isAuthenticated ? <AuthMenu /> : <UnauthMenu />}
            </div>
        </nav>
    );
}

export function LoadingNavabar() {
    return (
        <nav className="navbar shadow-sm px-60">
            <div className="flex-1">
                <p className="btn btn-ghost text-xl">Calisthenics Hub</p>
            </div>
        </nav>
    );
}

/* -------------------- MENU FOR NOT AUTHENTICATED -------------------- */
function UnauthMenu() {
    return (
        <>
            <Link href={HREF.LOGIN_PAGE} className="btn btn-ghost">Login</Link>
            <Link href={HREF.REGISTRATION_PAGE} className="btn btn-primary">Sign Up</Link>
        </>
    );
}

/* -------------------- MENU FOR AUTHENTICATED -------------------- */

function AuthMenu() {
    const router = useRouter();
    const { dispatch } = useContext(AuthContext);
    const [userAvatarImg, setUserAvatarImg] = useState("https://img.daisyui.com/images/profile/demo/spiderperson@192.webp");

    const handleLogout = async () => {
        logout(router, dispatch);
    };

    useEffect(() => {
        const userAvatar = getValueFromLocalStorage("userAvatarImg");
        if (userAvatar != null) {
            setUserAvatarImg(userAvatar);
        }
    }, []);

    return (
        <div className="dropdown dropdown-center dropdown-hover">
            <div tabIndex={0} role="button" className="btn btn-ghost group">
                <div className="w-10">
                    <img alt="User avatar" src={userAvatarImg}
                        className="rounded-sm" />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-3 text-gray-400 transition-colors duration-200 group-hover:text-white"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>

            <ul tabIndex={0} className="menu menu-md dropdown-content bg-base-200 rounded-box mt-0 w-40 p-2 shadow">
                <li>
                    <Link href={HREF.LOGIN_PAGE}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <p>Profile</p>
                    </Link>
                </li>
                <li>
                    <Link href={HREF.USER_SETTINGS_PAGE}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 640 640" fill="currentColor">
                            <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
                        </svg>
                        <p>Settings</p>
                    </Link>
                </li>
                <li>
                    <button id="logoutBtn" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                        <p>Logout</p>
                    </button>
                </li>
            </ul>
        </div>
    );
}
