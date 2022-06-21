import { useState } from 'react';

import ColorChooser from '@/components/ColorChooser';
import Layout from '@/components/Layout';
import TurnChooser from '@/components/TurnChooser';
import GameBoard from './../components/GameBoard';

import { CellColor } from 'types';

export default function Home() {
  const [color, setColor] = useState<CellColor>('');
  const [playerTurn, setPlayerTurn] = useState<boolean | null>(null);

  return (
    <>
      {playerTurn === null ? (
        !color ? (
          <ColorChooser onClick={setColor} />
        ) : (
          <TurnChooser onClick={setPlayerTurn} playerColor={color} />
        )
      ) : (
        <GameBoard color={color} playerTurn={playerTurn} />
      )}
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
