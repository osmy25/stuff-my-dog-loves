import styles from "./page.module.css";

export const metadata = {
  title: "Collectibles",
};

export default function CollectiblePage() {
  return (
    <main className={styles.page}>

      <section className={styles.productCard}>
        <div className={styles.imageBox}>
          <img
            src="/images/series-one-pack.png"
            alt="Series One card pack"
          />
        </div>

        <div className={styles.productInfo}>
          <p className={styles.series}>series one</p>
          <h1>Five-card pack</h1>

          <p>
            A small set of printed cards featuring five favorite moments from
            Viggo&apos;s world.
          </p>

          <ul>
            <li>#001 Napping With Girlfriend</li>
            <li>#024 I Who Conquer Mountains</li>
            <li>#026 Stick Collection</li>
            <li>#027 Ball Rescue Mission</li>
            <li>#028 Picking Blueberries</li>
          </ul>

          <div className={styles.details}>
            <p className={styles.detailsTitle}>Details</p>

            <ul className={styles.detailsList}>
              <li>5 collectible cards</li>
              <li>Standard trading card size (63 × 88 mm)</li>
              <li>Premium 350 gsm matte cardstock</li>
              <li>Rounded corners</li>
              <li>Packed by hand in Sweden</li>
            </ul>
          </div>

          <p className={styles.price}>$9.99 + shipping</p>

          <a className={styles.buyButton} href="#">
            buy pack
          </a>

          <p className={styles.note}>Ships worldwide.</p>
        </div>
      </section>
    </main>
  );
}