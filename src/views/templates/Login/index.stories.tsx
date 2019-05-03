import { storiesOf } from "@storybook/react";
import React from "react";
import Login from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("Templates/Login", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <Login />);
