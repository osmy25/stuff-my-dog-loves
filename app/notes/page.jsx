import styles from "./page.module.css";

export const metadata = {
  title: "Notes",
};

const notes = [
  {
    date: "may 5, 2026",
    text: "side-eying me while eating pizza,\n he doesnt think I see it, haha",
  },
  {
    date: "may 2, 2026",
    text: "viggo is barking in the yard.\nhe found a smelly old dirty ball.\nhe loves it",
  },
];

export default function NotesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {notes.map((note, index) => (
          <article key={index} className={styles.note}>
            <p className={styles.date}>{note.date}</p>
            <p className={styles.text}>{note.text}</p>
          </article>
        ))}
      </div>
    </main>
  );
}