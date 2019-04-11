import { Action } from "redux";

export type ServiceView = "data-view" | "summary-view" | "report-view";

export const CHANGE_SERVICE = "CHANGE_SERVICE";
export const CHANGE_SERVICE_VIEW = "CHANGE_SERVICE_VIEW";

export type ChangeService = Action & {
  service: string;
};

export type ChangeServiceView = Action & {
  qualityView: string;
};

export type ChangeServiceFn = (service: string) => ChangeService;

export const changeService: ChangeServiceFn = service => ({
  type: CHANGE_SERVICE,
  service
});

export type ChangeServiceViewFn = (
  qualityView: ServiceView
) => ChangeServiceView;

export const changeServiceView: ChangeServiceViewFn = qualityView => ({
  type: CHANGE_SERVICE_VIEW,
  qualityView
});
