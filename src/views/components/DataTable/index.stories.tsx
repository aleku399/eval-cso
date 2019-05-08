import { storiesOf } from "@storybook/react";
import React from "react";
import {
  agent,
  agentB,
  agentC,
  loggedInEvaluator
} from "../UserProfile/index.stories";
import DataTable, { ColumnRowsOpt } from "./index";

const users = [agentB, agent, agentC, loggedInEvaluator];

const columns: ColumnRowsOpt[] = [
  {
    Header: "Data View",
    columns: [
      {
        Header: "Date",
        accessor: "date",
        filterable: false
      },
      {
        Header: "Agent Name",
        accessor: "agentName"
      },
      {
        Header: "Customer",
        accessor: "customer"
      },
      {
        Header: "Comment",
        accessor: "comment",
        style: {
          whiteSpace: "unset"
        },
        width: 200
      },
      {
        Header: "Score",
        accessor: "score"
      }
    ]
  }
];

const testData = [
  {
    date: "2019-05-17",
    evaluator: "aleku399",
    agentName: "thanos",
    reason: "BALANCE REQUEST",
    comment: "Acknowledge the customer",
    customer: "14",
    score: 40
  },
  {
    date: "2019-04-13",
    evaluator: "simon",
    agentName: "thanos",
    reason: "BALANCE REQUEST",
    comment: "Acknowledge the customer",
    customer: "15",
    score: 50
  }
];

storiesOf("components/DataTable", module).add("default", () => (
  <DataTable
    columns={columns}
    data={testData}
    users={users}
    loggedIn={loggedInEvaluator}
  />
));
