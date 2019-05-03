import { storiesOf } from "@storybook/react";
import React from "react";
import EditService from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("Templates/EditService", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <EditService />);
