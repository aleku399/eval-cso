import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import LoginForm from "./index";

storiesOf("components/Login", module).add("LoginForm", () => (
  <LoginForm onSubmit={action("submit")} loading={false} />
));
