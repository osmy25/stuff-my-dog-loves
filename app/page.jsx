import styles from "./page.module.css";
import List from "../components/List/List";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <List />
    </div>
  );
}