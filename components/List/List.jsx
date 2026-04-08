"use client";

import { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./List.module.css";

export default function List() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getDogInterests() {
      const response = await fetch("/api/dog-likes");
      const data = await response.json();
      setItems(data.items);
      setCurrentIndex(0);
    }

    getDogInterests();
  }, []);

  function handleNext() {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }

  function handlePrev() {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }

  const currentItem = items[currentIndex];

  return (
    <div className={styles.container}>
      <Card item={currentItem} />

      <div className={styles.buttonGroup}>
        <button
          onClick={handlePrev}
          disabled={items.length === 0}
          className={`${styles.button} ${styles.prev}`}
        >
          ← Prev
        </button>

        <button
          onClick={handleNext}
          disabled={items.length === 0}
          className={`${styles.button} ${styles.next}`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}