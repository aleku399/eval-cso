import { Action } from "redux";

export const LOADING_STATUS = "LOADING_STATUS";

export type ChangeLoadingStatus = Action & {
  loading: boolean;
};

export type ChangeLoadingStatusFn = (loading: boolean) => ChangeLoadingStatus;

export const changeLoadingStatus: ChangeLoadingStatusFn = loading => ({
  type: LOADING_STATUS,
  loading
});
