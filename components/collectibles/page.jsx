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
            alt="Stuff My Dog Loves Series One card pack"
          />
        </div>

        <div className={styles.productInfo}>
          <p className={styles.series}>series one</p>

          <h1>Series One</h1>

          <p>
            A complete five-card collectible set featuring some of Viggo&apos;s
            favorite moments.
          </p>

          <div className={styles.details}>
            <p className={styles.detailsTitle}>Included</p>

            <ul className={styles.detailsList}>
              <li>Napping With Girlfriend</li>
              <li>I Who Conquer Mountains</li>
              <li>Stick Collection</li>
              <li>Ball Rescue Mission</li>
              <li>Picking Blueberries</li>
            </ul>
          </div>

          <div className={styles.details}>
            <p className={styles.detailsTitle}>Specs</p>

            <ul className={styles.detailsList}>
              <li>5 cards</li>
              <li>63 × 88 mm</li>
              <li>350 gsm matte cardstock</li>
              <li>Rounded corners</li>
              <li>Printed in Europe</li>
            </ul>
          </div>

          <div className={styles.buyArea}>
            <p className={styles.price}>149 SEK</p>
            <p className={styles.note}>✓ Worldwide shipping included</p>

            <a className={styles.buyButton} href="#">
              Buy Series One
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}