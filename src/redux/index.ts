import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducers, { AppState } from "./reducers";

let store = null;

export const configureStore = (initialState?: AppState): Store => {
  if (!store) {
    store = createStore(
      rootReducers,
      initialState,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
  }
  return store;
};

export const getStore = (): Store => {
  return store;
};
