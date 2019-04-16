import { Action, Dispatch } from "redux";
import { Credentials } from "../../views/components/LoginForm";
import { Profile } from "../../views/components/UserProfile";
import axios from "../axios";

export const REQUESTS_LOGIN = "REQUESTS_LOGIN";
export const RECEIVES_LOGIN_FAILURE = "RECEIVES_LOGIN";
export const RECEIVES_LOGIN_SUCCESS = "RECEIVES_LOGIN_SUCCESS";

const userLoginApi = "/users/login";

export interface LoginState {
  error?: string;
  loading?: boolean;
  profile?: Profile;
  jwt?: string;
}

export type RequestLogin = Action & {
  loading: boolean;
};

export type ReceiveLoginSuccess = Action & {
  loading: boolean;
  jwt: string;
  profile: Profile;
};

export type ReceiveLoginFailure = Action & {
  loading: boolean;
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

export const receiveLoginSuccess = (jwt: string, profile: Profile) => ({
  type: RECEIVES_LOGIN_SUCCESS,
  jwt,
  profile
});

export const loginUser = (dispatch: Dispatch) => (credentials: Credentials) => {
  dispatch(requestLogin());
  return axios
    .post(userLoginApi, credentials)
    .then(({ data }) => {
      const jwt = data.userToken;
      window.localStorage.setItem("token", jwt);
      dispatch(receiveLoginSuccess(jwt, data.user));
    })
    .catch(error => {
      dispatch(receiveLoginFailure(error.response.data));
    });
};
