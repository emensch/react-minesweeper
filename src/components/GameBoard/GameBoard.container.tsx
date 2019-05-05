import { connect } from 'react-redux';
import { clickTile, ActionTypes } from '../../store/actions';
import { getBoardDimensions } from '../../store/selectors';
import { IAppState } from '../../store/reducer';
import { Dispatch } from 'react';

interface IStateProps {
  dimensions: { x: number, y: number };
}

interface IDispatchProps {
  clickTile: (x: number, y: number) => void;
}

export type GameBoardContainerProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: IAppState): IStateProps => ({
  dimensions: getBoardDimensions(state)
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>): IDispatchProps => ({
  clickTile: (x, y) => dispatch(clickTile(x, y))
})

export default connect(mapStateToProps, mapDispatchToProps);