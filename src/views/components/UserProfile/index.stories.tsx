import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import UserProfile, {
  ADMIN,
  Agent,
  AGENT,
  EVALUATOR,
  Profile,
  SUPERVISOR
} from "./index";

const agentProfile: Agent = {
  branch: "Jinja",
  supervisor: "steve"
};

export const agent: Profile = {
  userName: "simon",
  email: "simon@gmail.com",
  fullName: "Simon Marlow",
  role: AGENT
};

export const agentB: Profile = {
  userName: "alex",
  email: "thanos_titan@gmail.com",
  fullName: "Alex",
  role: EVALUATOR
};

export const agentC: Profile = {
  userName: "thanos",
  email: "thanos_titan@gmail.com",
  fullName: "Thanos Avengers",
  role: AGENT
};

const emptyAgent = {
  userName: "",
  fullName: "",
  role: AGENT,
  email: ""
};

export const adminProfileA = {
  userName: "steve",
  role: ADMIN,
  fullName: "Steve Rogers",
  email: "email@gmail.com"
};

const adminProfileB: Profile = {
  userName: "Star",
  fullName: "Star Lord",
  email: "spartoi@missouri.com",
  role: ADMIN
};

const supervisors = [{ ...adminProfileA, role: SUPERVISOR }];

export const loggedInEvaluator: Profile = {
  userName: "aleku399",
  fullName: "Alex Ssentongo",
  email: "aleku399@gmail.com",
  role: EVALUATOR
};

const branches = ["Nakawa", "Jinja", "Luzira"];

storiesOf("components/Profile", module).add(
  "Evaluator editing own Profile",
  () => (
    <UserProfile
      onSubmit={action("profile")}
      editUser={loggedInEvaluator}
      loggedInUser={loggedInEvaluator}
      branches={branches}
      supervisors={supervisors}
      deleteUserHandler={action("delete Agent")}
    />
  )
);

storiesOf("components/Profile", module).add(
  "Evaluator editing Agent Profile",
  () => (
    <UserProfile
      supervisors={supervisors}
      agent={agentProfile}
      onSubmit={action("profile")}
      editUser={agent}
      loggedInUser={loggedInEvaluator}
      branches={branches}
      deleteUserHandler={action("delete Agent")}
    />
  )
);

storiesOf("components/Profile", module).add(
  "Admin editing Agent Profile",
  () => (
    <UserProfile
      supervisors={supervisors}
      onSubmit={action("profile")}
      agent={agentProfile}
      editUser={agent}
      loggedInUser={adminProfileA}
      branches={branches}
      deleteUserHandler={action("delete Agent")}
    />
  )
);

storiesOf("components/Profile", module).add(
  "Admin editing another admin",
  () => (
    <UserProfile
      onSubmit={action("profile")}
      editUser={adminProfileB}
      loggedInUser={adminProfileA}
      branches={branches}
      supervisors={supervisors}
      deleteUserHandler={action("delete Agent")}
    />
  )
);

storiesOf("components/Profile", module).add(
  "Admin editing another Evaluator",
  () => (
    <UserProfile
      onSubmit={action("profile")}
      editUser={loggedInEvaluator}
      loggedInUser={adminProfileA}
      branches={branches}
      supervisors={supervisors}
      deleteUserHandler={action("delete Agent")}
    />
  )
);

storiesOf("components/Profile", module).add("Admin creating Agent", () => (
  <UserProfile
    onSubmit={action("profile")}
    editUser={emptyAgent}
    loggedInUser={adminProfileA}
    branches={branches}
    supervisors={supervisors}
    deleteUserHandler={action("delete Agent")}
  />
));

storiesOf("components/Profile", module).add(
  "Agent editing Agent Profile",
  () => (
    <UserProfile
      onSubmit={action("profile")}
      agent={agentProfile}
      editUser={agent}
      loggedInUser={agent}
      branches={branches}
      supervisors={supervisors}
      deleteUserHandler={action("delete Agent")}
    />
  )
);
