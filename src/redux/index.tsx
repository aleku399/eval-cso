import { AnyAction, applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { LOADING_STATUS } from "./global/actions";
import {
  CHANGE_SERVICE,
  CHANGE_SERVICE_VIEW,
  ServiceView
} from "./services/actions";

export interface AppState {
  service: string;
  qualityView: ServiceView;
  loading: boolean;
  userId?: string;
  userName?: string;
  userRole?: string;
}

const appState = {
  loading: true,
  service: "call",
  qualityView: "enter-score"
};

let store = null;

const reducer = (state: AppState, action: AnyAction): AppState => {
  switch (action.type) {
    case CHANGE_SERVICE:
      return { ...state, service: action.service };
    case CHANGE_SERVICE_VIEW:
      return { ...state, qualityView: action.qualityView };
    case LOADING_STATUS:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};

export const configureStore = (initialState: any = appState): Store => {
  if (!store) {
    store = createStore(
      reducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
  }
  return store;
};

export const getStore = (): Store => {
  return store;
};
