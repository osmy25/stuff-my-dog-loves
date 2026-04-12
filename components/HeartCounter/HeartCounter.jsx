"use client";

import { useEffect, useState } from "react";
import styles from "./HeartCounter.module.css";

export default function HeartCounter({
  hearts,
  isHearted,
  itemId,
  itemName,
  onHeart,
}) {
  const [countPop, setCountPop] = useState(false);

  useEffect(() => {
    if (!isHearted) return;

    setCountPop(true);
    const timeout = setTimeout(() => {
      setCountPop(false);
    }, 280);

    return () => clearTimeout(timeout);
  }, [hearts, isHearted]);

  return (
    <div className={styles.heartWrap}>
      <span
        className={`${styles.heartCount} ${countPop ? styles.countPop : ""}`}
      >
        {hearts}
      </span>

      <button
        type="button"
        className={`${styles.heartButton} ${isHearted ? styles.hearted : ""}`}
        onClick={() => onHeart(itemId)}
        aria-label={`Give ${itemName} a heart`}
        disabled={isHearted}
      >
        <img
          className={styles.heartIcon}
          src={isHearted ? "/images/heart-filled.png" : "/images/heart-empty.png"}
          alt="heart"
        />
      </button>
    </div>
  );
}