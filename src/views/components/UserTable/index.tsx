import Link from "next/link";
import * as React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Profile } from "../UserProfile";

export interface Props {
  users: Profile[];
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
