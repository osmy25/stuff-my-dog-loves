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
  const [copiedId, setCopiedId] = useState(null);


  async function onShare(id, name) {
    const url = `${window.location.origin}/?id=${id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "My dog loves this",
          text: `This is so him 😂 (${name})`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopiedId(id);

        setTimeout(() => {
          setCopiedId(null);
        }, 1500);
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  }

  async function handleShareThought() {
    if (!item || !randomThought?.text) return;

    const shareText = `Stuff My Dog Loves\n${item.name}\n"${randomThought.text}"`;

    try {
      await navigator.clipboard.writeText(shareText);
    } catch (error) {
      console.error("Failed to copy thought:", error);
    }
  }
  
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

          <button
            type="button"
            className={`${styles.shareButton} ${
              copiedId === item.id ? styles.copied : ""
            }`}
            onClick={() => onShare(item.id, item.name)}
            aria-label={`Share ${item.name}`}
          >
            {copiedId === item.id ? (
              "✓"
            ) : (
              <svg
                className={styles.shareIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18 16a3 3 0 0 0-2.39 1.19l-6.2-3.1a3.13 3.13 0 0 0 0-2.18l6.2-3.1A3 3 0 1 0 15 7a3.1 3.1 0 0 0 .08.7l-6.2 3.1a3 3 0 1 0 0 2.4l6.2 3.1A3 3 0 1 0 18 16Z" />
              </svg>
            )}
          </button>




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