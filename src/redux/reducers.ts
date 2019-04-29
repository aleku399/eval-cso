import { combineReducers } from "redux";
import { AgentDataActions, AgentDataState } from "./AgentData/action";
import { agentDataReducer } from "./AgentData/reducer";
import { LoginActions, LoginState } from "./login/action";
import { loginReducer } from "./login/reducer";
import { ServiceActions } from "./services/actions";
import { serviceReducer, ServiceState } from "./services/reducer";
import { UserListActions, UserListState } from "./userList/action";
import { userListReducer } from "./userList/reducer";

export interface AppState {
  service?: ServiceState;
  login?: LoginState;
  users?: UserListState;
  agentData?: AgentDataState;
}

export type AppActions = ServiceActions &
  LoginActions &
  UserListActions &
  AgentDataActions;

const rootReducer = combineReducers<AppState, AppActions>({
  service: serviceReducer,
  login: loginReducer,
  users: userListReducer,
  agentData: agentDataReducer
});

export default rootReducer;
