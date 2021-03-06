import React from "react";
import { Button, Form, Header, Input, Message } from "semantic-ui-react";
import { Router } from "../../../../server/routes";

export interface Credentials {
  email: string;
  password: string;
}

export interface Props {
  loading: boolean;
  userName?: string;
  error?: string;
  onSubmit: (input: Credentials) => Promise<void>;
}

class LoginForm extends React.Component<Props, Credentials> {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  public handleInput = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  public handleSubmitForm = async () => {
    await this.props.onSubmit({
      email: this.state.email,
      password: this.state.password
    });
    if (this.props.userName && !process.env.STORYBOOK) {
      return Router.pushRoute(`/user/${this.props.userName}`);
    }
  };

  public render() {
    const hasError = !!this.props.error;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Sign In
        </Header>
        <Form
          onSubmit={this.handleSubmitForm}
          loading={this.props.loading}
          error={hasError}
        >
          <Message
            error={true}
            header="Login Error"
            content={this.props.error}
          />
          <Form.Field>
            <Input
              icon="user"
              iconPosition="left"
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email address"
              autoFocus={true}
              onChange={this.handleInput}
              required={true}
            />
          </Form.Field>
          <Form.Field>
            <Input
              icon="lock"
              iconPosition="left"
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleInput}
              required={true}
            />
          </Form.Field>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
