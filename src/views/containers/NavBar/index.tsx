import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../../redux";
import {
  changeServiceView,
  ChangeServiceViewFn
} from "../../../redux/services/actions";
import NavMenu, {
  horizontal,
  SetActiveMenuItem
} from "../../components/NavMenu";

const items = [
  { name: "Enter Service Score", id: "enter-score" },
  { name: "Data", id: "data-view" },
  { name: "Summary", id: "summary" }
];

interface Props {
  setActiveMenuItem: SetActiveMenuItem;
  activeItem: string;
}

function SideBarMenu(props: Props) {
  return (
    <div>
      <NavMenu {...props} items={items} alignment={horizontal} />
    </div>
  );
}

const mapStateToProps = ({ qualityView }: AppState) => ({
  activeItem: qualityView
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  setActiveMenuItem: bindActionCreators<AnyAction, ChangeServiceViewFn>(
    changeServiceView,
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarMenu);
