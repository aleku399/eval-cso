import {
  LoginActions,
  LoginState,
  RECEIVES_LOGIN_FAILURE,
  RECEIVES_LOGIN_SUCCESS,
  REQUESTS_LOGIN
} from "./action";

const initialState: LoginState = {
  pendingLogin: false
};

export function loginReducer(
  state: LoginState = initialState,
  action: LoginActions
): LoginState {
  switch (action.type) {
    case REQUESTS_LOGIN:
      return { ...state, pendingLogin: true };
    case RECEIVES_LOGIN_SUCCESS:
      return { ...state, pendingLogin: false, jwt: action.jwt };
    case RECEIVES_LOGIN_FAILURE:
      return { ...state, pendingLogin: false, error: action.error };
    default:
      return state;
  }
}
