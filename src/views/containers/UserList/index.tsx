import React from "react";
import { connect } from "react-redux";
import useEffectOnce from "react-use/esm/useEffectOnce";
import { AnyAction, Dispatch } from "redux";
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

  useEffectOnce(() => {
    if (!users.length) {
      dispatchGetUsers(jwt);
    }
  });

  return <UserTable users={users} loading={loading} error={error} />;
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
