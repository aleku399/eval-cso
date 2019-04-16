import { combineReducers } from "redux";
import { LoginActions, LoginState } from "./login/action";
import { loginReducer } from "./login/reducer";
import { ServiceActions } from "./services/actions";
import { serviceReducer, ServiceState } from "./services/reducer";

export interface AppState {
  service: ServiceState;
  login: LoginState;
}

export type AppActions = ServiceActions & LoginActions;

const rootReducer = combineReducers<AppState, AppActions>({
  service: serviceReducer,
  login: loginReducer
});

export default rootReducer;
