// app/map/page.jsx
import styles from "./page.module.css";
import MapClient from "./MapClient";

export const metadata = {
  title: "Map",
};

export default function MapPage() {
  return (
    <main className={styles.page}>
      <MapClient />

      <p className={styles.note}>
        wow you found my secret map!
        <br />
        tap my favorite places 🐾
      </p>

      <div className={styles.mobileFooter}>
        <div>
          <a
            href="https://www.instagram.com/stuffmydogloves.ig"
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram
          </a>{" "}
          ·{" "}
          <a
            href="https://bsky.app/profile/stuffmydogloves.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
          >
            bluesky
          </a>
        </div>

        <div>hello@stuffmydogloves.se</div>

        <div>© 2026 Viggo & human</div>
      </div>
    </main>
  );
}