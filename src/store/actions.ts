export const CLICK_TILE = "CLICK_TILE";

interface IClickTileAction {
  type: typeof CLICK_TILE;
  x: number;
  y: number;
}

export const clickTile = (x: number, y: number): IClickTileAction => ({
  type: CLICK_TILE,
  x,
  y
});

export type ActionTypes = IClickTileAction;