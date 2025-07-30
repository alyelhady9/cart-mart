import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import ClientProvider from "./store/Provider";
import store from "./store/Store";
import Footer from "./components/Footer";
import UpToTopButton from "./components/UpToTop";
import Cart from "./components/Cart";
import AuthModal from "./components/AuthModal";
import CheckoutModal from "./components/CheckoutModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cart Mart",
  description: "Official Cart Mart ecommerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative `}
      >
        <ClientProvider>

        <Header />
        {children}
        <Cart />
        <AuthModal />
        <CheckoutModal />
        </ClientProvider>

        <UpToTopButton />
        <Footer />
      </body>
    </html>
  );
}
