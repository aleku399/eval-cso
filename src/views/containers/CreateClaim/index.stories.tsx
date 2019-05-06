import { storiesOf } from "@storybook/react";
import React from "react";
import CreateClaim from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("containers/CreateClaim", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <CreateClaim />);
