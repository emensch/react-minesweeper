export const CLICK_TILE = 'CLICK_TILE';

interface IIncrementAction {
  type: typeof CLICK_TILE;
  x: number;
  y: number;
}

export const clickTile = (x: number, y: number): IIncrementAction => ({
  type: CLICK_TILE,
  x,
  y
});

export type ActionTypes = IIncrementAction;