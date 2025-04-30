import { Suspense } from "react";
import ThemeChangeBtn from "./theme-change";

export default function Navbar() {
    return (
        <div className="navbar shadow-md justify-around">
            <div className="navbar p-0 min-h-0 max-w-5xl mx-10">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">CaliList</a>
                    <ThemeChangeBtn></ThemeChangeBtn>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-ghost">Login</a>
                    <a className="btn btn-primary">Sign Up</a>
                </div>
            </div>
        </div>
    );
}