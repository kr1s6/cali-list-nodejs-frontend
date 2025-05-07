import Link from "next/link";

export default function Login() {
  return (
    <div className="hero min-h-[60vh]">
      <fieldset className="fieldset bg-base-200 border-neutral/10 rounded-box 
      w-xs border p-4 inset-shadow-sm inset-shadow-base-300">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="btn btn-neutral mt-4">Login</button>

        <div className="mt-2 w-full flex justify-end">
          <Link href="/registration" className="link link-hover">Create new account</Link>
        </div>
      </fieldset>
    </div>
  );
}