import React from "react";
import { connect } from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { AnyAction, Dispatch } from "redux";
import { npsApi } from "../../../lib/apiEndpoints";
import { authAxios } from "../../../lib/axios";
import { throwLoginError } from "../../../lib/errors";
import { getAgentData } from "../../../redux/AgentData/action";
import { AppState } from "../../../redux/reducers";
import { getUsers } from "../../../redux/userList/action";
import NetPromoterScoreForm, {
  SubmitEvaluation
} from "../../components/NetPromoterScoreForm";
import { AGENT, Profile } from "../../components/UserProfile";
import { DispatchGetAgentData } from "../UpdateUserProfile";
import { DispatchGetUsers } from "../UserList";
import { backOfficeReasons, frontLineReasons, visitReasons } from "./data";

interface DispatchedProps {
  jwt: string;
  error: string;
  evaluator: Profile;
  loading: boolean;
  branches: string[];
  users: Profile[];
}

type DispatchFns = DispatchGetUsers & DispatchGetAgentData;

type Props = DispatchedProps & DispatchFns;

const submitNps = (jwt: string): SubmitEvaluation => async evaluation => {
  return authAxios(jwt).post(npsApi, evaluation);
};

const mapStateToProps = ({
  login: { jwt, profile },
  users: { loading, error, users },
  agentData
}: AppState): DispatchedProps => ({
  evaluator: profile,
  users,
  error: error || agentData.error,
  jwt,
  branches: agentData.branches,
  loading: loading || agentData.loading
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchFns => ({
  dispatchGetUsers: getUsers(dispatch),
  dispatchGetAgentData: getAgentData(dispatch)
});

function CreateNps(props: Props) {
  if (!props.evaluator || !props.jwt) {
    throwLoginError("Login as evaluator");
  }

  const agents = props.users.filter(user => user.role === AGENT);

  useEffectOnce(() => {
    if (!props.users.length) {
      props.dispatchGetUsers(props.jwt);
    }
    if (!props.branches.length) {
      props.dispatchGetAgentData();
    }
  });

  return (
    <NetPromoterScoreForm
      reasons={visitReasons}
      frontLineRatingReasons={frontLineReasons}
      backOfficeReasons={backOfficeReasons}
      error={props.error}
      agents={agents}
      loading={props.loading}
      evaluator={props.evaluator}
      branches={props.branches}
      onSubmit={submitNps(props.jwt)}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNps);
