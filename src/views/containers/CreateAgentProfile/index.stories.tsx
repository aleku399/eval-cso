import { storiesOf } from "@storybook/react";
import React from "react";
import withReduxProvider from "../../../storybook/provider";
import CreateAgentProfile from "./";

storiesOf("containers/CreateAgentProfile", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <CreateAgentProfile />);
