import Link from "next/link";
import Router from "next/router";
import React from "react";
import { connect } from "react-redux";
import { SemanticWIDTHS } from "semantic-ui-react";
import { AppState } from "../../../redux/reducers";
import NavMenu, { horizontal } from "../../components/NavMenu";
import { ADMIN, AGENT, Profile } from "../../components/UserProfile";

const defaultMenu = [
  { name: "Data", id: "data" },
  { name: "Summary", id: "summary" }
];

interface Props {
  user: Profile;
}

function setActiveMenuItem(item: string) {
  Router.push(`/${item}`);
}

function NavbarMenu(props: Props) {
  const { user } = props;
  const role = user && user.role;
  const loggedInMenu =
    role !== AGENT
      ? [{ name: "Evaluation", id: "evaluation" }, ...defaultMenu]
      : defaultMenu;
  const items =
    role === ADMIN
      ? [...loggedInMenu, { name: "Service", id: "service" }]
      : loggedInMenu;
  const widths = items.length as SemanticWIDTHS;
  return (
    <div>
      {user ? (
        <NavMenu
          activeItem="evaluation"
          setActiveMenuItem={setActiveMenuItem}
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

const mapStateToProps = ({ login: { profile } }: AppState) => ({
  user: profile
});

export default connect(mapStateToProps)(NavbarMenu);
