import React from "react";
import { TileContainerProps } from "./Tile.container";
import classNames from "classnames";

const Tile: React.FC<TileContainerProps> = ({ tileState, onClick }) => {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick();
  }

  const isRevealed = () => {
    if (!tileState) {
      return false;
    }

    return tileState.adjacent !== null && tileState.adjacent >= 0;
  }

  const renderInnerTile = () => {
    if (!tileState) {
      return;
    } if (tileState.mined) {
      return "X";
    } else if (tileState.adjacent) {
      return tileState.adjacent;
    }
  }

  return (
    <button disabled={isRevealed()} className={classNames("tile", { "revealed": isRevealed() })} onClick={onClickHandler}>
      { renderInnerTile() }
    </button>
  )
}

export default Tile;