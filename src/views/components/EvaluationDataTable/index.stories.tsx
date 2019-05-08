import { storiesOf } from "@storybook/react";
import React from "react";
import { deviation, zeroRated } from "../EvaluationForm";
import {
  agent,
  agentB,
  agentC,
  loggedInEvaluator
} from "../UserProfile/index.stories";
import EvaluationDataTable from "./index";

const users = [agentB, agent, agentC, loggedInEvaluator];

const testData = [
  {
    evalAttrs: {
      date: "2019-04-17",
      evaluator: "alex",
      agentName: "thanos",
      comment: `Acknowledge the customer, you should have verified to
    confirm the customer details, failed to apologize for failure to
    use the APP, did not probe enough to find out why the customer was failing to use the APP`,
      customerTel: 10,
      details: "failed to use the application"
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
      details: "wanted to know how much balance is left on his account"
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
      agentName: "thanos",
      customerTel: 120,
      comment: "comment",
      details: "details"
    },
    score: 0
  }
];

storiesOf("components/EvaluationDataTable", module).add("default", () => (
  <EvaluationDataTable
    data={testData}
    users={users}
    loggedIn={loggedInEvaluator}
  />
));
