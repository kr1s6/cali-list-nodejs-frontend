import Footer from "components/footer";
import Navbar from "components/navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "../lib/globals.css";
import { AuthProvider } from "context/AuthProvider";
import { ThemeProvider } from "context/ThemeProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Calisthenics Hub",
  description: "Place for people interested in calisthenics training.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main>
              {children}
            </main>
            <Footer></Footer>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
