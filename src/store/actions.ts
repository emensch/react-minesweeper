export const INCREMENT = 'INCREMENT';

interface IIncrementAction {
  type: typeof INCREMENT;
}

export const increment = (): IIncrementAction => ({
  type: INCREMENT
});

export type ActionTypes = IIncrementAction;