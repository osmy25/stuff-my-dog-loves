import "./globals.css";
import styles from "./layout.module.css";
import Header from "../components/Header/Header";
import Script from "next/script";

export const metadata = {
  title: {
    default: "Stuff My Dog Loves",
    template: "%s | Stuff My Dog Loves",
  },
  description: "A pixel art gallery of everything my dog loves.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Plausible analytics */}
        <Script
          strategy="afterInteractive"
          src="https://plausible.io/js/pa-irYK1VZ9R2L9KOTP3znEz.js"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible = window.plausible || function() {
              (window.plausible.q = window.plausible.q || []).push(arguments)
            };
            plausible.init();
          `}
        </Script>
      </head>

      <body className={styles.body}>
        <Header />

        <main className={styles.main}>
          {children}
        </main>
      </body>
    </html>
  );
}