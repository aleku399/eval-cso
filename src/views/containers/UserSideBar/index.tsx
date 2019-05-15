import React from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { Router } from "../../../../server/routes";
import { logoutUser } from "../../../redux/login/action";
import { AppState } from "../../../redux/reducers";
import NavMenu, { MenuItem, vertical } from "../../components/NavMenu";
import { AGENT, Profile, Role } from "../../components/UserProfile";

const nonLoggedInMenu = [
  { name: "Signup", id: "signup" },
  { name: "login", id: "login" }
];

const loggedInMenu = [
  { name: "User List", id: "users" },
  { name: "Create Agent", id: "agent" }
];

interface Props {
  user: Profile;
  onLoginRoute: () => void;
}

const setMenuItems = (role?: Role, userName?: string): MenuItem[] => {
  if (!role) {
    return nonLoggedInMenu;
  }

  const editProfile = [
    { name: "Update Profile", id: `user/${userName}` },
    { name: "Sign out", id: "login" }
  ];

  if (role !== AGENT) {
    return [...editProfile, ...loggedInMenu];
  }

  if (role === AGENT) {
    return [...editProfile];
  }
};

const setActiveMenuItem = (onLoginRoute: () => void) => (item: string) => {
  if (item === "login") {
    onLoginRoute();
  }
  Router.pushRoute(`/${item}`);
};

function UserSideBar(props: Props) {
  const userName = props.user && props.user.userName;
  const role = props.user && props.user.role;

  const items = setMenuItems(role as Role, userName);

  return (
    <NavMenu
      setActiveMenuItem={setActiveMenuItem(props.onLoginRoute)}
      items={items}
      header="Users"
      alignment={vertical}
    />
  );
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  onLoginRoute: logoutUser(dispatch)
});

const mapStateToProps = ({ login }: AppState) => ({
  user: login.profile
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSideBar);
