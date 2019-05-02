import { Action, Dispatch } from "redux";
import { agentApi } from "../../lib/apiEndpoints";
import axios from "../../lib/axios";
import { Profile } from "../../views/components/UserProfile";

export const REQUESTS_AGENT = "REQUESTS_AGENT";
export const RECEIVES_AGENT_FAILURE = "RECEIVES_AGENT";
export const RECEIVES_AGENT_SUCCESS = "RECEIVES_AGENT_SUCCESS";

const agentDataApi = `${agentApi}data`;

export interface AgentData {
  branches: string[];
  supervisors: Profile[];
  services: string[];
}

export interface AgentDataState extends AgentData {
  error?: string;
  loading?: boolean;
}

export type RequestAgentData = Action;

export type ReceiveAgentDataSuccess = Action & AgentData;

export type ReceiveAgentDataFailure = Action & {
  error: string;
};

export type AgentDataActions = ReceiveAgentDataFailure &
  ReceiveAgentDataSuccess &
  RequestAgentData;

export const requestAgentData = () => ({
  type: REQUESTS_AGENT
});

export const receiveAgentDataFailure = (error: string) => ({
  type: RECEIVES_AGENT_FAILURE,
  error
});

export const receiveAgentDataSuccess = ({
  branches,
  supervisors,
  services
}: AgentData) => ({
  type: RECEIVES_AGENT_SUCCESS,
  branches,
  services,
  supervisors
});

export const getAgentData = (dispatch: Dispatch) => (): Promise<void> => {
  dispatch(requestAgentData());
  return axios
    .get(`${agentDataApi}`)
    .then(response => {
      dispatch(receiveAgentDataSuccess(response.data));
    })
    .catch(error => {
      dispatch(receiveAgentDataFailure(error.toString()));
    });
};
