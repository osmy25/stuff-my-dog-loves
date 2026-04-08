import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Stuff My Dog <span>Loves</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}