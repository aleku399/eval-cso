import { storiesOf } from "@storybook/react";
import React from "react";
import ClaimsData from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("containers/ClaimsData", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <ClaimsData />);
