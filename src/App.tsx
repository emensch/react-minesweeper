import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import { IAppState } from './store/reducer';
import { Dispatch } from 'redux';

const App: React.FC = () => {
  return (
    <div className="App">
      <h2> Minesweeper </h2>
    </div>
  );
}

export default App;
