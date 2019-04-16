import { Action, Dispatch } from "redux";
import { Credentials } from "../../types/user";
import axios from "../axios";

export const REQUESTS_LOGIN = "REQUESTS_LOGIN";
export const RECEIVES_LOGIN_FAILURE = "RECEIVES_LOGIN";
export const RECEIVES_LOGIN_SUCCESS = "RECEIVES_LOGIN_SUCCESS";

const userLoginApi = "/users/login";

export interface LoginState {
  error?: string;
  pendingLogin: boolean;
  jwt?: string;
}

export type RequestLogin = Action & {
  pendingLogin: boolean;
};

export type ReceiveLoginSuccess = Action & {
  pendingLogin: boolean;
  jwt: string;
};

export type ReceiveLoginFailure = Action & {
  pendingLogin: boolean;
  error: string;
};

export type LoginActions = ReceiveLoginFailure &
  ReceiveLoginSuccess &
  RequestLogin;

export const requestLogin = () => ({
  type: REQUESTS_LOGIN
});

export const receiveLoginFailure = (error: string) => ({
  type: RECEIVES_LOGIN_FAILURE,
  error
});

export const receiveLoginSuccess = (jwt: string) => ({
  type: RECEIVES_LOGIN_SUCCESS,
  jwt
});

export const loginUser = (dispatch: Dispatch) => (credentials: Credentials) => {
  dispatch(requestLogin());
  return axios
    .post(userLoginApi, credentials)
    .then(response => {
      const jwt = response.data.userToken;
      window.localStorage.setItem("token", jwt);
      dispatch(receiveLoginSuccess(jwt));
    })
    .catch(error => {
      dispatch(receiveLoginFailure(error.response.data));
    });
};
