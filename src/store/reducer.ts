import { ActionTypes, CLICK_TILE, RESET_GAME } from "./actions";
import { GameStatus, IBoardState, XYCoord, ClickType, ITileState } from "./models";

export interface IAppState {
  readonly width: number;
  readonly height: number;
  readonly mines: number;
  readonly gameStatus: GameStatus;
  readonly boardState: IBoardState;
}

export const coordToKey = (coord: XYCoord) => `${coord.x} ${coord.y}`;
export const keyToCoord = (key: string): XYCoord => {
  const splitKey = key.split(" ").map(str => parseInt(str, 10));
  return { x: splitKey[0], y: splitKey[0] };
}

const selectTile = (board: IBoardState, coord: XYCoord | string) => {
  const key = typeof coord === "string" ? coord : coordToKey(coord);

  return board[key] ? board[key] : {
    revealed: false,
    adjacent: null,
    flagged: false,
    mined: false
  };
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
    // Break if # mines exceeds number of available tiles
    if (availableCoords.length === 0) {
      break;
    }

    const coord = availableCoords.splice(Math.floor(Math.random()*availableCoords.length), 1)[0];
    newBoard[coordToKey(coord)] = {
      revealed: false,
      adjacent: 0,
      flagged: false,
      mined: true
    };
  }

  return newBoard;
};

const revealFromClick = (board: IBoardState, width: number, height: number, coord: XYCoord) => {
  const reaveled: IBoardState = {}; 
  let coordsToCheck = [coord];
  let visited = new Set<string>();

  // "Graph search" over board, revealing tiles that have no adjacent mines
  while (coordsToCheck.length > 0) {
    const coord = coordsToCheck.pop() as XYCoord;

    const unrevealedAdjacents = getAdjacentCoords(width, height, coord)
    .filter(coord => {
      // Do not visit this tile if it already has been
      if (visited.has(coordToKey(coord))) {
        return false;
      };
      // Likewise, do not visit if it is already revealed or flagged on the board
      const selected = selectTile(board, coord);
      if (selected.revealed || selected.flagged) {
        return false;
      }

      return true;
    });

    // Create entry on "diff" board to be merged into final
    const mines = countMines(board, unrevealedAdjacents);
    reaveled[coordToKey(coord)] = {
      revealed: true,
      adjacent: mines,
      flagged: false,
      mined: false
    };

    // Mark this coordinate as visited
    visited.add(coordToKey(coord));

    // If this is an un-mined tile, enqueue it
    if (mines === 0) {
      coordsToCheck.unshift(...unrevealedAdjacents);
    }
      
  }  
  
  return {
    ...board,
    ...reaveled
  };
}

const getAdjacentCoords = (width: number, height: number, coord: XYCoord) => {
  const { x, y } = coord;

  let adjacentCoords = [];

  for (let xIdx = Math.max(0, x - 1); xIdx <= Math.min(width - 1, x + 1); xIdx++) {
    for (let yIdx = Math.max(0, y - 1); yIdx <= Math.min(height - 1, y + 1); yIdx++) {
      // Skip middle
      if (xIdx === x && yIdx === y) {
        continue;
      }

      adjacentCoords.push({ x: xIdx, y: yIdx });
    }
  }

  return adjacentCoords;
}

const mapBoard = (board: IBoardState, mapFn: (tile: ITileState) => ITileState | undefined) => {
  const modifiedTiles: IBoardState = {};

  Object.keys(board).forEach(coordStr => {
    const tile = selectTile(board, coordStr);

    const returned = mapFn(tile);

    if (returned) {
      modifiedTiles[coordStr] = returned;
    }
  });

  return {
    ...board,
    ...modifiedTiles
  }
}

const countMines = (board: IBoardState, coords: XYCoord[]) => (
  coords.reduce((count, coord) => {
    const tile = selectTile(board, coord);

    return tile.mined ? count + 1 : count;
  }, 0)
);

// Victory occurs when the only unvisited tiles are mines
const checkVictory = (board: IBoardState, width: number, height: number) => {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const tile = selectTile(board, { x, y });

      if (!tile.revealed && !tile.mined) {
        return false;
      }
    }
  }

  return true;
}

const getVictoryState = (state: IAppState, newBoard: IBoardState) => {
  const updatedBoard = mapBoard(newBoard, (tile) => {
    if (tile.mined) {
      return {
        ...tile,
        flagged: true
      }
    }
  });

  return {
    ...state,
    gameStatus: GameStatus.Won,
    boardState: updatedBoard
  }
}

const initialState: IAppState = {
  width: 10,
  height: 10,
  mines: 15,
  gameStatus: GameStatus.Ready,
  boardState: {}
};

export const rootReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case RESET_GAME: 
      return initialState;

    case CLICK_TILE:
      if (state.gameStatus === GameStatus.Ready) {
        // On first click - generate empty board with no mine on clicked square
        const newBoard = boardFactory(state.width, state.height, state.mines, action.coord);
        // "click" tile and reveal
        const revealedBoard = revealFromClick(newBoard, state.width, state.height, action.coord);

        if (checkVictory(revealedBoard, state.width, state.height)) {
          return getVictoryState(state, revealedBoard);
        }

        return {
          ...state,
          gameStatus: GameStatus.Started,
          boardState: { 
            ...state.boardState,
            ...newBoard, 
            ...revealedBoard
          }
        };
      }

      if (state.gameStatus === GameStatus.Started) {
        const tile = selectTile(state.boardState, action.coord);

        if (action.clickType === ClickType.Right) {
          return {
            ...state,
            boardState: {
              ...state.boardState,
              [coordToKey(action.coord)]: {
                ...tile,
                flagged: !tile.flagged
              }
            }
          }
        }

        if (tile.mined) {
          const updatedBoard = mapBoard(state.boardState, (tile) => {
            if (tile.mined) {
              return {
                ...tile,
                revealed: true
              }
            }
          });

          return {
            ...state,
            gameStatus: GameStatus.Lost,
            boardState: updatedBoard
          };
        }

        if (!tile.revealed)  {
          const revealedBoard = revealFromClick(state.boardState, state.width, state.height, action.coord);

          if (checkVictory(revealedBoard, state.width, state.height)) {
            return getVictoryState(state, revealedBoard);
          }

          return {
            ...state,
            boardState: revealedBoard
          };
        }
      }

      return state;
      
    default:
      return state;
  }
}