import Router from "next/router";
import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../../redux/reducers";
import {
  changeService,
  ChangeServiceFn
} from "../../../redux/services/actions";
import NavMenu, { SetActiveMenuItem, vertical } from "../../components/NavMenu";

const items = [
  { name: "Call", id: "call" },
  { name: "SMS", id: "sms" },
  { name: "Email", id: "email" },
  { name: "Whatsapp", id: "whatsapp" },
  { name: "Web", id: "web" },
  { name: "Claim", id: "claim" }
];

interface Props {
  setActiveMenuItem: SetActiveMenuItem;
  activeItem: string;
}

const setActiveAndRoute = (setService: SetActiveMenuItem) => (item: string) => {
  setService(item);
  return item === "claim" ? Router.push("/claim") : Router.push("/");
};

function ServicesMenu(props: Props) {
  return (
    <NavMenu
      activeItem={props.activeItem}
      setActiveMenuItem={setActiveAndRoute(props.setActiveMenuItem)}
      items={items}
      header="Services"
      alignment={vertical}
    />
  );
}

const mapStateToProps = ({ service }: AppState) => ({
  activeItem: service.active
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  setActiveMenuItem: bindActionCreators<AnyAction, ChangeServiceFn>(
    changeService,
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesMenu);
