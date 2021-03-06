import { storiesOf } from "@storybook/react";
import React from "react";
import UserList from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("containers/UserList", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <UserList />);
