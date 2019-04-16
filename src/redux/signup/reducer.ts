import {
  RECEIVES_SIGNUP_FAILURE,
  RECEIVES_SIGNUP_SUCCESS,
  REQUESTS_SIGNUP,
  SignupActions,
  SignupState
} from "./action";

const initialState: SignupState = {
  loading: false
};

export function signupReducer(
  state: SignupState = initialState,
  action: SignupActions
): SignupState {
  switch (action.type) {
    case REQUESTS_SIGNUP:
      return { ...state, loading: true };
    case RECEIVES_SIGNUP_SUCCESS:
      return { ...state, loading: false, state: action.state };
    case RECEIVES_SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
