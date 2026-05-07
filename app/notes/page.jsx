import styles from "./page.module.css";
import NotesClient from "./NotesClient";

export const metadata = {
  title: "Notes",
};

const notes = [
  {
    date: "may 2, 2026",
    text: "viggo is outside barking\nhe found an old dirty ball\n\nhe loves it",
  },
  {
    date: "may 4, 2026",
    text: "viggo is side-staring me while i eat pizza\nhe think he is so sneaky",
  },
  {
    date: "may 6, 2026",
    text: "we watched the garbage truck together\nit was intense",
  },
  {
    date: "may 7, 2026",
    text: "on a rock in the woods\n barking how great he is\n\nand he is",
  },  
];

export default function NotesPage() {
  return (
    <main className={styles.page}>
      <NotesClient notes={notes} />
    </main>
  );
}