import type { NextPage } from 'next';
import Link from 'next/link';

import { Layout } from '../components/layout';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Layout>
      <header>
        <h1 className={styles.title}>Memory cards game!</h1>
      </header>
      <main className={styles.main}>
        <p className={styles.description}>
          Just an extremely simple but fun game that Lena enjoys 👨‍👧.
        </p>
        <p className={styles.instructions}>
          Memory starts with a grid of cards where you have to find image pairs.
          The game finish when all the pairs have been discovered.
        </p>

        <h2>Choose a level</h2>
        <div className={styles.grid}>
          <Link href="/levels/1">
            <a className={styles.card} style={{ '--level-rotation': '2deg' }}>
              <h3>6 cards</h3>
              <article className={styles.levelGrid}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={`level-6--${i}`} />
                ))}
              </article>
            </a>
          </Link>

          <Link href="/levels/2">
            <a className={styles.card} style={{ '--level-rotation': '-2deg' }}>
              <h3>10 cards</h3>
              <article className={styles.levelGrid}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={`level-10--${i}`} />
                ))}
              </article>
            </a>
          </Link>

          <Link href="/levels/3">
            <a className={styles.card} style={{ '--level-rotation': '2deg' }}>
              <h3>16 cards</h3>
              <article className={styles.levelGrid}>
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={`level-16--${i}`} />
                ))}
              </article>
            </a>
          </Link>

          <Link href="/levels/4">
            <a className={styles.card} style={{ '--level-rotation': '-2deg' }}>
              <h3>24 cards</h3>
              <article className={styles.levelGrid}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={`level-24--${i}`} />
                ))}
              </article>
            </a>
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
