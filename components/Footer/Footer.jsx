"use client";

import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/map") {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div>
        <a
          href="https://bsky.app/profile/stuffmydogloves.bsky.social"
          target="_blank"
          rel="noopener noreferrer"
        >
         ~ bluesky ~
        </a>
      </div>

      <div>
        hello@stuffmydogloves.se · © 2026 Viggo & human
      </div>
    </footer>
  );
}