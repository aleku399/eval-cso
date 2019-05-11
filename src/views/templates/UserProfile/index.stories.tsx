import { storiesOf } from "@storybook/react";
import React from "react";
import UserProfile from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("Templates/UserProfile", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <UserProfile userName="admin" />);
