import Link from "next/link";
import * as React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Dimmer, Loader, Message } from "semantic-ui-react";
import { Profile } from "../UserProfile";

export interface Props {
  users: Profile[];
  loading?: boolean;
  error?: string;
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
          <Link href={`/user/?${row.userName}`}>
            <a>{row.fullName}</a>
          </Link>
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

export default function UserTable({
  users,
  error = null,
  loading = false
}: Props) {
  return (
    <div>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      <Message
        hidden={!error}
        error={true}
        header="Users List Error"
        content={error}
      />
      <ReactTable data={users} columns={columns} />
    </div>
  );
}
