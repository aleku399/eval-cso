import { storiesOf } from "@storybook/react";
import React from "react";
import Signup from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("Templates/Signup", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <Signup />);
