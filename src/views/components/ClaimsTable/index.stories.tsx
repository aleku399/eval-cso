import { storiesOf } from "@storybook/react";
import React from "react";
import {
  agent,
  agentB,
  agentC,
  loggedInEvaluator
} from "../UserProfile/index.stories";
import ClaimsTable from "./index";

const users = [agentB, agent, agentC, loggedInEvaluator];

const testData = [
  {
    date: "2016-05-17",
    evaluator: "alex",
    agentName: "thanos",
    reason: "BALANCE REQUEST",
    comment: `Acknowledge the score, you should have verified to
    confirm the score details, failed to apologize for failure to
    use the APP, did not probe enough to find out why the score was failing to use the APP`,
    claimType: "cvt",
    score: 40,
    workflowNumber: 10
  },
  {
    date: "2017-04-13",
    evaluator: "simon",
    agentName: "thanos",
    reason: "BALANCE REQUEST",
    comment: `Acknowledge the score, you should have verified to
       confirm the score details, failed to apologize for failure to
       use the APP, did not probe enough to find out why the score was failing to use the APP`,
    workflowNumber: 30,
    score: 10,
    claimType: "cvt"
  },
  {
    date: "2016-05-17",
    evaluator: "aleku399",
    agentName: "thanos",
    reason: "BALANCE REQUEST",
    score: 120,
    comment: "comment",
    workflowNumber: 30,
    claimType: "cvt"
  }
];

storiesOf("components/ClaimsTable", module).add("default", () => (
  <ClaimsTable data={testData} users={users} loggedIn={loggedInEvaluator} />
));
