import { storiesOf } from "@storybook/react";
import React from "react";
import SummaryView from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("Templates/DataView", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <SummaryView />);
