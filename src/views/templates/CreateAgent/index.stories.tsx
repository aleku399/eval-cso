import { storiesOf } from "@storybook/react";
import React from "react";
import CreateAgent from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("Templates/CreateAgent", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <CreateAgent />);
