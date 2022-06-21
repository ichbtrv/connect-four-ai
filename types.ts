export enum PlayerTurn {
  'NONE',
  'ONE',
  'TWO'
}

export enum Player {
  None = 0,
  One = 1,
  Two = 2
}

export enum GameState {
  Ongoing = -1,
  Draw = 0,
  PlayerOneWin = Player.One,
  PlayerTwoWin = Player.Two
}

export type Board = Player[];

export type CellColor = 'blue' | 'red' | '';
