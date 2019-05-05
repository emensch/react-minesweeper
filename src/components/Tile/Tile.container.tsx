import { connect } from "react-redux";
import { IAppState } from "../../store/reducer";
import { getTileState } from "../../store/selectors";
import { Dispatch } from "react";
import { clickTile, ActionTypes } from "../../store/actions";
import { ITileState } from "../../services/gameBoardService";
import { XYCoord } from "../../store/models";

interface IStateProps {
  tileState: ITileState | null;
}

interface IDispatchProps {
  onClick: () => void;
}

interface IOwnProps {
  coord: XYCoord
}

export type TileContainerProps = IStateProps & IDispatchProps & IOwnProps;

const mapStateToProps = (state: IAppState, ownProps: IOwnProps): IStateProps => ({
  tileState: getTileState(state, ownProps.coord)
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>, ownProps: IOwnProps): IDispatchProps => ({
  onClick: () => dispatch(clickTile(ownProps.coord))
});

export default connect(mapStateToProps, mapDispatchToProps);