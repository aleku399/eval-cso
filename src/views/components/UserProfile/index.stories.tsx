import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import UserProfile from "./index";

const roleOptions = [
  { text: "Admin", key: "admin", value: "Admin" },
  { text: "Evaluator", key: "evaluator", value: "Evaluator" },
  { text: "Supervisor", key: "supervisor", value: "Supervisor" },
  { text: "Agent", key: "agent", value: "Agent" }
];

const profile = {
  userName: "",
  email: "",
  password: "",
  role: "Agent",
  fullName: "",
  agent: {
    services: "",
    branch: "",
    supervisor: ""
  }
};

const agent = {
  userName: "Thanos",
  email: "thanos_titan@gmail.com",
  password: "saturn",
  fullName: "Thanos",
  role: "Agent",
  agent: {
    services: "call",
    branch: "Jinja",
    supervisor: "Gomora"
  }
};

const admin = {
  userName: "Steve Rogers",
  role: "Admin"
};

const adminProfile = {
  userName: "Star Lord",
  fullName: "Star Lord",
  email: "spartoi@missouri.com",
  password: "missouri",
  role: "Admin"
};

const LoggedIn = {
  userName: "aleku399",
  role: "Evaluator"
};

const LoggedInEvaluator = {
  userName: "aleku399",
  fullName: "Alex Ssentongo",
  email: "aleku399@gmail.com",
  password: "ftytuioftyu",
  role: "Evaluator"
};

const options = [
  { text: "John", key: "j", value: "John" },
  { text: "Logan", key: "L", value: "Logan" }
];

const serviceOptions = [
  { text: "Email", key: "e", value: "Email" },
  { text: "call", key: "c", value: "Call" },
  { text: "sms", key: "s", value: "sms" }
];

const branches = [
  { text: "Nakawa", key: "N", value: "Nakawa" },
  { text: "Jinja", key: "j", value: "Jinja" },
  { text: "Luzira", key: "L", value: "Luzira" }
];

storiesOf("components/Profile", module).add(
  "Evaluator editing own Profile",
  () => (
    <UserProfile
      roleOptions={roleOptions}
      autoFocus={true}
      onSubmit={action("profile")}
      editUser={LoggedInEvaluator}
      loggedInUser={LoggedIn}
      options={options}
      serviceOptions={serviceOptions}
      branches={branches}
      search={true}
      selection={true}
      deleteUserHandler={action("delete Agent")}
    />
  )
);

storiesOf("components/Profile", module).add(
  "Evaluator editing Agent Profile",
  () => (
    <UserProfile
      roleOptions={roleOptions}
      autoFocus={true}
      onSubmit={action("profile")}
      editUser={agent}
      loggedInUser={LoggedIn}
      options={options}
      serviceOptions={serviceOptions}
      branches={branches}
      search={true}
      selection={true}
      deleteUserHandler={action("delete Agent")}
    />
  )
);

storiesOf("components/Profile", module).add(
  "Admin editing Agent Profile",
  () => (
    <UserProfile
      roleOptions={roleOptions}
      autoFocus={true}
      onSubmit={action("profile")}
      editUser={agent}
      loggedInUser={admin}
      options={options}
      serviceOptions={serviceOptions}
      branches={branches}
      search={true}
      selection={true}
      deleteUserHandler={action("delete Agent")}
    />
  )
);

storiesOf("components/Profile", module).add(
  "Admin creating Agent Profile",
  () => (
    <UserProfile
      roleOptions={roleOptions}
      autoFocus={true}
      onSubmit={action("profile")}
      editUser={profile}
      loggedInUser={admin}
      options={options}
      serviceOptions={serviceOptions}
      branches={branches}
      search={true}
      selection={true}
      deleteUserHandler={action("delete Agent")}
    />
  )
);

storiesOf("components/Profile", module).add(
  "Admin editing another admins",
  () => (
    <UserProfile
      roleOptions={roleOptions}
      autoFocus={true}
      onSubmit={action("profile")}
      editUser={adminProfile}
      loggedInUser={admin}
      options={options}
      serviceOptions={serviceOptions}
      branches={branches}
      search={true}
      selection={true}
      deleteUserHandler={action("delete Agent")}
    />
  )
);

storiesOf("components/Profile", module).add(
  "Admin editing another Evaluator",
  () => (
    <UserProfile
      roleOptions={roleOptions}
      autoFocus={true}
      onSubmit={action("profile")}
      editUser={LoggedInEvaluator}
      loggedInUser={admin}
      options={options}
      serviceOptions={serviceOptions}
      branches={branches}
      search={true}
      selection={true}
      deleteUserHandler={action("delete Agent")}
    />
  )
);

storiesOf("components/Profile", module).add(
  "Agent editing Agent Profile",
  () => (
    <UserProfile
      roleOptions={roleOptions}
      autoFocus={true}
      onSubmit={action("profile")}
      editUser={agent}
      loggedInUser={agent}
      options={options}
      serviceOptions={serviceOptions}
      branches={branches}
      search={true}
      selection={true}
      deleteUserHandler={action("delete Agent")}
    />
  )
);
