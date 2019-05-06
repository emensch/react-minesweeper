import React from "react";
import { GameBoardContainerProps } from "./GameBoard.container";
import Tile from "../Tile";

const GameBoard: React.FC<GameBoardContainerProps> = ({ dimensions }) => {
  const renderTiles = () => {
    let tiles = [];

    for (let y = 0; y < dimensions.height; y++) {
      for (let x = 0; x < dimensions.width; x++) {
        tiles.push(<Tile key={`${x} ${y}`} coord={{ x, y }}/>)
      }
    }

    return tiles;
  }

  const gameBoardStyle = {
    gridTemplateColumns: `repeat(${dimensions.width}, max-content)`
  };

  return (
    <div className="game-board-container">
      <div className="game-board" style={gameBoardStyle}>
        { renderTiles() }
      </div>
    </div>
  )
};


export default GameBoard;
