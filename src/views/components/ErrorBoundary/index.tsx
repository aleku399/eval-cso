import * as React from "react";
import { Message } from "semantic-ui-react";
import { Development } from "../../../lib/constants";

interface State {
  error?: string;
  errorInfo?: any;
}

interface Props {
  children: any;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  public componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  public render() {
    return this.state.errorInfo ? (
      <Message error={true} floating={true}>
        {this.state.error && this.state.error.toString()}
        <br />
        {process.env.NODE_ENV === Development
          ? this.state.errorInfo.componentStack
          : null}
      </Message>
    ) : (
      this.props.children
    );
  }
}
