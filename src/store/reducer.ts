import { ActionTypes, CLICK_TILE } from "./actions";

export interface IAppState {
  readonly boardDimensions: { x: number, y: number };
  readonly boardState: {
    readonly [x: number]: { 
      readonly [y: number]: ITileState 
    }
  };
}

export interface ITileState {
  adjacent: number;
  flagged: boolean;
  bomb: boolean;
}

const initialState: IAppState = {
  boardDimensions: { x: 10, y: 10 },
  boardState: {}
};

export const rootReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case CLICK_TILE:
      return {
        ...state,
        boardState: {
          ...state.boardState,
          [action.x]: {
            ...state.boardState[action.x],
            [action.y]: { adjacent: 0, flagged: true, bomb: false }
          }
        }
      }
    default:
      return state;
  }
}