import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import ClaimEvaluation from "./index";

const props = {
  loading: false,
  agents: ["brian", "Alex", "Simon"],
  claimTypes: ["introduction", "resolution", "handling"],
  evaluator: "username"
};
storiesOf("components/ClaimEvaluation", module).add(
  "EnterClaimsEvaluation",
  () => <ClaimEvaluation {...props} onSubmit={action("submit")} />
);
