import RedirectIfAuth from "components/redirect-if-auth";

export default function LoginLayout({ children }) {
  return (
    <RedirectIfAuth>
      {children}
    </RedirectIfAuth>
  );
}
