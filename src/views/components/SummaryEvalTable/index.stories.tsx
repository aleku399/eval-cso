import { storiesOf } from "@storybook/react";
import React from "react";
import { deviation, zeroRated } from "../EvaluationForm";
import {
  agent,
  agentB,
  agentC,
  loggedInEvaluator
} from "../UserProfile/index.stories";
import SummaryEvalTable from "./index";

const users = [agentB, agent, agentC, loggedInEvaluator];

const testData = [
  {
    evalAttrs: {
      date: "2016-01-01",
      evaluator: "alex",
      agentName: "thanos",
      reason: "BALANCE REQUEST",
      comment: `Acknowledge the customer`,
      duration: 30,
      customer: 10
    },
    parameters: [
      {
        name: "confidentiality",
        value: "confidentiality",
        category: deviation
      }
    ],
    score: 60
  },
  {
    evalAttrs: {
      date: "2017-01-01",
      evaluator: "simon",
      agentName: "thanos",
      reason: "BALANCE REQUEST",
      comment: "failing to use the APP",
      duration: 30,
      customer: 10
    },
    parameters: [
      {
        name: "Acknowledgement",
        value: "Acknowledgement",
        category: deviation
      }
    ],
    score: 70
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
      date: "2018-01-01",
      evaluator: "aleku399",
      agentName: "thanos",
      reason: "BALANCE REQUEST",
      customer: 120,
      comment: "comment",
      duration: 30
    },
    score: 0
  }
];

storiesOf("components/SummaryEvalTable", module).add("default", () => (
  <SummaryEvalTable
    data={testData}
    users={users}
    loggedIn={loggedInEvaluator}
  />
));
