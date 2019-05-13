import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { loggedInEvaluator, users } from "../UserProfile/index.stories";
import ClaimsTable from "./index";

export const claimsTestData = [
  {
    date: "2019-04-17",
    evaluator: "alex",
    agentName: "thanos",
    reason: "BALANCE REQUEST",
    comment:
      "use the APP, did not probe enough to find out why the score was failing to use the",
    claimType: "cvt",
    details: "details",
    score: 40,
    workflowNumber: 10,
    branch: "Kampala",
    supervisor: "bob",
    id: 10
  },
  {
    date: "2019-04-13",
    evaluator: "simon",
    agentName: "thanos",
    reason: "BALANCE REQUEST",
    comment: `Acknowledge the score, you should have verified to
       confirm the score details, failed to apologize for failure to
       use the APP, did not probe enough to find out why the score was failing to use the APP`,
    workflowNumber: 30,
    branch: "Kampala",
    details: "details",
    score: 10,
    supervisor: "bob",
    claimType: "cvt",
    id: 20
  },
  {
    date: "2019-04-17",
    evaluator: "aleku399",
    agentName: "thanos",
    branch: "Kampala",
    details: "details",
    reason: "BALANCE REQUEST",
    score: 120,
    comment: "comment",
    workflowNumber: 30,
    supervisor: "steve",
    claimType: "cvt",
    id: 30
  }
];

storiesOf("components/ClaimsTable", module).add("default", () => (
  <ClaimsTable
    data={claimsTestData}
    users={users}
    deleteHandler={action("delete")}
    loggedIn={loggedInEvaluator}
  />
));
