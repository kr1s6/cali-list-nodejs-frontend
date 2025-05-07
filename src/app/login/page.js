export default function Login() {
  return (
    <div className="hero min-h-[60vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <div><a className="link link-hover">Forgot password?</a></div>
        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </div>
  );
}