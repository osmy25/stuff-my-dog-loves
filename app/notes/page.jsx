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
    text: "on a rock in the woods\nbarking how great he is\n\n... and he is",
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
  {
    date: "may 20th, 2026",
    text: "chewed a stick down to atoms,\nthen was surprised it was gone\n\nwe still went to look for it",
  },
  {
    date: "may 28th, 2026",
    text: "first lake swim this year\n green ball successfully rescued",
  },
  {
    date: "june 4th, 2026",
    text: "we brought girlfriend\non a car ride\n\n she was thrilled",
  },
  {
    date: "june 8th, 2026",
    text: "after barking at the neighbour's cat;\nwe had sausage",
  },
  {
    date: "june 21th, 2026",
    text: "found a new stick this morning\n stick pile is growing more impressive",
  },
  {
  date: "june 28th, 2026",
  text: "it's so hot\nwe have to go swimming every day\n\nviggo has no complaints",
  },

  {
  date: "june 29th, 2026",
  text: "viggo likes to roll in the sand after swimming\n\nnow i have 1 kg of sand in my bed",
  },

  {
    date: "july 9th, 2026",
    text: "we checked the mailbox together\n\nnothing for viggo today",
  },

  {
    date: "july 31st, 2026",
    text: "blueberry season is here\n\nviggo helped find them!!",
  },

  {
    date: "august 12th, 2026",
    text: "viggo carried the same stick almost all the way home\n\nalmost",
  },

  {
    date: "august 24th, 2026",
    text: "we shared a banana today\n\nviggo got the yummiest parts",
  },


];

export default function NotesPage() {
  return (
    <main className={styles.page}>
      <NotesClient notes={notes} />
    </main>
  );
}