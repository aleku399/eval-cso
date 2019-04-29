import {
  AgentDataActions,
  AgentDataState,
  RECEIVES_AGENT_FAILURE,
  RECEIVES_AGENT_SUCCESS,
  REQUESTS_AGENT
} from "./action";

const initialState: AgentDataState = {
  loading: false,
  supervisors: [],
  branches: [],
  services: []
};

export function agentDataReducer(
  state: AgentDataState = initialState,
  action: AgentDataActions
): AgentDataState {
  switch (action.type) {
    case REQUESTS_AGENT:
      return { ...state, loading: true };
    case RECEIVES_AGENT_SUCCESS:
      return {
        ...state,
        loading: false,
        branches: action.branches,
        services: action.services,
        supervisors: action.supervisors
      };
    case RECEIVES_AGENT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
