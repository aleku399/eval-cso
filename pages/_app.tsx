import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import withReduxStore from "src/redux/with-redux-store";
import "style/index.css";

class MyApp extends App {
  public render() {
    const { Component, pageProps, reduxStore } = this.props as any;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
