import { storiesOf } from "@storybook/react";
import React from "react";
import ClaimsSummary from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("containers/ClaimsSummary", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <ClaimsSummary />);
