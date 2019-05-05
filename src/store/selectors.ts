import { IAppState } from "./reducer";

export const getBoardDimensions = (state: IAppState) => ({ x: state.boardConfig.width, y: state.boardConfig.height });
export const getTileState = (state: IAppState, x: number, y: number) => state.boardState[x] ? state.boardState[x][y] || null : null;