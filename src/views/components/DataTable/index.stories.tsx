import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import {
  adminProfileA,
  agent,
  agentC,
  loggedInEvaluator,
  testAdmin
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
  .add("with evaluator logged In", () => (
    <DataTable
      columns={columns}
      data={testData}
      users={users}
      loggedIn={loggedInEvaluator}
    />
  ))
  .add("with agent logged in", () => (
    <DataTable
      columns={columns}
      data={testData}
      users={users}
      loggedIn={agent}
    />
  ))
  .add("with admin logged in", () => (
    <DataTable
      columns={columns}
      data={testData}
      users={users}
      loggedIn={testAdmin}
      deleteHandler={action("delete")}
    />
  ));
