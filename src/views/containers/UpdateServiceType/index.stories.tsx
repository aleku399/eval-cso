import { storiesOf } from "@storybook/react";
import React from "react";
import withReduxProvider from "../../../storybook/provider";
import UpdateServiceContainer from "./";

storiesOf("containers/UpdateServiceContainer", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <UpdateServiceContainer />);
