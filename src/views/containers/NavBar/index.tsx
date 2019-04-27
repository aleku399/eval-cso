import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../../redux/reducers";
import {
  changeServiceView,
  ChangeServiceViewFn
} from "../../../redux/services/actions";
import NavMenu, {
  horizontal,
  SetActiveMenuItem
} from "../../components/NavMenu";

const items = [
  { name: "Evaluate", id: "enter-score" },
  { name: "Data", id: "data-view" },
  { name: "Summary", id: "summary" }
];

interface Props {
  setActiveMenuItem: SetActiveMenuItem;
  activeItem: string;
}

function NavbarMenu(props: Props) {
  return <NavMenu {...props} items={items} alignment={horizontal} widths={3} />;
}

const mapStateToProps = ({ service: { serviceView } }: AppState) => ({
  activeItem: serviceView
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
)(NavbarMenu);
