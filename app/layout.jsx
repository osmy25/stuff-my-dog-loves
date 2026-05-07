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
    default: "Stuff My Dog Loves - Tiny Animated Dog Moments",
    template: "%s | Stuff My Dog Loves",
  },
  description:
    "Tiny animated moments of what my dog Viggo loves — fridge noises, chaos, and very strong opinions. Featuring questionable dog thoughts.",
  openGraph: {
    title: "Stuff My Dog Loves",
    description:
      "Tiny animated moments of what my dog Viggo loves — fridge noises, chaos, and very strong opinions. Featuring questionable dog thoughts.",
    url: "https://stuffmydogloves.com",
    siteName: "Stuff My Dog Loves",
    images: [
      {
        url: "/og-image3.png",
        width: 1200,
        height: 630,
        alt: "Dog smiling with logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stuff My Dog Loves",
    description:
      "Tiny animated moments of what my dog Viggo loves — fridge noises, chaos, and very strong opinions. Featuring questionable dog thoughts.",
    images: ["/og-image3.png"],
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