"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function NotesClient({ notes }) {
  const [currentIndex, setCurrentIndex] = useState(notes.length - 1);
  const [visible, setVisible] = useState(true);

  const currentNote = notes[currentIndex];

  function switchNote() {
    if (!visible) return;

    setVisible(false);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? notes.length - 1 : prevIndex - 1
      );

      setVisible(true);
    }, 600);
  }

  return (
    <article className={styles.note}>
      <p className={styles.label}>~ notes ~</p>

      <div
        className={styles.content}
        data-visible={visible}
        onClick={switchNote}
      >
        <p className={styles.date}>{currentNote.date}</p>

        <p className={styles.text}>{currentNote.text}</p>
      </div>
    </article>
  );
}