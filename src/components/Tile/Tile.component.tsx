import React from "react";
import { TileContainerProps } from "./Tile.container";
import classNames from "classnames";
import { ClickType } from "../../store/models";

const Tile: React.FC<TileContainerProps> = ({ tileState, onClick }) => {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick(ClickType.Left);
  }

  const onContextHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick(ClickType.Right);
  }

  const isRevealed = () => tileState ? tileState.revealed : false;

  const renderInnerTile = () => {
    if (!tileState) {
      return;
    } if (tileState.mined) {
      return "X";
    } else if (tileState.flagged) {
      return "F";
    } else if (tileState.adjacent) {
      return tileState.adjacent;
    }
  }

  return (
    <button 
      disabled={isRevealed()}
      className={classNames("tile", { "revealed": isRevealed() })}
      onClick={onClickHandler} 
      onContextMenu={onContextHandler}
    >
      { renderInnerTile() }
    </button>
  )
}

export default Tile;