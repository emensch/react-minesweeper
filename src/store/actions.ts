import { XYCoord } from "./models";

export const CLICK_TILE = "CLICK_TILE";

interface IClickTileAction {
  type: typeof CLICK_TILE;
  coord: XYCoord
}

export const clickTile = (coord: XYCoord): IClickTileAction => ({
  type: CLICK_TILE,
  coord
});

export type ActionTypes = IClickTileAction;