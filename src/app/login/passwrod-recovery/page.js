export default function Login() {
  return (
    <div className="hero min-h-[60vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Password recovery</legend>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <button className="btn btn-neutral mt-4">Send email</button>
      </fieldset>
    </div>
  );
}