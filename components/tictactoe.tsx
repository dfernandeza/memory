"use client";

import { FC, ReactEventHandler, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import party from "party-js";
import { Howl } from "howler";

import { Header } from "../components/header";
import { Dialog } from "../components/dialog";

import homeStyles from "../styles/Home.module.css";
import styles from "../styles/Game.module.css";
import tttStyles from "../styles/TicTacToe.module.css";

interface Props {
  players: [p1: string, p2: string] | null;
}

// Sounds

const backgroundSound = new Howl({
  src: ["/audio/kidding-around.mp3"],
  volume: 0.1,
  loop: true,
  html5: true,
});

const clickTileSound = new Howl({
  src: ["/audio/found.wav"],
});

const winnerSound = new Howl({
  src: ["/audio/cheer.wav"],
});

const clickSound = new Howl({
  src: ["/audio/click.wav"],
});

const p1Icon = "❌";
const p2Icon = "⭕️";

const icons = [p1Icon, p2Icon];

type Grid = (string[] | null[] | undefined[])[];

function checkRows(grid: Grid, [i, j]: [i: number, j: number]) {
  for (let row = 0; row < 3; row++) {
    if (
      grid[row][0] !== null &&
      grid[row][0] === grid[row][1] &&
      grid[row][0] === grid[row][2]
    ) {
      return true;
    }
  }

  return false;
}

function checkColumns(grid: Grid, [i, j]: [i: number, j: number]) {
  for (let col = 0; col < 3; col++) {
    if (
      grid[0][col] !== null &&
      grid[0][col] === grid[1][col] &&
      grid[0][col] === grid[2][col]
    ) {
      return true;
    }
  }

  return false;
}

function checkLRDiagonal(grid: Grid, [i, j]: [i: number, j: number]) {
  return (
    grid[0][0] !== null &&
    grid[0][0] === grid[1][1] &&
    grid[0][0] === grid[2][2]
  );
}

function checkRLDiagonal(grid: Grid, [i, j]: [i: number, j: number]) {
  return (
    grid[0][2] !== null &&
    grid[0][2] === grid[1][1] &&
    grid[0][2] === grid[2][0]
  );
}

function hasWon(grid: Grid, cell: [i: number, j: number]) {
  return (
    checkRows(grid, cell) ||
    checkColumns(grid, cell) ||
    checkLRDiagonal(grid, cell) ||
    checkRLDiagonal(grid, cell)
  );
}

export const TicTacToe: FC<Props> = ({ players }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [p1, setP1] = useState<FormDataEntryValue>(players?.[0] ?? "");
  const [p2, setP2] = useState<FormDataEntryValue>(players?.[1] ?? "");
  const [currentPlayer, setCurrentPlayer] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);

  const grid = useRef<Grid>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (winner !== null) {
      timer = setTimeout(() => {
        winnerSound.play();
        setFinished(true);
        clearTimeout(timer);
      }, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [winner]);

  const playing = [p1.toString(), p2.toString()];

  const onStart: ReactEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const p1 = data.get("player1");
    const p2 = data.get("player2");

    if (!p1 || !p2) {
      setError("Enter the players names!");

      return;
    }

    if (p1 === p2) {
      setError("Enter different players names!");

      return;
    }

    setP1(p1);
    setP2(p2);

    const params = new URLSearchParams(`player1=${p1}&player2=${p2}`);
    router.push(`${pathname}?${params.toString()}`);

    clickSound.play();
    backgroundSound.play();
    setStarted(true);
  };

  const onClickTile: ReactEventHandler<HTMLLIElement> = (event) => {
    const target = event.target as HTMLLIElement;
    const [i, j] = target.dataset.cell?.split(",") ?? [];

    clickTileSound.play();

    if (!grid.current[+i][+j]) {
      grid.current[+i][+j] = icons[Number(currentPlayer)];
      if (hasWon(grid.current, [+i, +j])) {
        setWinner(playing[Number(currentPlayer)]);
      } else {
        setCurrentPlayer(!currentPlayer);
      }
    }
  };

  return (
    <>
      <Header sounds={{ background: backgroundSound, click: clickSound }} />

      <header>
        <h1 className={homeStyles.title}>Tic tac toe!</h1>
      </header>

      {p1 && p2 ? (
        <div className={tttStyles.players}>
          <p>
            {players?.[0]} {p1Icon} {players?.[1]} {p2Icon}
          </p>
          <h2 className={tttStyles.currentPlayer}>
            Go {playing[Number(currentPlayer)]}
          </h2>
        </div>
      ) : null}

      <ol className={tttStyles.titactoe}>
        {grid.current.map((row, i) =>
          row.map((_, j) => {
            return (
              <li key={`${i}-${j}`} data-cell={[i, j]} onClick={onClickTile}>
                {grid.current[i][j]}
              </li>
            );
          })
        )}
      </ol>

      <Dialog open={!started}>
        <h3 className={styles.dialogTitle}>Who is playing?</h3>
        <form className={styles.form} onSubmit={onStart}>
          <fieldset>
            <label htmlFor="player1">Player 1 </label>
            <input
              id="player1"
              title="player1"
              name="player1"
              type="text"
              required
              defaultValue={p1?.toString()}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="player2">Player 2 </label>
            <input
              id="player2"
              title="player2"
              name="player2"
              type="text"
              required
              defaultValue={p2?.toString()}
            />
          </fieldset>

          <p className={styles.error}>{error}</p>

          <button type="submit" className={styles.button}>
            START
          </button>
        </form>
      </Dialog>

      <Dialog
        open={finished}
        onOpen={() => {
          party.confetti(dialogRef.current!);
        }}
      >
        <div ref={dialogRef}>
          <h3 className={styles.dialogTitle}>🎉 Well done {winner}! 🎉</h3>
          <button
            className={styles.button}
            onClick={() => {
              clickSound.play();
              window.location.reload();
            }}
          >
            PLAY AGAIN
          </button>
        </div>
      </Dialog>
    </>
  );
};
