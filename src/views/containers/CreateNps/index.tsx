import React from "react";
import { connect } from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { AnyAction, Dispatch } from "redux";
import { npsApi } from "../../../lib/apiEndpoints";
import { authAxios } from "../../../lib/axios";
import { throwLoginError } from "../../../lib/errors";
import { reasons } from "../../../lib/serviceData";
import { AppState } from "../../../redux/reducers";
import { getUsers } from "../../../redux/userList/action";
import NetPromoterScoreForm, {
  SubmitEvaluation
} from "../../components/NetPromoterScoreForm";
import { AGENT, Profile } from "../../components/UserProfile";
import { DispatchGetUsers } from "../UserList";
import { backOfficeReasons, frontLineReasons, touchPoints } from "./data";

interface DispatchedProps {
  jwt: string;
  error: string;
  evaluator: Profile;
  loading: boolean;
  users: Profile[];
}

type Props = DispatchedProps & DispatchGetUsers;

const submitNps = (jwt: string): SubmitEvaluation => async evaluation => {
  return authAxios(jwt).post(npsApi, evaluation);
};

const mapStateToProps = ({
  login: { jwt, profile },
  users: { loading, error, users }
}: AppState): DispatchedProps => ({
  evaluator: profile,

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

function CreateNps(props: Props) {
  if (!props.evaluator || !props.jwt) {
    throwLoginError("Login as evaluator");
  }

  const agents = props.users.filter(user => user.role === AGENT);

  useEffectOnce(() => {
    if (!props.users.length) {
      props.dispatchGetUsers(props.jwt);
    }
  });

  return (
    <NetPromoterScoreForm
      reasons={reasons.nps}
      frontLineRatingReasons={frontLineReasons}
      backOfficeReasons={backOfficeReasons}
      error={props.error}
      agents={agents}
      loading={props.loading}
      evaluator={props.evaluator}
      touchPoints={touchPoints}
      onSubmit={submitNps(props.jwt)}
    />
  );
}

export default connect<DispatchedProps, DispatchGetUsers>(
  mapStateToProps,
  mapDispatchToProps
)(CreateNps);
