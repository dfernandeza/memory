import Link from "next/link";
import type { NextPage } from "next";

// import { TicTacToe as Game } from "../../components/tictactoe";
import styles from "../styles/Home.module.css";
import gameStyles from "../styles/Game.module.css";

const Index: NextPage = () => {
  return (
    <>
      <header>
        <h1 className={styles.title}>Lena&apos;s games!</h1>
      </header>
      <main className={styles.main}>
        <p className={styles.description}>
          Just some extremely simple but fun games that Lena enjoys 👨‍👧.
        </p>

        <h2>Choose a game!</h2>

        <div className={styles.menu}>
          <Link
            href="/memory"
            className={`${gameStyles.button} ${gameStyles.danger} ${gameStyles.large}`}
          >
            Memory
          </Link>

          <Link
            href="/tic-tac-toe"
            className={`${gameStyles.button} ${gameStyles.danger} ${gameStyles.large}`}
          >
            Tic tac toe
          </Link>
        </div>
      </main>
    </>
  );
};

export default Index;
