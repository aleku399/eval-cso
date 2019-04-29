import { Action, Dispatch } from "redux";
import { userApi } from "../../lib/apiEndpoints";
import { authAxios } from "../../lib/axios";
import { Profile } from "../../views/components/UserProfile";

export const REQUESTS_USERS = "REQUESTS_USERS";
export const RECEIVES_USERS_FAILURE = "RECEIVES_USERS";
export const RECEIVES_USERS_SUCCESS = "RECEIVES_USERS_SUCCESS";

export interface UserListState {
  error?: string;
  loading?: boolean;
  users?: Profile[];
}

export type ReceiveUsersSuccess = Action & {
  users: Profile[];
};

export type ReceiveUsersFailure = Action & {
  error: string;
};

export type UserListActions = ReceiveUsersFailure & ReceiveUsersSuccess;

export const requestUsers = () => ({
  type: REQUESTS_USERS
});

export const receiveUsersFailure = (error: string) => ({
  type: RECEIVES_USERS_FAILURE,
  error
});

export const receiveUsersSuccess = (users: Profile[]) => ({
  type: RECEIVES_USERS_SUCCESS,
  users
});

export const getUsers = (dispatch: Dispatch) => (jwt: string) => {
  dispatch(requestUsers());
  return authAxios(jwt)
    .get(userApi)
    .then(response => {
      dispatch(receiveUsersSuccess(response.data));
    })
    .catch(error => {
      const errorMsg =
        (error && error.response && error.response.data) ||
        "Error getting users, Check you are logged in";
      dispatch(receiveUsersFailure(errorMsg));
    });
};
