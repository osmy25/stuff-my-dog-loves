import styles from "./Card.module.css";

export default function Card({ item }) {
  if (!item) {
    return (
      <div className={styles.loading}>
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={item.image}
          alt={item.name}
          className={styles.image}
        />
      </div>

      <div className={styles.textContainer}>
        <p className={styles.label}>
          Dog approved
        </p>

        <p className={styles.title}>
          {item.name}
        </p>
      </div>
    </div>
  );
}