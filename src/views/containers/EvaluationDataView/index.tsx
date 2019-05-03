import React from "react";
import { connect } from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { AnyAction, Dispatch } from "redux";
import { evaluationApi } from "../../../lib/apiEndpoints";
import { throwLoginError } from "../../../lib/errors";
import { useAxiosGet } from "../../../lib/useAxios";
import { AppState } from "../../../redux/reducers";
import { getUsers } from "../../../redux/userList/action";
import DataTable, { EvaluationData } from "../../components/DataTable";
import { Profile } from "../../components/UserProfile";
import { DispatchGetUsers } from "../UserList";

interface DispatchedProps {
  jwt: string;
  error: string;
  profile: Profile;
  loading: boolean;
  service: string;
  users: Profile[];
}

type Props = DispatchedProps & DispatchGetUsers;

const mapStateToProps = ({
  service: { active },
  login: { jwt, profile },
  users: { loading, error, users }
}: AppState): DispatchedProps => ({
  profile,
  service: active,
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

function EvaluationDataView(props: Props) {
  if (!props.profile || !props.jwt) {
    throwLoginError("Login as evaluator");
  }

  const { data, loading, error } = useAxiosGet<EvaluationData>(props.jwt)(
    `${evaluationApi}${props.service}`
  );

  useEffectOnce(() => {
    if (!props.users.length) {
      props.dispatchGetUsers(props.jwt);
    }
  });

  return (
    <DataTable
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
)(EvaluationDataView);
