import React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { Router } from "../../../../server/routes";
import { serviceMenuItems, Services } from "../../../lib/serviceData";
import { AppState } from "../../../redux/reducers";
import {
  changeService,
  ChangeServiceFn
} from "../../../redux/services/actions";
import NavMenu, { SetActiveMenuItem, vertical } from "../../components/NavMenu";
import { isMinorService } from "../NavBar";

interface Props {
  setActiveMenuItem: SetActiveMenuItem;
  activeItem: string;
}

const setActiveAndRoute = (setService: SetActiveMenuItem) => (
  item: Services
) => {
  setService(item);
  return isMinorService(item)
    ? Router.pushRoute(`/${item}`)
    : Router.pushRoute("/");
};

function ServicesMenu(props: Props) {
  return (
    <NavMenu
      activeItem={props.activeItem}
      setActiveMenuItem={setActiveAndRoute(props.setActiveMenuItem)}
      items={serviceMenuItems}
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
