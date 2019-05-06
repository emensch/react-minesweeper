import { XYCoord, ClickType } from "./models";

export const CLICK_TILE = "CLICK_TILE";

interface IClickTileAction {
  type: typeof CLICK_TILE;
  coord: XYCoord;
  clickType: ClickType;
}

export const clickTile = (coord: XYCoord, clickType: ClickType): IClickTileAction => ({
  type: CLICK_TILE,
  coord,
  clickType
});


export const RESET_GAME = "RESET_GAME";

interface IResetGameAction {
  type: typeof RESET_GAME;
}

export const resetGame = (): IResetGameAction => ({
  type: RESET_GAME
});

export type ActionTypes = IClickTileAction | IResetGameAction;