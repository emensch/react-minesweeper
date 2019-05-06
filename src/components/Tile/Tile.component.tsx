import React from "react";
import { TileContainerProps } from "./Tile.container";
import classNames from "classnames";
import { ClickType } from "../../store/models";
import { MineNumber } from "../MineNumber";

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
    } if (tileState.revealed && tileState.mined) {
      return <img className="tile-icon" src="/mine.png" />;
    } else if (tileState.flagged) {
      return <img className="tile-icon" src="/flag.png" />;
    } else if (tileState.adjacent) {
      return <MineNumber number={tileState.adjacent} />;
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