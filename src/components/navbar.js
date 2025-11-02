'use client'
import { HREF } from "lib/constants";
import { logout } from "utils/auth-utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "context/AuthProvider";

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

    const handleLogout = async () => {
        logout(router, dispatch);
    };

    return (
        <div className="dropdown dropdown-center">
            <div tabIndex={0} role="button" className="btn btn-ghost group">
                <div className="w-10">
                    <img alt="User avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        className="rounded-sm" />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-3 text-gray-400 transition-colors duration-200 group-hover:text-white"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>

            <ul tabIndex={0} className="menu menu-md dropdown-content bg-base-200 rounded-box mt-3 w-40 p-2 shadow">
                <li>
                    <Link href="/profile">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <p>Profile</p>
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
