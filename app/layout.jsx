import "./globals.css";
import styles from "./layout.module.css";
import Header from "../components/Header/Header";

export const metadata = {
  title: "Stuff My Dog Loves",
  description: "A pixel art gallery of everything my dog loves.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Header />

        <main className={styles.main}>
          {children}
        </main>
      </body>
    </html>
  );
}