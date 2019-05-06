export interface IBoardState {
  [coord: string]: ITileState;
}

export interface ITileState {
  adjacent: number | null;
  flagged: boolean;
  mined: boolean;
}

export enum GameStatus {
  Ready,
  Started,
  Won,
  Lost
};

export type XYCoord = { x: number, y: number };