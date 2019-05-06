import React from 'react';
import './App.scss';
import GameBoard from './components/GameBoard';

const App: React.FC = () => {
  return (
    <div className="App">
      <GameBoard />
    </div>
  );
}

export default App;
