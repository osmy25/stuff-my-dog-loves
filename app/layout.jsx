import "./globals.css";
import styles from "./layout.module.css";
import Script from "next/script";
import Header from "../components/Header/Header";

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
      <body className={styles.page}>
        <Header />
        <main className={styles.main}>{children}</main>
      </body>

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
    </html>
  );
}