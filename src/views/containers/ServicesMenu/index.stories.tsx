import { storiesOf } from "@storybook/react";
import React from "react";
import ServicesMenu from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("containers/ServicesMenu", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <ServicesMenu />);
