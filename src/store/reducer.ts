import { ActionTypes, CLICK_TILE } from "./actions";
import { GameStatus, IBoardState, XYCoord } from "./models";
// import { isFreshBoard, getNewBoard, IBoardState, IBoardConfig, revealFrom } from "../services/gameBoardService";


export interface IAppState {
  readonly width: number;
  readonly height: number;
  readonly mines: number;
  readonly gameStatus: GameStatus;
  readonly boardState: IBoardState;
}

const initialState: IAppState = {
  width: 10,
  height: 10,
  mines: 10,
  gameStatus: GameStatus.Ready,
  boardState: {}
};

export const coordToKey = (coord: XYCoord) => `${coord.x} ${coord.y}`;
export const keyToCoord = (key: string): XYCoord => {
  const splitKey = key.split(" ").map(str => parseInt(str, 10));
  return { x: splitKey[0], y: splitKey[0] };
}

const boardFactory = (width: number, height: number, mines: number, initialTile: XYCoord ) => {
  let availableCoords: XYCoord[] = [];

  // Build list of available coordinates, excluding whatever was clicked
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (x !== initialTile.x || y !== initialTile.y) {
        availableCoords.push({ x, y })
      }
    }
  }

  const newBoard: IBoardState = {};

  // Randomly select coordinates for mine placement
  for (let count = 0; count < mines; count++) {
    const coord = availableCoords.splice(Math.floor(Math.random()*availableCoords.length), 1)[0];
    newBoard[coordToKey(coord)] = {
      adjacent: undefined,
      flagged: false,
      mined: true
    }
  }

  return newBoard;
};

export const rootReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case CLICK_TILE:
      if (state.gameStatus === GameStatus.Ready) {
        return {
          ...state,
          gameStatus: GameStatus.Started,
          boardState: boardFactory(state.width, state.height, state.mines, action.coord)
        };
      }

      // revealFrom(state.boardState, state.boardConfig, action.x, action.y);

      return state;
    default:
      return state;
  }
}