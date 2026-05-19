import styles from "./page.module.css";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About</h1>

      <p className={styles.text}>
        This is a collection of stuff my dog loves.
      </p>

      <p className={styles.name}>
        His name is Viggo.
      </p>

    </div>
  );
}