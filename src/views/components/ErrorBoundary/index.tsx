import Link from "next/link";
import * as React from "react";
import { Message } from "semantic-ui-react";
import { Development } from "../../../lib/envs";

interface State {
  error?: string | Error;
  errorInfo?: any;
}

interface Props {
  children: any;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  public componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  public render() {
    const err = this.state.error;
    return this.state.errorInfo ? (
      <Message error={true} floating={true}>
        {err && err.toString()}
        <br />
        <Link href="/login">
          <a>Login</a>
        </Link>
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
