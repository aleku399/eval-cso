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
import { ADMIN, EVALUATOR, Profile } from "../../components/UserProfile";
import { isMinorService } from "../NavBar";

interface Props {
  setActiveMenuItem: SetActiveMenuItem;
  user: Profile;
  activeItem: string;
}

const setActiveAndRoute = (user: Profile, setService: SetActiveMenuItem) => (
  item: Services
) => {
  setService(item);

  const basePath = isMinorService(item) ? `/${item}/` : "/";

  const routePath =
    user.role === ADMIN || user.role === EVALUATOR
      ? basePath
      : `${basePath}data`;
  Router.pushRoute(routePath);
};

function ServicesMenu(props: Props) {
  return (
    <NavMenu
      activeItem={props.activeItem}
      setActiveMenuItem={setActiveAndRoute(props.user, props.setActiveMenuItem)}
      items={serviceMenuItems}
      header="Services"
      alignment={vertical}
    />
  );
}

const mapStateToProps = ({ service, login }: AppState) => ({
  activeItem: service.active,
  user: login.profile
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
