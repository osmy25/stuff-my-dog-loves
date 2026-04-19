import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <img
            src="/images/smallheart.png"
            alt=""
            className={`${styles.logoHeart} pixelated`}
            aria-hidden="true"
          />

          <span className={styles.logoText}>
            Stuff My Dog{" "}
            <span className={styles.logoAccent}>Loves</span>
          </span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}