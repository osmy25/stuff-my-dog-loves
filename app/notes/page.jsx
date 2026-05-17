import styles from "./page.module.css";
import NotesClient from "./NotesClient";

export const metadata = {
  title: "Notes",
};

const notes = [
  {
    date: "may 2nd, 2026",
    text: "viggo is outside barking\nhe found an old dirty ball\n\nhe loves it",
  },
  {
    date: "may 4th, 2026",
    text: "viggo is side-staring me\nwhile i eat pizza\n\nhe think he is so sneaky",
  },
  {
    date: "may 6th, 2026",
    text: "right before lunch\nwe watched the garbage truck\n\nit was intense",
  },
  {
    date: "may 7th, 2026",
    text: "on a rock in the woods\n barking how great he is\n\n... and he is",
  },
  {
    date: "may 9th, 2026",
    text: "i stepped on girlfriend\nwhile making the bed\n\nviggo was not happy about it",
  },
  {
    date: "may 13th, 2026",
    text: "why is old dirty ball under sofa?\nviggo says he has no idea",
  }, 
  {
    date: "may 17th, 2026",
    text: "viggo carried girlfriend outside\nnow has:\n\nsoaking wet girlfriend",
  },
];

export default function NotesPage() {
  return (
    <main className={styles.page}>
      <NotesClient notes={notes} />
    </main>
  );
}