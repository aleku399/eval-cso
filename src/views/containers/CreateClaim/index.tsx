import React from "react";
import { connect } from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { AnyAction, Dispatch } from "redux";
import { claimsApi, claimTypesApi } from "../../../lib/apiEndpoints";
import { authAxios } from "../../../lib/axios";
import { throwLoginError } from "../../../lib/errors";
import { reasons } from "../../../lib/serviceData";
import { useAxiosGet } from "../../../lib/useAxios";
import { AppState } from "../../../redux/reducers";
import { getUsers } from "../../../redux/userList/action";
import ClaimEvaluation, {
  SubmitClaimEvaluation
} from "../../components/ClaimEvaluation";
import { ClaimType } from "../../components/UpdateClaimTypes";
import { AGENT, Profile } from "../../components/UserProfile";
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

const createClaim = (
  jwt: string
): SubmitClaimEvaluation => async evaluation => {
  return authAxios(jwt).post(claimsApi, evaluation);
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

function CreateClaim(props: Props) {
  if (!props.evaluator || !props.jwt) {
    throwLoginError("Login as evaluator");
  }

  const agents = props.users.filter(user => user.role === AGENT);

  const { data, loading, error } = useAxiosGet<ClaimType[]>(props.jwt)(
    claimTypesApi
  );

  useEffectOnce(() => {
    if (!props.users.length) {
      props.dispatchGetUsers(props.jwt);
    }
  });

  return (
    <ClaimEvaluation
      claimTypes={data || []}
      reasons={reasons.claim}
      error={props.error || error}
      agents={agents}
      loading={props.loading && loading}
      evaluator={props.evaluator}
      onSubmit={createClaim(props.jwt)}
    />
  );
}

export default connect<DispatchedProps, DispatchGetUsers>(
  mapStateToProps,
  mapDispatchToProps
)(CreateClaim);
