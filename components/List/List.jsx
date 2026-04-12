"use client";

import { useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./List.module.css";

export default function List() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heartedItems, setHeartedItems] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    setMounted(true);

    async function getDogInterests() {
      const response = await fetch("/api/dog-likes");
      const data = await response.json();
      setItems(data.items);
      setCurrentIndex(0);
    }

    getDogInterests();

    const savedHearts = localStorage.getItem("heartedItems");
    if (savedHearts) {
      try {
        const parsed = JSON.parse(savedHearts)
          .map((id) => Number(id))
          .filter((id) => Number.isInteger(id) && id > 0);

        setHeartedItems(parsed);
      } catch (error) {
        console.error("Failed to parse saved hearts:", error);
        localStorage.removeItem("heartedItems");
      }
    }
  }, []);

  async function handleHeart(id) {
    if (heartedItems.includes(id)) return;

    try {
      const response = await fetch(`/api/dog-likes/${id}/heart`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) return;

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, hearts: data.item.hearts } : item
        )
      );

      const updatedHeartedItems = [...heartedItems, id];
      setHeartedItems(updatedHeartedItems);
      localStorage.setItem("heartedItems", JSON.stringify(updatedHeartedItems));

      const reactions = [
        "good choice",
        "very correct",
        "you are best",
        "I approves",
        "much love",
        "yes",
        "very good yes"
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