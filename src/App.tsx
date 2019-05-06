import React from "react";
import "./App.scss";
import GameBoard from "./components/GameBoard";
import store from "./store";
import { resetGame } from "./store/actions";

const App: React.FC = () => {
  return (
    <div className="App">
      <GameBoard />
      <button className="game-button" onClick={() => store.dispatch(resetGame())}> Reset </button>
    </div>
  );
}

export default App;
