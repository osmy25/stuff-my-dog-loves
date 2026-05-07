import styles from "./page.module.css";

export const metadata = {
  title: "Notes",
};

const notes = [
  {
    date: "may 7, 2026",
    text: "we watched the garbage truck together",
  },
  {
    date: "may 2, 2026",
    text: "viggo is barking in the yard.\nhe found a smelly old dirty ball.\nhe loves it",
  },
];

export default function NotesPage() {
  const note = notes[Math.floor(Math.random() * notes.length)];

  return (
    <main className={styles.page}>
      <article className={styles.note}>
        <p className={styles.date}>{note.date}</p>
        <p className={styles.text}>{note.text}</p>
      </article>
    </main>
  );
}