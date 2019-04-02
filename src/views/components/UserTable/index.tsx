import Link from "next/link";
import * as React from "react";
import ReactTable from "react-table";
// tslint:disable-next-line: no-submodule-imports
import "react-table/react-table.css";

export interface User {
  userName: string;
  role: string;
}

export interface Props {
  data: User[];
}

const columns = [
  {
    Header: "Users List",
    columns: [
      {
        Header: "User Name",
        filterable: true,
        accessor: "userName",
        Cell: ({ row }) => (
          <Link href={`/user/${row.userName}`}>{row.userName}</Link>
        )
      },
      {
        Header: "Role",
        accessor: "role",
        filterable: true
      }
    ]
  }
];

export default function userTable({ data }) {
  return <ReactTable data={data} columns={columns} />;
}
