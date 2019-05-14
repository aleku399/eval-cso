import * as React from "react";
import "react-table/react-table.css";
import DataTable, {
  ColumnRowsOpt,
  DeleteHandler,
  TableData
} from "../DataTable";
import { dateCellFormatter } from "../EvaluationDataTable";
import { listCellFormatter, listFilterMethod } from "../SummaryEvalTable";
import { Profile } from "../UserProfile";

export interface NPS extends TableData {
  customerName: string;
  customerTel: number;
  touchPoint: string;
  reason: string;
  waitTime: string;
  duration: string;
  issueResolved: boolean;
  furtherInformationGiven: boolean;
  rating: number;
  ratingReason: string;
  crmCaptureCorrect: boolean;
  crmCapturedReason: string;
  frontLineRatingReasons: string[];
  backOfficeReasons: string[];
  id: number;
}

export interface Props {
  users: Profile[];
  data: NPS[];
  loggedIn: Profile;
  loading?: boolean;
  error?: string;
  deleteHandler: DeleteHandler;
}

const columns: ColumnRowsOpt[] = [
  {
    Header: "Net Promoter Score Data",
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
        Header: "Customer Name",
        accessor: "customerName"
      },
      {
        Header: "Customer Tel",
        accessor: "customerTel"
      },
      {
        Header: "Touch Point",
        accessor: "touchPoint"
      },
      {
        Header: "Reason",
        accessor: "reason"
      },
      {
        Header: "Wait Time",
        accessor: "waitTime"
      },
      {
        Header: "Duration",
        accessor: "duration"
      },
      {
        Header: "Issue Resolved",
        accessor: "issueResolved",
        Cell: ({ row }) => (row.issueResolved ? "yes" : "no")
      },
      {
        Header: "Further Information Given",
        accessor: "furtherInformationGiven",
        Cell: ({ row }) => (row.furtherInformationGiven ? "yes" : "no")
      },
      {
        Header: "Rating",
        accessor: "rating"
      },
      {
        Header: "Rating Reason",
        accessor: "ratingReason"
      },
      {
        Header: "CRM Capture Correct",
        accessor: "crmCaptureCorrect",
        Cell: ({ row }) => (row.crmCaptureCorrect ? "yes" : "no")
      },
      {
        Header: " CRM Captured Reason",
        accessor: "crmCapturedReason"
      },
      {
        Header: "Front Line Rating Reasons",
        width: 100,
        accessor: "frontLineRatingReasons",
        style: { whiteSpace: "unset" },
        Cell: listCellFormatter("frontLineRatingReasons"),
        filterMethod: listFilterMethod("frontLineRatingReasons")
      },
      {
        Header: "Back Office Reason",
        style: { whiteSpace: "unset" },
        accessor: "backOfficeReasons",
        Cell: listCellFormatter("backOfficeReasons"),
        filterMethod: listFilterMethod("backOfficeReasons")
      }
    ]
  }
];

export default function NPSdataTable(props: Props) {
  return (
    <DataTable
      data={props.data}
      isNpsTable={true}
      users={props.users}
      columns={columns}
      loggedIn={props.loggedIn}
      loading={props.loading}
      error={props.error}
      deleteHandler={props.deleteHandler}
    />
  );
}
