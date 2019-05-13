import React from "react";
import { connect } from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { AnyAction, Dispatch } from "redux";
import { evaluationApi } from "../../../lib/apiEndpoints";
import { authAxios } from "../../../lib/axios";
import { throwLoginError } from "../../../lib/errors";
import { useAxiosGet } from "../../../lib/useAxios";
import { AppState } from "../../../redux/reducers";
import { getUsers } from "../../../redux/userList/action";
import { DeleteHandler } from "../../components/DataTable";
import EvaluationDataTable, {
  EvaluationData
} from "../../components/EvaluationDataTable";
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

const deleteEvaluation = (jwt: string): DeleteHandler => (id: number) => {
  return authAxios(jwt).delete(`${evaluationApi}${id}`);
};

// TODO: abstract into function that takes a react component so that
// it can be re-used in summary component
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
    <EvaluationDataTable
      data={data || []}
      users={props.users}
      loggedIn={props.profile}
      loading={props.loading && loading}
      deleteHandler={deleteEvaluation(props.jwt)}
      error={error}
    />
  );
}

export default connect<DispatchedProps, DispatchGetUsers>(
  mapStateToProps,
  mapDispatchToProps
)(EvaluationDataView);
