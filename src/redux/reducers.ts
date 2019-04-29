import { combineReducers } from "redux";
import { AgentDataActions, AgentDataState } from "./AgentData/action";
import { agentDataReducer } from "./AgentData/reducer";
import { LoginActions, LoginState } from "./login/action";
import { loginReducer } from "./login/reducer";
import { ServiceActions } from "./services/actions";
import { serviceReducer, ServiceState } from "./services/reducer";
import { SignupActions, SignupState } from "./signup/action";
import { signupReducer } from "./signup/reducer";
import { UserListActions, UserListState } from "./userList/action";
import { userListReducer } from "./userList/reducer";

export interface AppState {
  service?: ServiceState;
  signup?: SignupState; // TODO: can be removed from redux
  login?: LoginState;
  users?: UserListState; // TODO: exclude from persisting
  agentData?: AgentDataState;
}

export type AppActions = ServiceActions &
  LoginActions &
  SignupActions &
  UserListActions &
  AgentDataActions;

const rootReducer = combineReducers<AppState, AppActions>({
  service: serviceReducer,
  login: loginReducer,
  signup: signupReducer, // TODO:  remove from redux
  users: userListReducer,
  agentData: agentDataReducer
});

export default rootReducer;
