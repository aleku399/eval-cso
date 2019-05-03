import { Action } from "redux";

export const CHANGE_SERVICE = "CHANGE_SERVICE";

export type ChangeService = Action & {
  service: string;
};

export type ServiceActions = ChangeService;

export type ChangeServiceFn = (service: string) => ChangeService;

export const changeService: ChangeServiceFn = service => ({
  type: CHANGE_SERVICE,
  service
});
