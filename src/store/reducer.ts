import { ActionTypes, INCREMENT } from "./actions";

export interface IAppState {
  count: number;
}

const initialState: IAppState = {
  count: 0
};

export const rootReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      }
    default:
      return state;
  }
}