import { IAppState, coordToKey } from "./reducer";
import { XYCoord } from "./models";

export const getBoardDimensions = (state: IAppState) => ({ width: state.width, height: state.height });

export const getTileState = (state: IAppState, coord: XYCoord) => state.boardState[coordToKey(coord)] || null;