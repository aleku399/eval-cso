import { combineReducers } from "redux";
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
  signup?: SignupState;
  login?: LoginState;
  users?: UserListState;
}

export type AppActions = ServiceActions &
  LoginActions &
  SignupActions &
  UserListActions;

const rootReducer = combineReducers<AppState, AppActions>({
  service: serviceReducer,
  login: loginReducer,
  signup: signupReducer,
  users: userListReducer
});

export default rootReducer;
