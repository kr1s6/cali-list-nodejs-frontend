import Link from "next/link";
export default function Navbar() {
    return (
        <nav className="navbar bg-base-100 shadow-sm px-10">

            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">Calisthenics Hub</Link>
            </div>
            
            <div className="flex-none">
                <Link href="/login" className="btn btn-ghost">Login</Link>
                <Link href="/registration" className="btn btn-primary">Sign Up</Link>
            </div>

        </nav>
    );
}
