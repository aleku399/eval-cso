import { Action } from "redux";
import { Services } from "../../lib/serviceData";

export const CHANGE_SERVICE = "CHANGE_SERVICE";

export type ChangeService = Action & {
  service: Services;
};

export type ServiceActions = ChangeService;

export type ChangeServiceFn = (service: Services) => ChangeService;

export const changeService: ChangeServiceFn = service => ({
  type: CHANGE_SERVICE,
  service
});
