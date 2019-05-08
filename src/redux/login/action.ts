import { Action, Dispatch } from "redux";
import { userApi } from "../../lib/apiEndpoints";
import axios from "../../lib/axios";
import { Credentials } from "../../views/components/LoginForm";
import { Profile } from "../../views/components/UserProfile";

export const REQUESTS_LOGIN = "REQUESTS_LOGIN";
export const RECEIVES_LOGIN_FAILURE = "RECEIVES_LOGIN";
export const RECEIVES_LOGIN_SUCCESS = "RECEIVES_LOGIN_SUCCESS";

const userLoginApi = `${userApi}login`;

export interface LoginState {
  error?: string;
  loading?: boolean;
  profile?: Profile;
  jwt?: string;
}

export type ReceiveLoginSuccess = Action & {
  jwt: string;
  profile: Profile;
};

export type ReceiveLoginFailure = Action & {
  error: string;
};

export type LoginActions = ReceiveLoginFailure & ReceiveLoginSuccess;

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
      const jwt = data.token;
      window.localStorage.setItem("token", jwt);
      window.localStorage.setItem("profile", JSON.stringify(data.user));
      dispatch(receiveLoginSuccess(jwt, data.user));
    })
    .catch(error => {
      dispatch(receiveLoginFailure(error.toString()));
    });
};
