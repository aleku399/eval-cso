import { storiesOf } from "@storybook/react";
import React from "react";
import { deviation, zeroRated } from "../EvaluationDataForm";
import EditTable from "./index";

storiesOf("components/EditTable", module).add("default", () => (
  <EditTable data={testData} loggedIn="Alex" />
));

const testData = [
  {
    evalAttrs: {
      date: "2016-05-17",
      evaluator: "Alex",
      agent: "Aang",
      reason: "BALANCE REQUEST",
      comment: `Acknowledge the customer, you should have verified to
    confirm the customer details, failed to apologize for failure to
    use the APP, did not probe enough to find out why the customer was failing to use the APP`,
      duration: 30,
      customer: 10
    },
    parameterAttrs: [
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
      date: "2017-04-13",
      evaluator: "Simon",
      agent: "Mai",
      reason: "BALANCE REQUEST",
      comment: `Acknowledge the customer, you should have verified to
       confirm the customer details, failed to apologize for failure to
       use the APP, did not probe enough to find out why the customer was failing to use the APP`,
      duration: 30,
      customer: 10
    },
    parameterAttrs: [
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
    parameterAttrs: [
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
      date: "2016-05-17",
      evaluator: "Alex",
      agent: "Aang",
      reason: "BALANCE REQUEST",
      customer: 120,
      comment: "comment",
      duration: 30
    },
    score: 0
  }
];
