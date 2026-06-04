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
    </main>
  );
}