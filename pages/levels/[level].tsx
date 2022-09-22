import { useEffect, useRef, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import type { ParsedUrlQuery } from 'querystring';
import party from 'party-js';
import { Howl } from 'howler';

import { Layout } from '../../components/layout';
import { Dialog } from '../../components/dialog';

import styles from '../../styles/Game.module.css';

interface Props {
  cards: string[];
}

const LEVELS = {
  '1': 6,
  '2': 10,
  '3': 16,
  '4': 24,
};

const EMOJIS = [
  '🐶',
  '🐱',
  '🐭',
  '🐰',
  '🦊',
  '🐻',
  '🐼',
  '🐯',
  '🦁',
  '🐮',
  '🐷',
  '🐸',
];

const DEFAULT_LEVEL = 1;

// Sounds

const backgroundSound = new Howl({
  src: ['/audio/kidding-around.mp3'],
  volume: 0.1,
  loop: true,
});

const flipSound = new Howl({
  src: ['/audio/flip.wav'],
});

const foundSound = new Howl({
  src: ['/audio/found.wav'],
});

const winnerSound = new Howl({
  src: ['/audio/cheer.wav'],
});

const failSound = new Howl({
  src: ['/audio/fart.wav'],
});

const clickSound = new Howl({
  src: ['/audio/click.wav'],
});

const Game: NextPage<Props> = ({ cards }) => {
  const router = useRouter();
  const [flipped, setFlipped] = useState<number[]>([]);
  const [found, setFound] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [muted, setMuted] = useState(false);

  const mainRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (found.length === cards.length) {
      const timer = setTimeout(() => {
        winnerSound.play();
        setFinished(true);
        clearTimeout(timer);
      }, 1000);
    }
  }, [cards, found]);

  function handleCardClick(index: number) {
    return () => {
      flipSound.play();

      if (
        found.length === cards.length ||
        flipped.length === 2 ||
        flipped.includes(index)
      ) {
        return;
      }

      const nextFlipped = [...flipped, index];
      setFlipped(nextFlipped);

      if (nextFlipped.length === 2) {
        if (cards[nextFlipped[0]] === cards[nextFlipped[1]]) {
          const nextFound = [...found, ...nextFlipped];

          if (nextFound.length !== cards.length) {
            party.sparkles(gridRef.current!);
            foundSound.play();
          }

          setFound(nextFound);
          setFlipped([]);
        } else {
          const timer = setTimeout(() => {
            failSound.play();
            setFlipped([]);
            clearTimeout(timer);
          }, 1000);
        }
      }
    };
  }

  return (
    <>
      <Layout>
        <header className={styles.header}>
          <div className={styles.controls}>
            <Link href="/">
              <a
                className={styles.button}
                onClick={() => {
                  backgroundSound.stop();
                  clickSound.play();
                }}
              >
                BACK
              </a>
            </Link>
            <button
              className={`${styles.button} ${styles.danger}`}
              onClick={() => {
                clickSound.play();
                router.reload();
              }}
            >
              RESET
            </button>
          </div>
          <button
            className={`${styles.button} ${styles.audio}`}
            onClick={() => {
              clickSound.play();

              if (muted) {
                backgroundSound.play();
              } else {
                backgroundSound.stop();
              }

              setMuted(!muted);
            }}
          >
            {muted ? `🔇` : `🔈`}
          </button>
        </header>
        <main ref={mainRef}>
          <h2 className={styles.marker}>
            {found.length ? found.length / 2 : 0} / {cards.length / 2}
          </h2>
          <section className={styles.grid} ref={gridRef}>
            {cards.map((emoji, index) => (
              <div key={index} className={styles.scene}>
                <div
                  className={`${styles.card} ${
                    found.includes(index) || flipped.includes(index)
                      ? styles.flipped
                      : ''
                  }`}
                  onClick={handleCardClick(index)}
                >
                  <div className={`${styles.cardFace} ${styles.cardFront}`} />
                  <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    {emoji}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>
      </Layout>

      <Dialog open={!started}>
        <h3 className={styles.dialogTitle}>Ready?!</h3>
        <button
          className={styles.button}
          onClick={() => {
            clickSound.play();
            backgroundSound.play();
            setStarted(true);
          }}
        >
          START
        </button>
      </Dialog>

      <Dialog
        open={finished}
        onOpen={() => {
          party.confetti(dialogRef.current!);
        }}
      >
        <div ref={dialogRef}>
          <h3 className={styles.dialogTitle}>🎉 Well done! 🎉</h3>
          <button
            className={styles.button}
            onClick={() => {
              clickSound.play();
              router.reload();
            }}
          >
            PLAY AGAIN
          </button>
        </div>
      </Dialog>
    </>
  );
};

interface Params extends ParsedUrlQuery {
  level: keyof typeof LEVELS;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  function getRandomInt(min: number, max: number) {
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getImages(count: number) {
    if (count > EMOJIS.length) {
      return EMOJIS;
    }

    const images = new Set<string>();

    while (images.size < count) {
      const randomInt = getRandomInt(0, EMOJIS.length);
      images.add(EMOJIS[randomInt]);
    }

    return Array.from(images);
  }

  function getCards(images: string[]) {
    const cardMap = new Map<string, number>();
    const cards: string[] = [];

    while (cards.length < images.length * 2) {
      const randomInt = getRandomInt(0, images.length);
      const image = images[randomInt];

      if (cardMap.has(image)) {
        if (cardMap.get(image)! === 2) {
          continue;
        }

        cardMap.set(image, 2);
        cards.push(image);
      } else {
        cardMap.set(image, 1);
        cards.push(image);
      }
    }

    return cards;
  }

  const numberOfCards = LEVELS[params?.level ?? DEFAULT_LEVEL];
  const images = getImages(numberOfCards / 2);
  const cards = getCards(images);

  // Pass data to the page via props
  return { props: { cards } };
};

export default Game;
