import { storiesOf } from "@storybook/react";
import React from "react";
import EvaluationDataView from ".";
import withReduxProvider from "../../../storybook/provider";

storiesOf("containers/EvaluationData", module)
  .addDecorator(withReduxProvider)
  .add("default", () => <EvaluationDataView />);
