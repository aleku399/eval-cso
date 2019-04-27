import { storiesOf } from "@storybook/react";
import React from "react";
import UserTable from "./index";

storiesOf("components/UserTable", module).add("default", () => (
  <UserTable users={data} />
));

const data = [
  {
    userName: "mary",
    role: "Agent",
    fullName: "Mary Jane"
  },
  {
    userName: "aleku399",
    role: "Admin",
    fullName: "Alex Ssentongo"
  },
  {
    userName: "John",
    role: "Evaluator",
    fullName: "John Doe"
  }
];
