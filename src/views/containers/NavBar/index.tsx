import Link from "next/link";
import Router from "next/router";
import React from "react";
import { connect } from "react-redux";
import useLocation from "react-use/lib/useLocation";
import { SemanticWIDTHS } from "semantic-ui-react";
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
  service: string;
}

const evaluation: string = "evaluation";
const claim: string = "claim";

const getRoutePath = (activeService: string, item: string) => {
  if (item === evaluation) {
    return activeService === claim ? `/${claim}` : "/";
  }
  return activeService === claim ? `/${claim}-${item}` : `/${item}`;
};

const setActiveMenuItem = (activeService: string) => (item: string) => {
  const path = getRoutePath(activeService, item);
  Router.push(path);
};

function adminMenuItem(activeService: string): MenuItem {
  return activeService === claim
    ? { name: "ClaimTypes", id: "types" }
    : { name: "Parameters", id: "service" };
}

function useSetService(
  service: string,
  role: Role
): { service: string; item: string } {
  const location = useLocation();
  const defaultItem =
    role === EVALUATOR || role === ADMIN ? evaluation : "data";
  if (!location.hostname) {
    return { service, item: defaultItem };
  }
  const pathName = location && location.pathname.substring(1);
  const derivedService = pathName && pathName.includes(claim) ? claim : service;
  const item = derivedService === claim ? pathName.split("-")[1] : pathName;
  return { service: derivedService, item };
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
    role === ADMIN ? [...loggedInMenu, adminMenuItem(service)] : loggedInMenu;

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
        <Link href="/signup">
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
