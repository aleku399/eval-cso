import { storiesOf } from "@storybook/react";
import React from "react";
import Nps from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("Templates/Nps", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <Nps />);
