import * as React from "react";
import "react-table/react-table.css";
import DataTable, { ColumnRowsOpt, TableData } from "../DataTable";
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
  frontLineRatingReason: string;
  backOfficeReason: string;
}

export interface Props {
  users: Profile[];
  data: NPS[];
  loggedIn: Profile;
  loading?: boolean;
  error?: string;
}

const columns: ColumnRowsOpt[] = [
  {
    Header: "Net Promoter Score Data",
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
        Header: "Front Line Rating Reason",
        accessor: "frontLineRatingReason"
      },
      {
        Header: "Back Office Reason",
        accessor: "backOfficeReason"
      },
      {
        Header: "Comment",
        accessor: "comment",
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

export default function NPSdataTable(props: Props) {
  return (
    <DataTable
      data={props.data}
      users={props.users}
      columns={columns}
      loggedIn={props.loggedIn}
      loading={props.loading}
      error={props.error}
    />
  );
}
