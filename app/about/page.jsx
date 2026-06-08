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

      <p className={styles.text}>
        It started as a few tiny animations in celebration
        <br />
        of his 6th birthday.
      </p>

      <p className={styles.text}>
        Over time it became a small collection of moments and memories.
      </p>
    </div>
  );
}