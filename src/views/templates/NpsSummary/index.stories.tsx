import { storiesOf } from "@storybook/react";
import React from "react";
import NpsSummary from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("Templates/NpsSummary", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <NpsSummary />);
