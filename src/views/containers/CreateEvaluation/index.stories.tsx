import { storiesOf } from "@storybook/react";
import React from "react";
import CreateEvaluation from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("containers/CreateEvaluation", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <CreateEvaluation />);
