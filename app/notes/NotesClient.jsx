"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function NotesClient({ notes }) {
  const [currentNote, setCurrentNote] = useState(notes[0]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setCurrentNote(
      notes[Math.floor(Math.random() * notes.length)]
    );
  }, [notes]);

  function getRandomNote(excludeText) {
    let next;

    do {
      next = notes[Math.floor(Math.random() * notes.length)];
    } while (
      notes.length > 1 &&
      next.text === excludeText
    );

    return next;
  }

  function switchNote() {
    if (!visible) return;

    setVisible(false);

    setTimeout(() => {
      const nextNote = getRandomNote(currentNote.text);

      setCurrentNote(nextNote);

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

        <p className={styles.text}>
          {currentNote.text}
        </p>
      </div>
    </article>
  );
}