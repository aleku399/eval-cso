import { storiesOf } from "@storybook/react";
import React from "react";
import withReduxProvider from "../../../storybook/provider";
import UpdateClaimTypesContainer from "./";

storiesOf("containers/UpdateClaimTypesContainer", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <UpdateClaimTypesContainer />);
