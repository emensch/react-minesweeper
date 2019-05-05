import React from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.scss';
import { IAppState } from './store/reducer';
import { getCount } from './store/selectors';
import { increment } from './store/actions';
import { Dispatch } from 'redux';

interface IAppStateProps {
  count: number;
}

const mapStateToProps = (state: IAppState): IAppStateProps => ({
  count: getCount(state)
});

interface IAppDispatch {
  increment: typeof increment;
}

const mapDispatchToProps = (dispatch: Dispatch): IAppDispatch => ({
  increment: () => dispatch(increment())
});

type AppProps = IAppStateProps & IAppDispatch;

const App: React.FC<AppProps> = ({ count, increment }) => {
  return (
    <div className="App">
      { count }
      <button onClick={increment}> + </button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
