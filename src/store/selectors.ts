import { IAppState } from './reducer';

export const getBoardDimensions = (state: IAppState) => state.boardDimensions;
export const getTile = (state: IAppState, x: number, y: number) => state.boardState[x][y];