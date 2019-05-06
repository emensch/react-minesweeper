import { connect } from 'react-redux';
import { clickTile, ActionTypes } from '../../store/actions';
import { getBoardDimensions } from '../../store/selectors';
import { IAppState } from '../../store/reducer';
import { Dispatch } from 'react';
import { XYCoord, ClickType } from '../../store/models';

interface IStateProps {
  dimensions: { width: number, height: number };
}

interface IDispatchProps {
  clickTile: (coord: XYCoord, clickType: ClickType) => void;
}

export type GameBoardContainerProps = IStateProps & IDispatchProps;

const mapStateToProps = (state: IAppState): IStateProps => ({
  dimensions: getBoardDimensions(state)
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>): IDispatchProps => ({
  clickTile: (coord, clickType) => dispatch(clickTile(coord, clickType))
})

export default connect(mapStateToProps, mapDispatchToProps);