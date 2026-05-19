import "./globals.css";
import styles from "./layout.module.css";
import Script from "next/script";
import Header from "../components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://stuffmydogloves.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Stuff My Dog Loves — Tiny Animated Pixel-Art Moments",
    template: "%s | Stuff My Dog Loves",
  },
  description:
    "Tiny animated pixel-art moments about my dog Viggo and the stuff he loves.",
  openGraph: {
    title: "Stuff My Dog Loves",
    description:
      "Tiny animated pixel-art moments about my dog Viggo and the stuff he loves.",
    url: "https://stuffmydogloves.com",
    siteName: "Stuff My Dog Loves",
    images: [
      {
        url: "/og-image4.png",
        width: 1200,
        height: 630,
        alt: "Pixel dog smiling",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stuff My Dog Loves",
    description:
      "Tiny animated pixel-art moments about my dog Viggo and the stuff he loves.",
    images: ["/og-image4.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={quicksand.className}>
      <body className={styles.page}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />

        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="55e4118b-ba9b-44ec-8320-3d199beaba21"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}