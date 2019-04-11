import { storiesOf } from "@storybook/react";
import React from "react";
import Services from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("Templates/Service", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <Services />);
