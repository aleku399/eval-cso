import React, { useState } from "react";
import { connect } from "react-redux";
import useEffectOnce from "react-use/esm/useEffectOnce";
import { AnyAction, Dispatch } from "redux";
import { authAxios } from "../../../lib/axios";
import { useAxiosGet } from "../../../lib/useAxios";
// import { useAxiosGet } from "../../../lib/useAxios";
import { AgentData, getAgentData } from "../../../redux/AgentData/action";
import { AppState } from "../../../redux/reducers";
import UserProfile, {
  Agent,
  AGENT,
  Profile,
  ProfileUpdate,
  Role
} from "../../components/UserProfile";

interface DispatchedProps extends AgentData {
  jwt: string;
  loggedInUser: Profile;
  loading: boolean;
  error?: string;
  users?: Profile[];
}

interface FetchedAgentProfileData {
  agent: Agent;
  loading: boolean;
  error: string;
}

interface DispatchGetAgentData {
  dispatchGetAgentData: () => Promise<void>;
}

interface OwnProps {
  userName: string;
}

type Props = DispatchedProps & DispatchGetAgentData & OwnProps;

const userApi = "/users/";
const agentApi = "/agents/";

function useFetchAgentProfileData(
  jwt: string,
  userName: string,
  role?: Role
): FetchedAgentProfileData {
  if (role !== AGENT) {
    return { agent: null, loading: false, error: null };
  }
  const [agentProfile, setAgentProfile] = useState({
    agent: null,
    loading: true,
    error: null
  });

  const { data, loading, error } = useAxiosGet<Agent>(jwt)(
    `${agentApi}${userName}`
  );
  setAgentProfile({ agent: data, loading, error });
  return agentProfile;
}

const deleteUser = (_jwt: string) => (_userName: string): Promise<void> => {
  return Promise.reject("currently not supported");
};

const updateUser = (jwt: string) => async (
  profile: ProfileUpdate
): Promise<any> => {
  const httpRequest = authAxios(jwt);
  if (profile.agent) {
    await httpRequest.put(`${agentApi}${profile.userName}`, profile.agent);
  }
  return httpRequest.put(`${userApi}${profile.userName}`, profile.user);
};

const mapStateToProps = ({
  agentData: { branches, supervisors, services, error, loading },
  login: { jwt, profile },
  users: { users }
}: AppState): DispatchedProps => ({
  loading,
  branches,
  supervisors,
  services,
  error,
  loggedInUser: profile,
  users,
  jwt
});

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>
): DispatchGetAgentData => ({
  dispatchGetAgentData: getAgentData(dispatch)
});

// updates either currently logged in User Profile or Profile of a different user
function UpdateUserProfile(props: Props) {
  if (!props.loggedInUser || !props.jwt) {
    throw new Error("Please login");
  }

  const { data, loading, error } = useAxiosGet<Profile>(props.jwt)(
    `${userApi}${props.userName}`
  );
  const userRole = (data && data.role) || props.loggedInUser.role;

  const agentProfile = useFetchAgentProfileData(
    props.jwt,
    props.userName,
    userRole
  );

  const defaultProfile = {
    error: props.error || error || agentProfile.error,
    loading: props.loading && loading && agentProfile.loading,
    agent: agentProfile.agent,
    editUser: data || props.loggedInUser
  };

  useEffectOnce(() => {
    props.dispatchGetAgentData();
  });

  return (
    <UserProfile
      {...defaultProfile}
      supervisors={props.supervisors}
      branches={props.branches}
      deleteUserHandler={deleteUser(props.jwt)}
      loggedInUser={props.loggedInUser}
      onSubmit={updateUser(props.jwt)}
    />
  );
}

export default connect<DispatchedProps, DispatchGetAgentData, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserProfile);
