import { storiesOf } from "@storybook/react";
import React from "react";
import Home from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("Templates/Home", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <Home />);
