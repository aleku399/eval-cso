import React from "react";
import { Container, Message } from "semantic-ui-react";
import Layout from "src/views/templates/Layout";

export interface Props {
  statusCode: number;
}

class Error extends React.Component<Props, {}> {
  public static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  public render() {
    return (
      <Layout>
        <Container textAlign="center">
          {this.props.statusCode ? (
            <Message negative={true}>
              <Message.Header>Something unexpected happened</Message.Header>
              <p>{`An error ${this.props.statusCode} occurred on server`}</p>
            </Message>
          ) : (
            "An error occurred on client"
          )}
        </Container>
      </Layout>
    );
  }
}

export default Error;
