import { storiesOf } from "@storybook/react";
import React from "react";
import { ADMIN, AGENT, EVALUATOR } from "../UserProfile";
import UserTable from "./index";

storiesOf("components/UserTable", module).add("default", () => (
  <UserTable users={data} />
));

const data = [
  {
    userName: "mary",
    role: AGENT,
    fullName: "Mary Jane",
    email: "mary@gmail.com"
  },
  {
    userName: "aleku399",
    role: ADMIN,
    fullName: "Alex Ssentongo",
    email: "aleku@gmail.com"
  },
  {
    userName: "John",
    role: EVALUATOR,
    fullName: "John Doe",
    email: "johjn@gmail.com"
  }
];
