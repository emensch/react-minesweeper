import { ActionTypes, CLICK_TILE } from "./actions";
import { isFreshBoard, getNewBoard, IBoardState, IBoardConfig } from "../services/gameBoardService";

export interface IAppState {
  readonly boardConfig: IBoardConfig;
  readonly boardState: IBoardState;
}

const initialState: IAppState = {
  boardConfig: { width: 10, height: 10, mines: 10 },
  boardState: {}
};

export const rootReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case CLICK_TILE:
      if (isFreshBoard(state.boardState)) {
        return {
          ...state,
          boardState: getNewBoard(state.boardConfig, action.x, action.y)
        }
      }

      return state;
    default:
      return state;
  }
}