"use client";

import { useEffect, useState } from "react";
import HeartCounter from "../HeartCounter/HeartCounter";
import styles from "./Card.module.css";

function pickThought(thoughts, exclude = null) {
  if (!thoughts) return null;

  const rand = Math.random();
  let pool = thoughts.normal || [];
  let type = "normal";

  if (rand < 0.02 && thoughts.legendary?.length) {
    pool = thoughts.legendary;
    type = "legendary";
  } else if (rand < 0.17 && thoughts.rare?.length) {
    pool = thoughts.rare;
    type = "rare";
  }

  if (!pool.length) return null;
  if (pool.length === 1) return { text: pool[0], type };

  let next = pool[Math.floor(Math.random() * pool.length)];
  let tries = 0;

  while (next === exclude && tries < 10) {
    next = pool[Math.floor(Math.random() * pool.length)];
    tries += 1;
  }

  return { text: next, type };
}

export default function Card({ item, onHeart, isHearted, reaction }) {
  const [randomThought, setRandomThought] = useState(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setRandomThought(pickThought(item?.thoughts));
  }, [item?.id, item?.thoughts]);

  function handleShuffleThought() {
    const thoughts = item?.thoughts;
    if (!thoughts) return;

    const totalThoughts =
      (thoughts.normal?.length || 0) +
      (thoughts.rare?.length || 0) +
      (thoughts.legendary?.length || 0);

    if (totalThoughts <= 1) return;

    setIsFading(true);

    setTimeout(() => {
      setRandomThought(pickThought(thoughts, randomThought?.text));
      setIsFading(false);
    }, 180);
  }

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
              <button
                type="button"
                className={`${styles.thoughtButton} ${isFading ? styles.fade : ""}`}
                onClick={handleShuffleThought}
                aria-label={`Show another thought about ${item.name}`}
              >
                <span
                  className={`
                    ${styles.thought}
                    ${styles.visible}
                    ${styles[randomThought.type]}
                  `}
                >
                  ~ {randomThought.text} ~
                </span>
              </button>
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