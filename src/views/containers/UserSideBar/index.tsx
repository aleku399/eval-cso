import React from "react";
import { connect } from "react-redux";
import { Router } from "../../../../server/routes";
import { AppState } from "../../../redux/reducers";
import NavMenu, { MenuItem, vertical } from "../../components/NavMenu";
import { AGENT, Profile, Role } from "../../components/UserProfile";

const nonLoggedInMenu = [
  { name: "Signup", id: "signup" },
  { name: "login", id: "login" }
];

const loggedInMenu = [
  { name: "Sign out", id: "login" },
  { name: "User List", id: "users" },
  { name: "Create Agent", id: "agent" }
];

interface Props {
  user: Profile;
}

const setMenuItems = (role?: Role, userName?: string): MenuItem[] => {
  if (!role) {
    return nonLoggedInMenu;
  }

  const editProfile = { name: "Update Profile", id: `user/${userName}` };

  if (role !== AGENT) {
    return [editProfile, ...loggedInMenu];
  }

  if (role === AGENT) {
    return [editProfile];
  }
};

function setActiveMenuItem(item: string) {
  if (item === "login") {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
  }
  Router.pushRoute(`/${item}`);
}

function UserSideBar(props: Props) {
  const userName = props.user && props.user.userName;
  const role = props.user && props.user.role;

  const items = setMenuItems(role as Role, userName);

  return (
    <NavMenu
      setActiveMenuItem={setActiveMenuItem}
      items={items}
      header="Users"
      alignment={vertical}
    />
  );
}

const mapStateToProps = ({ service, login }: AppState) => ({
  activeItem: service.active,
  user: login.profile
});

export default connect(mapStateToProps)(UserSideBar);
