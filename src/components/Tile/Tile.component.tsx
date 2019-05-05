import React from "react";
import { TileContainerProps } from "./Tile.container";

const Tile: React.FC<TileContainerProps> = ({ tileState, onClick }) => {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick();
  }

  return (
    <button className="tile" onClick={onClickHandler}>

    </button>
  )
}

export default Tile;