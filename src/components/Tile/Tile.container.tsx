import { connect } from "react-redux";
import { ITileState, IAppState } from "../../store/reducer";
import { getTileState } from "../../store/selectors";
import { Dispatch } from "react";
import { clickTile, ActionTypes } from "../../store/actions";

interface IStateProps {
  tileState: ITileState | null;
}

interface IDispatchProps {
  onClick: () => void;
}

interface IOwnProps {
  x: number,
  y: number
}

export type TileContainerProps = IStateProps & IDispatchProps & IOwnProps;

const mapStateToProps = (state: IAppState, ownProps: IOwnProps): IStateProps => ({
  tileState: getTileState(state, ownProps.x, ownProps.y)
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>, ownProps: IOwnProps): IDispatchProps => ({
  onClick: () => dispatch(clickTile(ownProps.x, ownProps.y))
});

export default connect(mapStateToProps, mapDispatchToProps);