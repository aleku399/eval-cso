import React from "react";
import { configureStore } from ".";
import { AppState } from "./reducers";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState?: AppState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return configureStore(initialState);
  }

  const version = window.localStorage.getItem("version");
  const jwt = window.localStorage.getItem("token");
  const profile = JSON.parse(window.localStorage.getItem("profile"));
  const appState = version === process.env.version ? { login: {jwt, profile } } : {};

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window.localStorage.setItem("version", process.env.version);
    window[__NEXT_REDUX_STORE__] = configureStore(appState);
  }

  const login = { ...window[__NEXT_REDUX_STORE__].login, jwt };
  return { ...window[__NEXT_REDUX_STORE__], ...login };
}

export default (App: any) => {
  return class AppWithRedux extends React.Component {
    public static async getInitialProps(appContext: any) {
      const reduxStore = getOrCreateStore();
      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      };
    }
    private reduxStore: any;

    constructor(props: any) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    public render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
