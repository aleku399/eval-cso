import { storiesOf } from "@storybook/react";
import React from "react";
import NpsData from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("containers/NpsData", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <NpsData />);
