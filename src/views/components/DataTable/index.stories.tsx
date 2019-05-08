import { storiesOf } from "@storybook/react";
import React from "react";
import {
  adminProfileA,
  agent,
  agentC,
  loggedInEvaluator
} from "../UserProfile/index.stories";
import DataTable, { ColumnRowsOpt } from "./index";

const users = [adminProfileA, agent, agentC, loggedInEvaluator];

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
    date: "2019-01-05",
    evaluator: "aleku399",
    agentName: "thanos",
    reason: "BALANCE REQUEST",
    comment: "Acknowledge the customer",
    customer: "14",
    score: 40,
    supervisor: "bob",
    branch: "Kampala"
  },
  {
    date: "2019-04-13",
    evaluator: "steve",
    agentName: "simon",
    reason: "BALANCE REQUEST",
    comment: "Acknowledge the customer",
    customer: "15",
    branch: "Nakawa",
    supervisor: "steve",
    score: 50
  }
];

storiesOf("components/DataTable", module)
  .add("with evaluator loggedIn", () => (
    <DataTable
      columns={columns}
      data={testData}
      users={users}
      loggedIn={loggedInEvaluator}
    />
  ))
  .add("with agent loggedIn", () => (
    <DataTable
      columns={columns}
      data={testData}
      users={users}
      loggedIn={agent}
    />
  ));
