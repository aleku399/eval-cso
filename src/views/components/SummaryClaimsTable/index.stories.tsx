import { storiesOf } from "@storybook/react";
import React from "react";
import {
  agent,
  agentB,
  agentC,
  loggedInEvaluator
} from "../UserProfile/index.stories";
import SummaryClaimsTable from "./index";

const users = [agentB, agent, agentC, loggedInEvaluator];

const testData = [
  {
    date: "2019-01-17",
    evaluator: "alex",
    agentName: "thanos",
    reason: "BALANCE REQUEST",
    comment: `Acknowledge the score, you should have verified to
    confirm the score details, failed to apologize for failure to
    use the APP, did not probe enough to find out why the score was failing to use the APP`,
    claimType: "CVT",
    score: 100,
    workflowNumber: 10
  },
  {
    date: "2019-02-13",
    evaluator: "simon",
    agentName: "alex",
    reason: "BALANCE REQUEST",
    comment: `Acknowledge the score, you should have verified to
       confirm the score details, failed to apologize for failure to
       use the APP, did not probe enough to find out why the score was failing to use the APP`,
    workflowNumber: 30,
    score: 0,
    claimType: "TVC"
  },
  {
    date: "2019-03-17",
    evaluator: "aleku399",
    agentName: "thanos",
    reason: "BALANCE REQUEST",
    score: 100,
    comment: "comment",
    workflowNumber: 30,
    claimType: "JK"
  }
];

storiesOf("components/SummaryClaimsTable", module).add("default", () => (
  <SummaryClaimsTable
    data={testData}
    users={users}
    loggedIn={loggedInEvaluator}
  />
));
