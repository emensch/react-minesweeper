export interface IBoardState {
  [coord: string]: ITileState;
}

export interface ITileState {
  revealed: boolean;
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

export enum ClickType {
  Left,
  Right
}

export type XYCoord = { x: number, y: number };