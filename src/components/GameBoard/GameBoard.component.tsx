import React from "react";
import { GameBoardContainerProps } from "./GameBoard.container";
import Tile from "../Tile";

const GameBoard: React.FC<GameBoardContainerProps> = ({ dimensions, clickTile }) => {
  const renderTiles = () => {
    let tiles = [];

    for (let y = 0; y < dimensions.y; y++) {
      for (let x = 0; x < dimensions.x; x++) {
        tiles.push(<Tile key={`${x} ${y}`} x={x} y={y}/>)
      }
    }

    return tiles;
  }

  const gameBoardStyle: React.CSSProperties = {
    gridTemplateColumns: `repeat(${dimensions.x}, max-content)`
  };

  console.log(gameBoardStyle);

  return (
    <div className="game-board" style={gameBoardStyle}>
      { renderTiles() }
    </div>
  )
};


export default GameBoard;
