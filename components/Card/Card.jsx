"use client";

import { useEffect, useState } from "react";
import styles from "./Card.module.css";

export default function Card({ item, onHeart, isHearted }) {
  const [randomThought, setRandomThought] = useState(null);

  useEffect(() => {
    if (!item?.thoughts?.length) {
      setRandomThought(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * item.thoughts.length);
    setRandomThought(item.thoughts[randomIndex]);
  }, [item]);

  if (!item) {
    return <div className={styles.loading}>Loading...</div>;
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
        <p className={styles.label}>Dog approved</p>
        <p className={styles.title}>{item.name}</p>

        <div className={styles.bottomRow}>
          {randomThought && (
            <p className={styles.thought}>{randomThought}</p>
          )}

          <button
            type="button"
            className={`${styles.heartButton} ${isHearted ? styles.hearted : ""}`}
            onClick={() => onHeart(item.id)}
            aria-label={`Give ${item.name} a heart`}
            disabled={isHearted}
          >
            <span className={styles.heartIcon}>
              {isHearted ? "❤️" : "♡"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}