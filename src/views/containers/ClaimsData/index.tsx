import React from "react";
import { connect } from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { AnyAction, Dispatch } from "redux";
import { claimsApi } from "../../../lib/apiEndpoints";
import { authAxios } from "../../../lib/axios";
import { throwLoginError } from "../../../lib/errors";
import { useAxiosGet } from "../../../lib/useAxios";
import { AppState } from "../../../redux/reducers";
import { getUsers } from "../../../redux/userList/action";
import ClaimsTable, { Claims } from "../../components/ClaimsTable";
import { DeleteHandler } from "../../components/DataTable";
import { Profile } from "../../components/UserProfile";
import { DispatchGetUsers } from "../UserList";

interface DispatchedProps {
  jwt: string;
  error: string;
  profile: Profile;
  loading: boolean;
  users: Profile[];
}

type Props = DispatchedProps & DispatchGetUsers;

const mapStateToProps = ({
  login: { jwt, profile },
  users: { loading, error, users }
}: AppState): DispatchedProps => ({
  profile,
  users,
  error,
  jwt,
  loading
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>
): DispatchGetUsers => ({
  dispatchGetUsers: getUsers(dispatch)
});

const deleteClaim = (jwt: string): DeleteHandler => (id: number) => {
  return authAxios(jwt).delete(`${claimsApi}${id}`);
};

function ClaimsView(props: Props) {
  if (!props.profile || !props.jwt) {
    throwLoginError();
  }

  const { data, loading, error } = useAxiosGet<Claims[]>(props.jwt)(claimsApi);

  useEffectOnce(() => {
    if (!props.users.length) {
      props.dispatchGetUsers(props.jwt);
    }
  });

  return (
    <ClaimsTable
      data={data || []}
      users={props.users}
      loggedIn={props.profile}
      loading={props.loading && loading}
      deleteHandler={deleteClaim(props.jwt)}
      error={error}
    />
  );
}

export default connect<DispatchedProps, DispatchGetUsers>(
  mapStateToProps,
  mapDispatchToProps
)(ClaimsView);
