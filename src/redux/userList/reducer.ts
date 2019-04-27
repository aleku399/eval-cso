import {
  RECEIVES_USERS_FAILURE,
  RECEIVES_USERS_SUCCESS,
  REQUESTS_USERS,
  UserListActions,
  UserListState
} from "./action";

const initialState: UserListState = {
  loading: false
};

export function userListReducer(
  state: UserListState = initialState,
  action: UserListActions
): UserListState {
  switch (action.type) {
    case REQUESTS_USERS:
      return { ...state, loading: true };
    case RECEIVES_USERS_SUCCESS:
      return { ...state, loading: false, users: action.users };
    case RECEIVES_USERS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
