import Link from "next/link";
import * as React from "react";
import ReactTable from "react-table";
// tslint:disable-next-line: no-submodule-imports
import "react-table/react-table.css";

export interface User {
  userName: string;
  role: string;
  fullName: string;
}

export interface Props {
  users: User[];
}

const columns = [
  {
    Header: "Users List",
    columns: [
      {
        Header: "UserName",
        filterable: true,
        accessor: "userName",
        Cell: ({ row }) => (
          <Link href={`/user/${row.userName}`}>{row.userName}</Link>
        )
      },
      {
        Header: "FullName",
        filterable: true,
        accessor: "fullName"
      },
      {
        Header: "Role",
        accessor: "role",
        filterable: true
      }
    ]
  }
];

export default function UserTable({ users }: Props) {
  return <ReactTable data={users} columns={columns} />;
}
