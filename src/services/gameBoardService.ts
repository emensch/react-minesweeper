export interface IBoardState {
  [x: number]: { 
    [y: number]: ITileState 
  };
}

export interface ITileState {
  adjacent: number | undefined;
  flagged: boolean;
  mined: boolean;
}

export interface IBoardConfig {
  width: number;
  height: number;
  mines: number;
}

// TODO: Extract boardState into separate interface
export const isFreshBoard = (boardState: IBoardState) => Object.keys(boardState).length === 0

export const getNewBoard = (config: IBoardConfig, clickedX: number, clickedY: number) => {
  const { width, height, mines } = config;

  let availableCoords: Array<{ x: number, y: number }> = [];

  // Build list of available coordinates, excluding whatever was clicked
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (x !== clickedX || y !== clickedY) {
        availableCoords.push({ x, y })
      }
    }
  }

  const newBoard: IBoardState = {};

  // Randomly select coordinates for mine placement
  for (let count = 0; count < mines; count++) {
    const { x, y } = availableCoords.splice(Math.floor(Math.random()*availableCoords.length), 1)[0];

    newBoard[x] = { 
      ...newBoard[x],
      [y]: {
        adjacent: undefined,
        flagged: false,
        mined: true
      }
    }
  }

  return newBoard;
}
