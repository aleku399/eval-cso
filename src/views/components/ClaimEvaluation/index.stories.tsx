import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { agent, agentB } from "../UserProfile/index.stories";
import ClaimEvaluation from "./index";

const props = {
  loading: false,
  agents: [agent, agentB],
  claimTypes: [{ name: "CVC", value: "cvc" }],
  evaluator: "username"
};

storiesOf("components/ClaimEvaluation", module).add(
  "EnterClaimsEvaluation",
  () => <ClaimEvaluation {...props} onSubmit={action("submit")} />
);
