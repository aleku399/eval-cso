import { storiesOf } from "@storybook/react";
import React from "react";
import Claim from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("Templates/Claim", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <Claim />);
