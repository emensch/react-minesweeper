import { connect } from 'react-redux';
import { clickTile, ActionTypes } from '../../store/actions';
import { getBoardDimensions } from '../../store/selectors';
import { IAppState } from '../../store/reducer';
import { Dispatch } from 'react';
import { XYCoord } from '../../store/models';

interface IStateProps {
  dimensions: { width: number, height: number };
}

interface IDispatchProps {
  clickTile: (coord: XYCoord) => void;
}

export type GameBoardContainerProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: IAppState): IStateProps => ({
  dimensions: getBoardDimensions(state)
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>): IDispatchProps => ({
  clickTile: (coord) => dispatch(clickTile(coord))
})

export default connect(mapStateToProps, mapDispatchToProps);