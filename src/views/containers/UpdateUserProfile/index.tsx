import { AxiosResponse } from "axios";
import React from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { agentApi, userApi } from "../../../lib/apiEndpoints";
import { authAxios } from "../../../lib/axios";
import { throwLoginError } from "../../../lib/errors";
import { AgentData, getAgentData } from "../../../redux/AgentData/action";
import { AppState } from "../../../redux/reducers";
import UserProfile, {
  Agent,
  AGENT,
  Profile,
  ProfileUpdate
} from "../../components/UserProfile";

interface DispatchedProps extends AgentData {
  jwt: string;
  loggedInUser: Profile;
  loading: boolean;
  error?: string;
}

interface OwnProps {
  userName: string;
}

interface DispatchGetAgentData {
  dispatchGetAgentData: () => Promise<void>;
}

type Props = DispatchedProps & DispatchGetAgentData & OwnProps;

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

export const deleteUser = (_jwt: string) => (
  _userName: string
): Promise<void> => {
  return Promise.reject("currently not supported");
};

interface State {
  user: Profile;
  agent?: Agent;
  loading: boolean;
  error: string;
}

class UpdateUserProfile extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    if (!props.loggedInUser || !props.jwt) {
      throwLoginError();
    }

    this.state = {
      loading: props.loading,
      error: props.error,
      user: props.loggedInUser
    };
  }

  public componentDidMount() {
    this.props.dispatchGetAgentData();
    this.getProfileData();
  }

  public async getProfileData(): Promise<void> {
    try {
      const userName = this.props.userName;
      const user = await this.getUserData(userName);

      const agent =
        user.role === AGENT
          ? await this.getAgentData(userName)
          : this.state.agent;

      this.setState({ user, loading: false, agent });
    } catch (error) {
      this.setState({ error: error.toString(), loading: false });
    }
  }

  public async getUserData(userName: string): Promise<Profile> {
    this.setState({ loading: true });
    const { data } = await authAxios(this.props.jwt).get<Profile>(
      `${userApi}${userName}`
    );
    return data;
  }

  public async getAgentData(userName: string): Promise<Agent> {
    this.setState({ loading: true });
    const { data } = await authAxios(this.props.jwt).get<Agent>(
      `${agentApi}${userName}`
    );
    return data;
  }

  public updateUser = async (
    profile: ProfileUpdate
  ): Promise<AxiosResponse<any>> => {
    const httpRequest = authAxios(this.props.jwt);

    if (profile.user.role === AGENT) {
      await httpRequest.put(`${agentApi}${this.props.userName}`, profile.agent);
    }

    if (profile.password) {
      await httpRequest.patch(
        `${userApi}${this.props.userName}/${profile.password}`
      );
    }

    return httpRequest.put(`${userApi}${this.props.userName}`, profile.user);
  };

  public render() {
    const { user, agent, loading, error } = this.state;
    return (
      <UserProfile
        editUser={user}
        agent={agent}
        loading={loading}
        error={this.props.error || error}
        supervisors={this.props.supervisors}
        branches={this.props.branches}
        deleteUserHandler={deleteUser(this.props.jwt)}
        loggedInUser={this.props.loggedInUser}
        onSubmit={this.updateUser}
      />
    );
  }
}

export default connect<DispatchedProps, DispatchGetAgentData, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUserProfile);
