"use client";

import { useEffect, useState } from "react";
import HeartCounter from "../HeartCounter/HeartCounter";
import styles from "./Card.module.css";

export default function Card({ item, onHeart, isHearted, reaction }) {
  const [randomThought, setRandomThought] = useState(null);

  useEffect(() => {
    if (!item?.thoughts?.length) {
      setRandomThought(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * item.thoughts.length);
    setRandomThought(item.thoughts[randomIndex]);
  }, [item?.id]);

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
          <div className={styles.thoughtArea}>
            {randomThought && (
              <p className={styles.thought}>~ {randomThought} ~</p>
            )}

            {reaction && (
              <span className={styles.reaction}>{reaction}</span>
            )}
          </div>

          <HeartCounter
            hearts={item.hearts}
            isHearted={isHearted}
            itemId={item.id}
            itemName={item.name}
            onHeart={onHeart}
          />
        </div>
      </div>
    </div>
  );
}