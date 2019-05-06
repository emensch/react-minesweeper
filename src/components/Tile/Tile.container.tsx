import { connect } from "react-redux";
import { IAppState } from "../../store/reducer";
import { getTileState } from "../../store/selectors";
import { Dispatch } from "react";
import { clickTile, ActionTypes } from "../../store/actions";
import { XYCoord, ITileState, ClickType } from "../../store/models";

interface IStateProps {
  tileState: ITileState | null;
}

interface IDispatchProps {
  onClick: (clickType: ClickType) => void;
}

interface IOwnProps {
  coord: XYCoord
}

export type TileContainerProps = IStateProps & IDispatchProps & IOwnProps;

const mapStateToProps = (state: IAppState, ownProps: IOwnProps): IStateProps => ({
  tileState: getTileState(state, ownProps.coord)
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>, ownProps: IOwnProps): IDispatchProps => ({
  onClick: (clickType) => dispatch(clickTile(ownProps.coord, clickType))
});

export default connect(mapStateToProps, mapDispatchToProps);