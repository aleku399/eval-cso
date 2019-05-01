import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { Development } from "../lib/envs";
import rootReducers, { AppState } from "./reducers";

let store = null;

export const configureStore = (initialState?: AppState): Store => {
  if (!store) {
    const middleWare =
      process.env.NODE_ENV === Development
        ? composeWithDevTools(applyMiddleware(thunkMiddleware))
        : applyMiddleware(thunkMiddleware);

    store = createStore(rootReducers, initialState, middleWare);
  }
  return store;
};

export const getStore = (): Store => {
  return store;
};
