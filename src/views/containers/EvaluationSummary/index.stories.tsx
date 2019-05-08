import { storiesOf } from "@storybook/react";
import React from "react";
import EvaluationSummary from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("containers/EvaluationSummary", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <EvaluationSummary />);
