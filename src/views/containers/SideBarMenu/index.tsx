import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../../redux";
import {
  changeService,
  ChangeServiceFn
} from "../../../redux/services/actions";
import NavMenu, { SetActiveMenuItem, vertical } from "../../components/NavMenu";

const items = [
  { name: "Call", id: "call" },
  { name: "SMS", id: "sms" },
  { name: "Email", id: "email" },
  { name: "Claims", id: "claims" }
];

interface Props {
  setActiveMenuItem: SetActiveMenuItem;
  activeItem: string;
}

function SideBarMenu(props: Props) {
  return (
    <div>
      <h4>Menu</h4>
      <NavMenu {...props} items={items} alignment={vertical} />
    </div>
  );
}

const mapStateToProps = ({ service }: AppState) => ({ activeItem: service });

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  setActiveMenuItem: bindActionCreators<AnyAction, ChangeServiceFn>(
    changeService,
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarMenu);
