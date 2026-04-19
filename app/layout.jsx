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
    default: "Stuff My Dog Loves",
    template: "%s | Stuff My Dog Loves",
  },
  description: "Tiny animated moments of what my dog loves.",
  openGraph: {
    title: "Stuff My Dog Loves",
    description: "Tiny animated moments of what my dog loves.",
    url: "https://stuffmydogloves.com",
    siteName: "Stuff My Dog Loves",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pixel art dog peeking over a table",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stuff My Dog Loves",
    description: "Tiny animated moments of what my dog loves.",
    images: ["/og-image.png"],
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
          src="https://plausible.io/js/pa-irYK1VZ9R2L9KOTP3znEz.js"
          strategy="afterInteractive"
        />

        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible = window.plausible || function () {
              (window.plausible.q = window.plausible.q || []).push(arguments);
            };
            window.plausible.init = window.plausible.init || function (i) {
              window.plausible.o = i || {};
            };
            window.plausible.init();
          `}
        </Script>
      </body>
    </html>
  );
}