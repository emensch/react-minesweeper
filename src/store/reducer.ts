import { ActionTypes, CLICK_TILE } from './actions';

export interface IAppState {
  readonly boardDimensions: { x: number, y: number };
  readonly boardState: {
    readonly [x: number]: { 
      readonly [y: number]: ITile 
    }
  };
}

export interface ITile {
  adjacent: number;
  flagged: boolean;
  bomb: boolean;
}

const initialState: IAppState = {
  boardDimensions: { x: 0, y: 0},
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