import { storiesOf } from "@storybook/react";
import React from "react";
import withReduxProvider from "../../../storybook/provider";
import UpdateUserProfile from "./";

storiesOf("containers/UpdateUserProfile", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <UpdateUserProfile userName="admin" />);
