import RedirectIfUnauth from "components/login-page-redirection";

export default function ProfileLayout({ children }) {
  return (
    <RedirectIfUnauth>
      {children}
    </RedirectIfUnauth>
  );
}
