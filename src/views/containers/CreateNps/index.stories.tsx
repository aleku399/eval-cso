import { storiesOf } from "@storybook/react";
import React from "react";
import CreateNps from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("containers/CreateNps", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <CreateNps />);
