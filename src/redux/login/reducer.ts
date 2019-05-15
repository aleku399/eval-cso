import {
  LoginActions,
  LoginState,
  RECEIVES_LOGIN_FAILURE,
  RECEIVES_LOGIN_SUCCESS,
  REQUESTS_LOGIN,
  REQUESTS_LOGOUT
} from "./action";

const initialState: LoginState = {
  loading: false
};

export function loginReducer(
  state: LoginState = initialState,
  action: LoginActions
): LoginState {
  switch (action.type) {
    case REQUESTS_LOGIN:
      return { ...state, loading: true };
    case RECEIVES_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        jwt: action.jwt,
        error: null,
        profile: action.profile
      };
    case RECEIVES_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.error };
    case REQUESTS_LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        jwt: null,
        profile: null
      };
    default:
      return state;
  }
}
