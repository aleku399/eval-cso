import * as React from "react";
import "react-table/react-table.css";
import DataTable, {
  ColumnRowsOpt,
  DeleteHandler,
  TableData
} from "../DataTable";
import { dateCellFormatter } from "../EvaluationDataTable";
import { Profile } from "../UserProfile";

export interface NPSAT extends TableData {
  customerTel: number;
}

export interface Props {
  data: NPSAT[];
  users: Profile[];
  loggedIn: Profile;
  loading?: boolean;
  error?: string;
  deleteHandler?: DeleteHandler;
}

const columns: ColumnRowsOpt[] = [
  {
    Header: "Net Promoter Score Customer Appointments Data",
    columns: [
      {
        Header: "Date",
        accessor: "date",
        filterable: false,
        Cell: dateCellFormatter()
      },
      {
        Header: "Customer Tel",
        accessor: "customerTel"
      },
      {
        Header: "Time",
        accessor: "Time"
      }
    ]
  }
];

export default function NPSAdataTable(props: Props) {
  return (
    <DataTable
      data={props.data}
      columns={columns}
      isNpsaTable={true}
      users={props.users}
      loggedIn={props.loggedIn}
      loading={props.loading}
      error={props.error}
    />
  );
}
