import type { NextPage } from "next";

import { TicTacToe as Game } from "../../components/tictactoe";

interface Params {
  player1: string;
  player2: string;
}

const TicTacToe: NextPage<{ searchParams: Params }> = ({ searchParams }) => {
  const { player1, player2 } = searchParams;
  const players =
    player1 && player2 ? ([player1, player2] as [string, string]) : null;

  return <Game players={players} />;
};

export default TicTacToe;
