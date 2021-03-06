import { Services } from "../../lib/serviceData";
import { CHANGE_SERVICE, ServiceActions } from "./actions";

export interface ServiceState {
  active: Services;
}

const initialState: ServiceState = {
  active: "call"
};

export function serviceReducer(
  state: ServiceState = initialState,
  action: ServiceActions
): ServiceState {
  switch (action.type) {
    case CHANGE_SERVICE:
      return { ...state, active: action.service };
    default:
      return state;
  }
}
