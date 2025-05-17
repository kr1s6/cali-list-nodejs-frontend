import Link from "next/link";

export default function Navbar() {
    return (
        <div className="navbar shadow-md justify-around">
            <div className="navbar p-0 min-h-0 max-w-5xl mx-10">
                <div className="navbar-start">
                    <Link href="/" className="btn btn-ghost text-xl">CaliList</Link>
                </div>
                <div className="navbar-end">
                    <Link href="/login" className="btn btn-ghost">Login</Link>
                    <Link href="/registration" className="btn btn-primary">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}