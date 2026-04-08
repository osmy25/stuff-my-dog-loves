import "./globals.css";
import styles from "./layout.module.css";
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
      <head>
        <script
          async
          src="https://plausible.io/js/pa-irYK1VZ9R2L9KOTP3znEz.js"
        ></script>
      </head>
      <body className={styles.body}>
        <Header />
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}