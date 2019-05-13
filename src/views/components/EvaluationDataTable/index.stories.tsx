import { action } from "@storybook/addon-actions";
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
    score: 40,
    id: 50
  },
  {
    evalAttrs: {
      date: "2019-04-13",
      evaluator: "simon",
      agentName: "thanos",
      comment: "failed to apologize for failure to",
      customerTel: 10,
      details: "wanted to know how much balance is left on his account",
      supervisor: "bob",
      branch: "Kampala"
    },
    parameters: [
      {
        name: "Very loud",
        value: "very_loud",
        category: deviation
      }
    ],
    score: 80,
    id: 24
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
    score: 0,
    id: 243
  }
];

storiesOf("components/EvaluationDataTable", module).add("default", () => (
  <EvaluationDataTable
    data={evalTestData}
    users={users}
    loggedIn={loggedInEvaluator}
    deleteHandler={action("delete")}
  />
));
