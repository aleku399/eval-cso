import { storiesOf } from "@storybook/react";
import React from "react";
import SummaryView from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("Templates/SummaryView", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <SummaryView />);
