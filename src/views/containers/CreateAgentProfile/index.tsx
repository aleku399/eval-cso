import React from "react";
import { connect } from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";
import { AnyAction, Dispatch } from "redux";
import { agentApi } from "../../../lib/apiEndpoints";
import { authAxios } from "../../../lib/axios";
import { throwLoginError } from "../../../lib/errors";
import { AgentData, getAgentData } from "../../../redux/AgentData/action";
import { AppState } from "../../../redux/reducers";
import UserProfile, {
  AGENT,
  Profile,
  ProfileUpdate,
  SubmitProfile
} from "../../components/UserProfile";
import { deleteUser } from "../UpdateUserProfile";

interface DispatchedProps extends AgentData {
  jwt: string;
  loggedInUser: Profile;
  loading: boolean;
  error?: string;
}

interface DispatchGetAgentData {
  dispatchGetAgentData: () => Promise<void>;
}

type Props = DispatchedProps & DispatchGetAgentData;

const createAgent = (jwt: string): SubmitProfile => async (
  profile: ProfileUpdate
) => {
  const httpRequest = authAxios(jwt);
  const payload = { agent: profile.agent, user: profile.user };
  return httpRequest.post(agentApi, payload);
};

const mapStateToProps = ({
  agentData: { branches, supervisors, services, error, loading },
  login: { jwt, profile }
}: AppState): DispatchedProps => ({
  loading,
  branches,
  supervisors,
  services,
  error,
  loggedInUser: profile,
  jwt
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>
): DispatchGetAgentData => ({
  dispatchGetAgentData: getAgentData(dispatch)
});

function UpdateUserProfile(props: Props) {
  if (!props.loggedInUser || !props.jwt) {
    throwLoginError();
  }

  const emptyUser = {
    userName: "",
    fullName: "",
    role: AGENT,
    email: ""
  };

  useEffectOnce(() => {
    props.dispatchGetAgentData();
  });

  return (
    <UserProfile
      isInCreatAgentMode={true}
      loading={props.loading}
      editUser={emptyUser}
      supervisors={props.supervisors}
      branches={props.branches}
      deleteUserHandler={deleteUser(props.jwt)}
      loggedInUser={props.loggedInUser}
      onSubmit={createAgent(props.jwt)}
    />
  );
}

export default connect<DispatchedProps, DispatchGetAgentData, {}>(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserProfile);
