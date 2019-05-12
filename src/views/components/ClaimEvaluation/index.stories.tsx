import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import {
  adminProfileA,
  agent,
  agentB,
  loggedInEvaluator
} from "../UserProfile/index.stories";
import ClaimEvaluation from "./index";

const props = {
  loading: false,
  agents: [agent, agentB],
  claimTypes: [{ name: "CVC", value: "cvc" }],
  evaluator: loggedInEvaluator,
  reasons: ["claim reason", "other"]
};

const adminProps = { ...props, evaluator: adminProfileA };

storiesOf("components/ClaimEvaluation", module)
  .add("With Evaluator", () => (
    <ClaimEvaluation {...props} onSubmit={action("submit")} />
  ))
  .add("With Admin", () => (
    <ClaimEvaluation {...adminProps} onSubmit={action("submit")} />
  ));
