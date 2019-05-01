import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { Loader, Message } from "semantic-ui-react";
import { throwLoginError } from "../../../lib/errors";
import { AppState } from "../../../redux/reducers";
import { getUsers } from "../../../redux/userList/action";
import UserTable, { Props as UserTableProps } from "../../components/UserTable";

interface DispatchedProps extends UserTableProps {
  jwt: string;
  loading: boolean;
  error?: string;
}

export interface DispatchGetUsers {
  dispatchGetUsers: (jwt: string) => Promise<void>;
}

type Props = DispatchedProps & DispatchGetUsers;

const mapStateToProps = ({
  users: { loading, error, users },
  login: { jwt }
}: AppState): DispatchedProps => ({
  loading,
  error,
  users,
  jwt
});

function UserList({ users, error, loading, jwt, dispatchGetUsers }: Props) {
  if (!jwt) {
    throwLoginError();
  }

  useEffect(() => {
    if (!users && !error) {
      dispatchGetUsers(jwt);
    }
  });

  return (
    <div>
      <Loader active={loading} />
      {users && users.length ? <UserTable users={users} /> : null}
      <Message error={!!error} header="Users List Error" content={error} />
    </div>
  );
}

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>
): DispatchGetUsers => ({
  dispatchGetUsers: getUsers(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
