import styles from "./page.module.css";
import NotesClient from "./notesClient";

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
    text: "viggo is outside barking\nhe found an old dirty ball\n\nhe loves it",
  },
  {
    date: "may 5, 2026",
    text: "viggo is side-staring me while i eat pizza\n he think he is so sneaky",
  },
];

export default function NotesPage() {
  return (
    <main className={styles.page}>
      <NotesClient notes={notes} />
    </main>
  );
}