import React from "react";
import { connect } from "react-redux";
import useLocation from "react-use/lib/useLocation";
import { SemanticWIDTHS } from "semantic-ui-react";
import { Link, Router } from "../../../../server/routes";
import { Services } from "../../../lib/serviceData";
import { AppState } from "../../../redux/reducers";
import NavMenu, { horizontal, MenuItem } from "../../components/NavMenu";
import {
  ADMIN,
  AGENT,
  EVALUATOR,
  Profile,
  Role
} from "../../components/UserProfile";

const defaultMenu = [
  { name: "Data", id: "data" },
  { name: "Summary", id: "summary" }
];

interface Props {
  user: Profile;
  service: Services;
}

type MenuItemValue = "data" | "summary" | "evaluation";

const evaluation: MenuItemValue = "evaluation";
const claim: Services = "claim";
const nps: Services = "nps";

export const isMinorService = (activeService: Services): boolean => {
  return activeService === claim || activeService === nps;
};

const getRoutePath = (activeService: Services, item: string) => {
  if (item === evaluation) {
    return isMinorService(activeService) ? `/${activeService}` : "/";
  }
  return isMinorService(activeService)
    ? `/${activeService}/${item}`
    : `/${item}`;
};

const setActiveMenuItem = (activeService: Services) => (item: string) => {
  const path = getRoutePath(activeService, item);
  Router.pushRoute(path);
};

function adminMenuItem(activeService: Services): MenuItem {
  return activeService === claim
    ? { name: "ClaimTypes", id: "types" }
    : { name: "Parameters", id: "service" };
}

function useSetService(
  service: Services,
  role: Role
): { service: Services; item: MenuItemValue } {
  const location = useLocation();
  const defaultItem =
    role === EVALUATOR || role === ADMIN ? evaluation : "data";
  if (!location.hostname) {
    return { service, item: defaultItem };
  }
  const pathName = location && location.pathname.substring(1);
  const derivedService = pathName && pathName.includes(claim) ? claim : service;
  const item = derivedService === claim ? pathName.split("-")[1] : pathName;
  return { service: derivedService as Services, item: item as MenuItemValue };
}

function NavbarMenu(props: Props) {
  const { user } = props;
  const role: Role = (user && user.role) || AGENT;

  const { service, item } = useSetService(props.service, role);

  const loggedInMenu: MenuItem[] =
    role === EVALUATOR || role === ADMIN
      ? [{ name: "Evaluation", id: evaluation }, ...defaultMenu]
      : defaultMenu;

  const items: MenuItem[] =
    role === ADMIN && service !== nps
      ? [...loggedInMenu, adminMenuItem(service)]
      : loggedInMenu;

  const widths = items.length as SemanticWIDTHS;
  return (
    <div>
      {user ? (
        <NavMenu
          activeItem={item}
          setActiveMenuItem={setActiveMenuItem(service)}
          items={items}
          alignment={horizontal}
          widths={widths}
        />
      ) : (
        <Link route="/signup">
          <a>Create an Account to Access Features</a>
        </Link>
      )}
    </div>
  );
}

const mapStateToProps = ({
  login: { profile },
  service: { active }
}: AppState) => ({
  service: active,
  user: profile
});

export default connect(mapStateToProps)(NavbarMenu);
