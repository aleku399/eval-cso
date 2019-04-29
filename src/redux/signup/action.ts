import { Action, Dispatch } from "redux";
import axios from "../../lib/axios";
import { SignupData } from "../../views/components/SignupForm";

export const REQUESTS_SIGNUP = "REQUESTS_SIGNUP";
export const RECEIVES_SIGNUP_FAILURE = "RECEIVES_SIGNUP";
export const RECEIVES_SIGNUP_SUCCESS = "RECEIVES_SIGNUP_SUCCESS";

const userSignupApi = "/users/signup";

export interface SignupState {
  error?: string;
  loading?: boolean;
  state?: string;
}

export type ReceiveSignupSuccess = Action & {
  loading: boolean;
  state: "success";
};

export type ReceiveSignupFailure = Action & {
  loading: boolean;
  error: string;
};

export type SignupActions = ReceiveSignupFailure & ReceiveSignupSuccess;

export const requestSignup = () => ({
  type: REQUESTS_SIGNUP
});

export const receiveSignupFailure = (error: string) => ({
  type: RECEIVES_SIGNUP_FAILURE,
  error
});

export const receiveSignupSuccess = () => ({
  type: RECEIVES_SIGNUP_SUCCESS
});

export const signupUser = (dispatch: Dispatch) => (credentials: SignupData) => {
  dispatch(requestSignup());
  return axios
    .post(userSignupApi, credentials)
    .then(response => {
      if (response.status !== 200) {
        throw new Error("Signup failure");
      }
      dispatch(receiveSignupSuccess());
    })
    .catch(error => {
      dispatch(receiveSignupFailure(error.response.data || error));
    });
};
