import { ActionTypes, CLICK_TILE } from "./actions";
import { GameStatus, IBoardState, XYCoord } from "./models";
import { getTileState } from "./selectors";

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
        availableCoords.push({ x, y });
      }
    }
  }

  const newBoard: IBoardState = {};

  // Randomly select coordinates for mine placement
  for (let count = 0; count < mines; count++) {
    const coord = availableCoords.splice(Math.floor(Math.random()*availableCoords.length), 1)[0];
    newBoard[coordToKey(coord)] = {
      adjacent: null,
      flagged: false,
      mined: true
    };
  }

  return newBoard;
};

const getRevealTiles = (board: IBoardState, width: number, height: number, coord: XYCoord) => {
  const boardToMerge: IBoardState = {}; 
  let coordsToCheck = [coord];

  while (coordsToCheck.length > 0) {
    const coord = coordsToCheck.pop() as XYCoord;

    const { diagonal, orthogonal } = getAdjacentCoords(width, height, coord);
    const unrevealedDiagonal = diagonal.filter(coord => selectTile(boardToMerge, coord) === null);
    const unrevealedOrthogonal = orthogonal.filter(coord => selectTile(boardToMerge, coord) === null);

    const mines = countMines(board, [ ...unrevealedDiagonal, ...unrevealedOrthogonal ]);

    if (mines > 0) {
      boardToMerge[coordToKey(coord)] = {
        adjacent: mines,
        flagged: false,
        mined: false
      };
    } else {
      coordsToCheck.push(...unrevealedOrthogonal);
      // coordsToCheck.push(...unrevealedDiagonal)
      boardToMerge[coordToKey(coord)] = {
        adjacent: 0,
        flagged: false,
        mined: false
      };
    }
  }  
  
  return boardToMerge;
}

const getAdjacentCoords = (width: number, height: number, coord: XYCoord) => {
  const { x, y } = coord;

  let adjacentCoords: {
    orthogonal: XYCoord[]
    diagonal: XYCoord[]
  } = { 
    orthogonal: [],
    diagonal: []
  }

  for (let xIdx = Math.max(0, x - 1); xIdx <= Math.min(width - 1, x + 1); xIdx++) {
    for (let yIdx = Math.max(0, y - 1); yIdx <= Math.min(height - 1, y + 1); yIdx++) {
      if (xIdx === x && yIdx === y) {
        continue;
      }

      if (xIdx === x || yIdx === y) {
        adjacentCoords.orthogonal.push({ x: xIdx, y: yIdx })
      } else {
        adjacentCoords.diagonal.push({ x: xIdx, y: yIdx });
      }   
    }
  }

  return adjacentCoords;
}

const countMines = (board: IBoardState, coords: XYCoord[]) => (
  coords.reduce((count, coord) => {
    const tile = selectTile(board, coord);
    return tile ? count + 1 : count;
  }, 0)
);

const selectTile = (board: IBoardState, coord: XYCoord) => {
  const key = coordToKey(coord);

  return board[key] ? board[key] : null;
}

export const rootReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case CLICK_TILE:
      if (state.gameStatus === GameStatus.Ready) {
        const newBoard = boardFactory(state.width, state.height, state.mines, action.coord);
        const initialBoard = getRevealTiles(newBoard, state.width, state.height, action.coord);

        return {
          ...state,
          gameStatus: GameStatus.Started,
          boardState: initialBoard
        };
      }

      if (state.gameStatus === GameStatus.Started) {
        const tile = getTileState(state, action.coord);

        if (!tile)  {
          const updated = getRevealTiles(state.boardState, state.width, state.height, action.coord);

          return {
            ...state,
            boardState: {
              ...state.boardState,
              ...updated
            }
          };
        }

        if (tile.mined) {
          return {
            ...state,
            gameStatus: GameStatus.Lost
          };
        }
      }

      return state;
    default:
      return state;
  }
}