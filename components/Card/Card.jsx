import { useMemo } from "react";
import styles from "./Card.module.css";

export default function Card({ item }) {
  const randomThought = useMemo(() => {
    if (!item?.thoughts?.length) return null;
    return item.thoughts[Math.floor(Math.random() * item.thoughts.length)];
  }, [item]);

  if (!item) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const isWaggingDog = item.name === "Dog";

  return (
    <div className={styles.card}>
      <div
        className={
          isWaggingDog
            ? `${styles.imageContainer} ${styles.imageContainerWag}`
            : styles.imageContainer
        }
      >
        <img
          src={item.image}
          alt={item.name}
          className={styles.image}
        />
      </div>

      <div className={styles.textContainer}>
        <p className={styles.label}>Dog approved</p>
        <p className={styles.title}>{item.name}</p>
        {randomThought && (
          <p className={styles.thought}>"{randomThought}"</p>
        )}
      </div>
    </div>
  );
}