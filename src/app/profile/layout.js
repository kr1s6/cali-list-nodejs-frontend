import RedirectIfUnauth from "components/redirect-if-not-auth";

export default function ProfileLayout({ children }) {
  return (
    <RedirectIfUnauth>
      {children}
    </RedirectIfUnauth>
  );
}
