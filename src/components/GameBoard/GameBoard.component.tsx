import React from "react";
import { GameBoardContainerProps } from "./GameBoard.container";
import Tile from "../Tile";

class GameBoard extends React.Component<GameBoardContainerProps> {
  gameBoardRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const containerDiv = this.gameBoardRef.current as HTMLDivElement;
    containerDiv.addEventListener("contextmenu", this.preventDefault);
  }

  componentWillUnmount() {
    const containerDiv = this.gameBoardRef.current as HTMLDivElement;
    containerDiv.removeEventListener("contextmenu", this.preventDefault);
  }

  preventDefault = (e: MouseEvent) => {
    e.preventDefault();
  }

  renderTiles = () => {
    const { dimensions } = this.props;
    
    let tiles = [];

    for (let y = 0; y < dimensions.height; y++) {
      for (let x = 0; x < dimensions.width; x++) {
        tiles.push(<Tile key={`${x} ${y}`} coord={{ x, y }}/>)
      }
    }

    return tiles;
  }

  getGameBoardStyle = (): React.CSSProperties => ({
    gridTemplateColumns: `repeat(${this.props.dimensions.width}, max-content)`
  });

  render() {
    return (
      <div className="game-board-container">
        <div className="game-board" style={this.getGameBoardStyle()} ref={this.gameBoardRef}>
          { this.renderTiles() }
        </div>
      </div>
    )
  }
}


export default GameBoard;
