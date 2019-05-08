import { storiesOf } from "@storybook/react";
import React from "react";
import EvaluationDataTable from ".";
import { deviation, zeroRated } from "../EvaluationForm";
import { loggedInEvaluator, users } from "../UserProfile/index.stories";

export const evalTestData = [
  {
    evalAttrs: {
      date: "2019-04-17",
      evaluator: "alex",
      agentName: "thanos",
      comment: "Acknowledge the customer, you should have verified to",
      customerTel: 10,
      details: "failed to use the application",
      customer: 10,
      supervisor: "bob",
      branch: "Kampala"
    },
    parameters: [
      {
        name: "Breach of confidentiality",
        value: "Breach of confidentiality",
        category: zeroRated
      },
      {
        name: "Null",
        value: "Null",
        category: deviation
      },
      {
        name: "confidentiality",
        value: "confidentiality",
        category: deviation
      },
      {
        name: "Acknowledgement",
        value: "Acknowledgment",
        category: deviation
      }
    ],
    score: 40
  },
  {
    evalAttrs: {
      date: "2019-04-13",
      evaluator: "simon",
      agentName: "thanos",
      comment: `Acknowledge the customer, you should have verified to
       confirm the customer details, failed to apologize for failure to
       use the APP, did not probe enough to find out why the customer was failing to use the APP`,
      customerTel: 10,
      details: "wanted to know how much balance is left on his account",
      supervisor: "bob",
      branch: "Kampala"
    },
    parameters: [
      {
        name: "Null",
        value: "Null",
        category: zeroRated
      },
      {
        name: "Acknowledgement",
        value: "Acknowledgement",
        category: deviation
      },
      {
        name: "Null",
        value: "Null",
        category: deviation
      }
    ],
    score: 50
  },
  {
    parameters: [
      {
        name: "Lack of knowledge",
        value: "lack_of_knowledge",
        category: deviation
      },
      {
        name: "Rude to client",
        value: "rude",
        category: zeroRated
      }
    ],
    evalAttrs: {
      date: "2019-04-17",
      evaluator: "aleku399",
      customerTel: 120,
      comment: "comment",
      details: "details",
      agentName: "simon",
      reason: "BALANCE REQUEST",
      duration: 30,
      supervisor: "bob",
      branch: "Nakawa"
    },
    score: 0
  }
];

storiesOf("components/EvaluationDataTable", module).add("default", () => (
  <EvaluationDataTable
    data={evalTestData}
    users={users}
    loggedIn={loggedInEvaluator}
  />
));
