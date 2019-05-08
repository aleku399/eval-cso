import React from "react";
import { connect } from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { AnyAction, Dispatch } from "redux";
import { claimsApi } from "../../../lib/apiEndpoints";
import { throwLoginError } from "../../../lib/errors";
import { useAxiosGet } from "../../../lib/useAxios";
import { AppState } from "../../../redux/reducers";
import { getUsers } from "../../../redux/userList/action";
import { Claims } from "../../components/ClaimsTable";
import SummaryClaimsTable from "../../components/SummaryClaimsTable";
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
    <SummaryClaimsTable
      data={data || []}
      users={props.users}
      loggedIn={props.profile}
      loading={props.loading && loading}
      error={error}
    />
  );
}

export default connect<DispatchedProps, DispatchGetUsers>(
  mapStateToProps,
  mapDispatchToProps
)(ClaimsView);
