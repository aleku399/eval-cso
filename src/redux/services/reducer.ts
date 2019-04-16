import {
  CHANGE_SERVICE,
  CHANGE_SERVICE_VIEW,
  ServiceActions,
  ServiceView
} from "./actions";

export interface ServiceState {
  active: string;
  serviceView: ServiceView;
}

const initialState: ServiceState = {
  active: "call",
  serviceView: "data-view"
};

export function serviceReducer(
  state: ServiceState = initialState,
  action: ServiceActions
): ServiceState {
  switch (action.type) {
    case CHANGE_SERVICE:
      return { ...state, active: action.service };
    case CHANGE_SERVICE_VIEW:
      return { ...state, serviceView: action.serviceView };
    default:
      return state;
  }
}
