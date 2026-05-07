"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function NotesClient({ notes }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * notes.length));
  }, [notes.length]);

  function switchNote() {
    setIndex((currentIndex) => {
      if (notes.length <= 1) return currentIndex;

      let nextIndex = currentIndex;

      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * notes.length);
      }

      return nextIndex;
    });
  }

  const note = notes[index];

  return (
    <article className={styles.note} onClick={switchNote}>
      <p className={styles.date}>{note.date}</p>
      <p className={styles.text}>{note.text}</p>
    </article>
  );
}