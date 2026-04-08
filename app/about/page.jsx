import styles from "./about.module.css";

export const metadata = {
  title: "About",
};




export default function AboutPage() {

  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        About
      </h1>

      <p className={styles.text}>
        This page is about the things my dog loves.
      </p>
    </div>
  );
}