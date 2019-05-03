import { storiesOf } from "@storybook/react";
import React from "react";
import UserSidebar from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("containers/UserSidebar", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <UserSidebar />);
