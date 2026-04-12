"use client";

import { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./List.module.css";

const HEART_STORAGE_KEY = "heartedItems";

export default function List() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heartedItems, setHeartedItems] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    setMounted(true);

    async function getDogInterests() {
      try {
        const response = await fetch("/api/dog-likes");
        const data = await response.json();
        setItems(data.items ?? []);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Failed to fetch dog likes:", error);
      }
    }

    getDogInterests();

    try {
      const savedHearts = localStorage.getItem(HEART_STORAGE_KEY);

      if (!savedHearts) return;

      const parsed = JSON.parse(savedHearts)
        .map((id) => Number(id))
        .filter((id) => Number.isInteger(id) && id > 0);

      setHeartedItems(parsed);
    } catch (error) {
      console.error("Failed to parse saved hearts:", error);
      localStorage.removeItem(HEART_STORAGE_KEY);
    }
  }, []);

  async function handleHeart(id) {
    if (heartedItems.includes(id)) return;

    try {
      const response = await fetch(`/api/dog-likes/${id}/heart`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to add heart");
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, hearts: data.item.hearts } : item
        )
      );

      const updatedHeartedItems = [...heartedItems, id];
      setHeartedItems(updatedHeartedItems);
      localStorage.setItem(
        HEART_STORAGE_KEY,
        JSON.stringify(updatedHeartedItems)
      );

      const reactions = [
        "good choice",
        "very correct",
        "you are the best",
        "i approve",
        "much love",
        "yes",
        "important",
        "this is good",
        "i like this",
        "very nice yes",
      ];

      const random =
        reactions[Math.floor(Math.random() * reactions.length)];

      setReaction(null);

      setTimeout(() => {
        setReaction(random);

        setTimeout(() => {
          setReaction(null);
        }, 1450);
      }, 10);
    } catch (error) {
      console.error("Failed to add heart:", error);
    }
  }

  function handleNext() {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }

  function handlePrev() {
    if (items.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }

  const currentItem = items[currentIndex];
  const isHearted =
    mounted && currentItem ? heartedItems.includes(currentItem.id) : false;

  return (
    <div className={styles.container}>
      <Card
        item={currentItem}
        onHeart={handleHeart}
        isHearted={isHearted}
        reaction={reaction}
      />

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