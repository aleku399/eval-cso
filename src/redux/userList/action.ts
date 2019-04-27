import { Action, Dispatch } from "redux";
import { User } from "../../views/components/UserTable";
import { authAxios } from "../axios";

export const REQUESTS_USERS = "REQUESTS_USERS";
export const RECEIVES_USERS_FAILURE = "RECEIVES_USERS";
export const RECEIVES_USERS_SUCCESS = "RECEIVES_USERS_SUCCESS";

const userListApi = "/users";

export interface UserListState {
  error?: string;
  loading?: boolean;
  users?: User[];
}

export type RequestUsers = Action & {
  loading: boolean;
};

export type ReceiveUsersSuccess = Action & {
  loading: boolean;
  users: User[];
};

export type ReceiveUsersFailure = Action & {
  loading: boolean;
  error: string;
};

export type UserListActions = ReceiveUsersFailure &
  ReceiveUsersSuccess &
  RequestUsers;

export const requestUsers = () => ({
  type: REQUESTS_USERS
});

export const receiveUsersFailure = (error: string) => ({
  type: RECEIVES_USERS_FAILURE,
  error
});

export const receiveUsersSuccess = (users: User[]) => ({
  type: RECEIVES_USERS_SUCCESS,
  users
});

export const getUsers = (dispatch: Dispatch) => (jwt: string) => {
  dispatch(requestUsers());
  return authAxios(jwt)
    .get(userListApi)
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
