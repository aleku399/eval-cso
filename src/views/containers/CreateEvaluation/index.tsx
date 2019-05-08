import React from "react";
import { connect } from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { AnyAction, Dispatch } from "redux";
import { evaluationApi, evaluationServiceApi } from "../../../lib/apiEndpoints";
import { authAxios } from "../../../lib/axios";
import { throwLoginError } from "../../../lib/errors";
import { reasons } from "../../../lib/reasons";
import { useAxiosGet } from "../../../lib/useAxios";
import { AppState } from "../../../redux/reducers";
import { getUsers } from "../../../redux/userList/action";
import EvaluationForm, {
  SubmitEvaluation
} from "../../components/EvaluationForm";
import { ParameterRes } from "../../components/UpdateServiceType";
import { AGENT, Profile } from "../../components/UserProfile";
import { toParameterCategories } from "../UpdateServiceType";
import { DispatchGetUsers } from "../UserList";

interface DispatchedProps {
  jwt: string;
  error: string;
  evaluator: Profile;
  loading: boolean;
  service: string;
  users: Profile[];
}

type Props = DispatchedProps & DispatchGetUsers;

const createEvaluation = (
  jwt: string
): SubmitEvaluation => async evaluation => {
  return authAxios(jwt).post(evaluationApi, evaluation);
};

const mapStateToProps = ({
  service: { active },
  login: { jwt, profile },
  users: { loading, error, users }
}: AppState): DispatchedProps => ({
  evaluator: profile,
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

function CreateEvaluation(props: Props) {
  if (!props.evaluator || !props.jwt) {
    throwLoginError("Login as evaluator");
  }

  const agents = props.users.filter(user => user.role === AGENT);

  const { data, loading, error } = useAxiosGet<ParameterRes[]>(props.jwt)(
    `${evaluationServiceApi}${props.service}`
  );

  useEffectOnce(() => {
    if (!props.users.length) {
      props.dispatchGetUsers(props.jwt);
    }
  });

  return (
    <EvaluationForm
      service={props.service}
      parameterCategories={toParameterCategories(data)}
      error={props.error || error}
      agents={agents}
      loading={props.loading && loading}
      evaluator={props.evaluator.userName}
      onSubmit={createEvaluation(props.jwt)}
      reasons={reasons[props.service]}
    />
  );
}

export default connect<DispatchedProps, DispatchGetUsers>(
  mapStateToProps,
  mapDispatchToProps
)(CreateEvaluation);
