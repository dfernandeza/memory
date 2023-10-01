"use client";

import { FC, useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
// import type { ParsedUrlQuery } from "querystring";

import styles from "../styles/Game.module.css";

export const Header: FC<{
  sounds: { background: Howl; click: Howl };
}> = ({ sounds }) => {
  const [muted, setMuted] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.controls}>
        <Link
          href="/"
          className={styles.button}
          onClick={() => {
            sounds.background.stop();
            sounds.click.play();
          }}
        >
          BACK
        </Link>
        <button
          className={`${styles.button} ${styles.danger}`}
          onClick={() => {
            sounds.click.play();
            window.location.reload();
          }}
        >
          RESET
        </button>
      </div>
      <button
        className={`${styles.button} ${styles.audio}`}
        onClick={() => {
          sounds.click.play();

          if (muted) {
            sounds.background.play();
          } else {
            sounds.background.stop();
          }

          setMuted(!muted);
        }}
      >
        {muted ? `🔇` : `🔈`}
      </button>
    </header>
  );
};
