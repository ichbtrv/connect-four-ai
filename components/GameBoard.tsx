import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useBoard } from 'hooks/useBoard';
import { CellColor, Player } from 'types';
import ResetModal from './ResetModal';

enum Color {
  'blue' = 'bg-sky-500 border-sky-500',
  'red' = 'bg-red-700 border-red-700',
  '' = ''
}

enum HoverColor {
  'blue' = 'hover:border-sky-500',
  'red' = 'hover:border-red-700',
  '' = ''
}

interface BoardProps {
  playerTurn: boolean;
  color: CellColor;
}

const GameBoard: React.FC<BoardProps> = ({ playerTurn, color }) => {
  const [winner, setWinner] = useState(-2);
  const [clicked, setClicked] = useState(false);
  const { board, move, computerMove, gameState } = useBoard();

  const playerColor: CellColor = color;
  const computerColor = playerColor === 'blue' ? 'red' : 'blue';
  let turn = playerTurn;

  const debounceClick = useCallback(() => {
    setTimeout(() => {
      setClicked(true);
    }, 50);
    setTimeout(() => {
      setClicked(false);
    }, 250);
  }, [clicked]);

  const onMove = useCallback(
    (index: number) => winner < 0 && move(index),
    [move]
  );

  useEffect(() => {
    if (!turn) computerMove();
    turn = true;
  }, []);

  useEffect(() => {
    setWinner(gameState());
  }, [move]);

  return (
    <section>
      <div
        className="h-96 w-96 grid grid-cols-4 rounded-md bg-slate-600 bg-opacity-10 appear-faster
    "
      >
        {board.map((player: Player, index: number) => {
          return (
            <div
              className={`${HoverColor[playerColor]} ${clicked ? 'pointer-events-none' : 'cursor-pointer'
                } border m-2 rounded-full bg-opacity-70 brightness-125 ${player === 1 ? Color[playerColor] : ''
                } ${player === 2 ? Color[computerColor] : ''}`}
              onClick={() => {
                winner < 0 && onMove(index);
                debounceClick();
              }}
              key={`cell-${index}`}
            />
          );
        })}
      </div>
      {winner >= 0 && <ResetModal winner={winner} />}
    </section>
  );
};

export default GameBoard;
