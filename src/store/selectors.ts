import { IAppState } from "./reducer";

export const getBoardDimensions = (state: IAppState) => state.boardDimensions;
export const getTileState = (state: IAppState, x: number, y: number) => state.boardState[x] ? state.boardState[x][y] || null : null;