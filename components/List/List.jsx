"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Card from "../Card/Card";
import styles from "./List.module.css";

const HEART_STORAGE_KEY = "heartedItems";

export default function List() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heartedItems, setHeartedItems] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [reaction, setReaction] = useState(null);
  const [heartsLoaded, setHeartsLoaded] = useState(false);
  const [hasTrackedInitialView, setHasTrackedInitialView] = useState(false);

  const pathname = usePathname();
  const idFromUrl = pathname.startsWith("/card/")
    ? pathname.split("/card/")[1]
    : null;

  function trackCardView(item, source) {
    if (
      typeof window !== "undefined" &&
      typeof window.plausible === "function" &&
      item
    ) {
      window.plausible("Card View", {
        props: {
          id: String(item.id),
          name: item.name,
          source,
        },
      });
    }
  }

  useEffect(() => {
    setMounted(true);

    async function getDogInterests() {
      try {
        const response = await fetch("/api/dog-likes");
        const data = await response.json();
        setItems(data.items ?? []);
      } catch (error) {
        console.error("Failed to fetch dog likes:", error);
      }
    }

    getDogInterests();

    try {
      const savedHearts = localStorage.getItem(HEART_STORAGE_KEY);

      if (savedHearts) {
        const parsed = JSON.parse(savedHearts)
          .map((id) => Number(id))
          .filter((id) => Number.isInteger(id) && id > 0);

        setHeartedItems(parsed);
      }
    } catch (error) {
      console.error("Failed to parse saved hearts:", error);
      localStorage.removeItem(HEART_STORAGE_KEY);
    } finally {
      setHeartsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    if (!idFromUrl) {
      setCurrentIndex(0);
      return;
    }

    const wantedId = Number(idFromUrl);

    if (!Number.isInteger(wantedId)) {
      setCurrentIndex(0);
      return;
    }

    const foundIndex = items.findIndex((item) => item.id === wantedId);
    setCurrentIndex(foundIndex !== -1 ? foundIndex : 0);
  }, [items, idFromUrl]);

  const currentItem = items[currentIndex];

  useEffect(() => {
    if (!mounted || !currentItem || hasTrackedInitialView) return;

    const source = idFromUrl ? "url" : "initial";
    trackCardView(currentItem, source);
    setHasTrackedInitialView(true);
  }, [mounted, currentItem, hasTrackedInitialView, idFromUrl]);

  function updateUrl(id) {
    window.history.replaceState(null, "", `/card/${id}`);
  }

  async function handleHeart(id) {
    if (!heartsLoaded) return;
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

      if (
        typeof window !== "undefined" &&
        typeof window.plausible === "function"
      ) {
        window.plausible("Like", {
          props: {
            id: String(id),
            name: currentItem?.name ?? "unknown",
          },
        });
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

    const nextIndex = (currentIndex + 1) % items.length;
    const nextItem = items[nextIndex];

    setCurrentIndex(nextIndex);
    updateUrl(nextItem.id);
    trackCardView(nextItem, "next");
  }

  function handlePrev() {
    if (items.length === 0) return;

    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    const prevItem = items[prevIndex];

    setCurrentIndex(prevIndex);
    updateUrl(prevItem.id);
    trackCardView(prevItem, "prev");
  }

  const isHearted =
    mounted && heartsLoaded && currentItem
      ? heartedItems.includes(currentItem.id)
      : false;

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <div className={styles.introRow}>
          <img
            src="/images/viggo-head.png"
            alt="Viggo"
            className={`${styles.introIcon} pixelated`}
          />

          <h1 className={styles.introTitle}>
            A collection of tiny moments
            <br />
            about everything my dog{" "}
            <span className={styles.highlight}>loves</span>
          </h1>
        </div>
      </div>

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