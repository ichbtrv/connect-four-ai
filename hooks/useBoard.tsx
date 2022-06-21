import { useReducer, createContext, useContext, useCallback } from 'react';
import { Board, GameState, Player } from 'types';

export const checkWinningSlice = (boardSlice: Player[]) => {
  if (boardSlice.some((cell) => cell === Player.None)) return false;

  if (
    boardSlice[0] === boardSlice[1] &&
    boardSlice[1] === boardSlice[2] &&
    boardSlice[2] === boardSlice[3]
  ) {
    return boardSlice[1];
  }

  return false;
};

const getGameState = (board: Board) => {
  let shallowBoard = [...board];

  // Checks wins horizontally
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const index = r + c * 3;
      const boardSlice = shallowBoard.slice(index, index + 4);

      let winningResult = checkWinningSlice(boardSlice);
      if (winningResult !== false) {
        return winningResult;
      }
    }
  }

  // check wins vertically
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const index = r * 4 + c;
      const boardSlice = [
        shallowBoard[index],
        shallowBoard[index + 4],
        shallowBoard[index + 4 * 2],
        shallowBoard[index + 4 * 3]
      ];

      const winningResult = checkWinningSlice(boardSlice);
      if (winningResult !== false) {
        return winningResult;
      }
    }
  }

  // check wins diagonally
  for (let r = 0; r <= 2; r++) {
    for (let c = 0; c < 4; c++) {
      const index = r * 4 + c;

      // Checks diagonal down-left
      if (c >= 3) {
        const boardSlice = [
          shallowBoard[index],
          shallowBoard[index + 4 - 1],
          shallowBoard[index + 4 * 2 - 2],
          shallowBoard[index + 4 * 3 - 3]
        ];

        const winningResult = checkWinningSlice(boardSlice);
        if (winningResult !== false) {
          return winningResult;
        }
      }

      // Checks diagonal down-right
      if (c <= 3) {
        const boardSlice = [
          shallowBoard[index],
          shallowBoard[index + 4 + 1],
          shallowBoard[index + 4 * 2 + 2],
          shallowBoard[index + 4 * 3 + 3]
        ];

        const winningResult = checkWinningSlice(boardSlice);
        if (winningResult !== false) {
          return winningResult;
        }
      }
    }
  }

  if (shallowBoard.some((cell) => cell === Player.None)) {
    return GameState.Ongoing;
  } else {
    return GameState.Draw;
  }
};

export const initializeBoard = () => {
  const board = [];
  for (let i = 0; i < 16; i++) {
    board.push(Player.None);
  }
  return board;
};

export const findLowestEmptyIndex = (board: Board, column: number) => {
  for (let i = 16 + column; i >= 0; i -= 4) {
    if (board[i] === 0) return i;
  }

  return -1;
};

const connectService = async (board: Board, move = 4) => {
  const result: string[] = await fetch(
    `${process.env.NEXT_PUBLIC_9DT_SERVICE}[${move === 4 ? '' : move}]`
  )
    .then((res) => res.json())
    .catch(console.log);

  let cell =
    move === 4
      ? findLowestEmptyIndex(board, Number(result[0]))
      : findLowestEmptyIndex(board, Number(result[1]));

  try {
    if (cell === -1 && move !== 4) cell = await connectService(board, move);
    if (cell === -1 && move === 4) cell = await connectService(board);
  } catch (e) {
    console.error(e);
  }

  return cell;
};

export const BoardContext = createContext(initializeBoard());

type ActionType =
  | { type: 'ADD'; position: number }
  | { type: 'ADDCOMPUTER'; computerMove: number }
  | { type: 'RESET' };

export function useBoard(): {
  board: Board;
  move: (index: number) => number;
  computerMove: () => number;
  gameState: () => Player | GameState;
  resetBoard: () => void;
} {
  const initialBoard = useContext(BoardContext);

  const [board, dispatch] = useReducer(
    (state: Player[], action: ActionType) => {
      switch (action.type) {
        case 'ADD': {
          state[action.position] = 1;
          return [...state];
        }
        case 'ADDCOMPUTER': {
          state[action.computerMove] = 2;
          return [...state];
        }
        case 'RESET': {
          return [...state];
        }
        default:
          throw new Error();
      }
    },
    initialBoard
  );

  const move = (index: number) => {
    const column = index % 4;
    const position = findLowestEmptyIndex(board, column);
    const winner = gameState();

    if (position !== -1)
      dispatch({ type: 'ADD', position });
    else
      return winner;

    computerMove(column);

    return gameState();
  };

  const computerMove = (column?: number) => {
    const winner = gameState();

    if (winner >= 0) return winner;

    try {
      //checks for a column ( if service is first, initial move doesnt pass a column)
      column
        ? connectService(board, column).then((res) => {
          const position = res ?? 0;
          const computerMove = findLowestEmptyIndex(board, position);

          dispatch({ type: 'ADDCOMPUTER', computerMove });
        })
        : connectService(board).then((res) => {
          const position = res ?? 0;
          const computerMove = findLowestEmptyIndex(board, position);

          dispatch({ type: 'ADDCOMPUTER', computerMove });
        });
    } catch (e) {
      console.error(e);
    }
    return -1;
  };

  const resetBoard = () => {
    dispatch({ type: 'RESET' });
  };

  const gameState = () => {
    return getGameState(board);
  };

  return { board, move, computerMove, gameState, resetBoard };
}
