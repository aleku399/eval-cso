import _ from "lodash";
import * as React from "react";
import "react-table/react-table.css";
import DataTable, {
  ColumnRowsOpt,
  DeleteHandler,
  TableData
} from "../DataTable";
import { dateCellFormatter } from "../EvaluationDataTable";
import { Profile } from "../UserProfile";

export interface Claims extends TableData {
  branch: string;
  claimType: string;
  details: string;
  supervisor: string;
  workflowNumber: number;
  id: number;
}

export interface Props {
  users: Profile[];
  data: Claims[];
  loggedIn: Profile;
  loading?: boolean;
  error?: string;
  deleteHandler: DeleteHandler;
}

const columns: ColumnRowsOpt[] = [
  {
    Header: "Claim Data",
    columns: [
      {
        Header: "Date",
        accessor: "date",
        filterable: false,
        Cell: dateCellFormatter()
      },
      {
        Header: "Agent Name",
        accessor: "agentName"
      },
      {
        Header: "workflow Number",
        accessor: "workflowNumber"
      },
      {
        Header: "Claim Type",
        accessor: "claimType"
      },
      {
        Header: "Comment",
        accessor: "comment",
        style: { whiteSpace: "unset" },
        width: 200
      },
      {
        Header: "Details",
        accessor: "details",
        style: { whiteSpace: "unset" },
        width: 200
      },
      {
        Header: "Score",
        id: "score",
        accessor: "score"
      }
    ]
  }
];

export default function ClaimsTable(props: Props) {
  return (
    <DataTable
      data={props.data}
      users={props.users}
      columns={columns}
      loggedIn={props.loggedIn}
      deleteHandler={props.deleteHandler}
      loading={props.loading}
      error={props.error}
    />
  );
}
