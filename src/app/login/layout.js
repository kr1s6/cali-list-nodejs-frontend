import RedirectIfAuth from "components/main-page-redirection";

export default function LoginLayout({ children }) {
  return (
    <RedirectIfAuth>
      {children}
    </RedirectIfAuth>
  );
}
