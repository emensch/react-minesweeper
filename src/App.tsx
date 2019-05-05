import React from 'react';
import './App.scss';
import GameBoard from './components/GameBoard';

const App: React.FC = () => {
  return (
    <div className="App">
      <h2> Minesweeper </h2>
      <GameBoard />
    </div>
  );
}

export default App;
