import { XYCoord, ClickType } from "./models";

export const CLICK_TILE = "CLICK_TILE";

interface IClickTileAction {
  type: typeof CLICK_TILE;
  coord: XYCoord
  clickType: ClickType
}

export const clickTile = (coord: XYCoord, clickType: ClickType): IClickTileAction => ({
  type: CLICK_TILE,
  coord,
  clickType
});

export type ActionTypes = IClickTileAction;