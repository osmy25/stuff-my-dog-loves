"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const pathname = usePathname();
  const idFromUrl = pathname.startsWith("/card/")
    ? pathname.split("/card/")[1]
    : null;

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

      const random = reactions[Math.floor(Math.random() * reactions.length)];

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
  }

  function handlePrev() {
    if (items.length === 0) return;

    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    const prevItem = items[prevIndex];

    setCurrentIndex(prevIndex);
    updateUrl(prevItem.id);
  }

  const isHearted =
    mounted && heartsLoaded && currentItem
      ? heartedItems.includes(currentItem.id)
      : false;

  const minSwipeDistance = 50;

  function onTouchStart(e) {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }

  function onTouchMove(e) {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }

  function onTouchEnd() {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;

    if (Math.abs(distanceX) < minSwipeDistance) return;
    if (Math.abs(distanceX) < Math.abs(distanceY)) return;

    if (distanceX > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <div className={styles.introRow}>
          <Link
            href="/notes"
            onClick={() => {
              window.umami?.track("Secret notes discovery");
            }}
          >
            <img
              src="/images/viggo-head.png"
              alt="Viggo"
              className={`${styles.introIcon} pixelated`}
            />
          </Link>

          <h1 className={styles.introTitle}>
            A collection of tiny moments
            <br />
            about everything my dog{" "}
            <span className={styles.highlight}>loves</span>
          </h1>
          <Link
            href="/map"
            onClick={() => {
              window.umami?.track("Secret map");
            }}
          >
            <img
              src="/images/mapicon.png"
              alt="map"
              className={`${styles.introIcon} pixelated`}
            />
          </Link>
        </div>
      </div>

      <div
        className={styles.swipeWrapper}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Card
          item={currentItem}
          onHeart={handleHeart}
          isHearted={isHearted}
          reaction={reaction}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
          onClick={handlePrev}
          disabled={items.length === 0}
          className={styles.button}
          aria-label="Back"
        >
          <img src="/images/backbutton.png" alt="" />
        </button>

        <button
          onClick={handleNext}
          disabled={items.length === 0}
          className={styles.button}
          aria-label="More"
        >
          <img src="/images/morebutton.png" alt="" />
        </button>
      </div>
    </div>
  );
}