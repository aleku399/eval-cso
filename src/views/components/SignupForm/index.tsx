import Router from "next/router";
import * as React from "react";
import { Button, Form, Header, Input, Message } from "semantic-ui-react";

export interface Props {
  autoFocus?: boolean;
  error?: string;
  loading?: boolean;
  onSubmit: (data: SignupData) => Promise<void>;
}

export interface SignupData {
  name: string;
  fullName: string;
  email: string;
  password: string;
}

interface State {
  form: SignupData;
  emailError?: string;
}

export default class Signup extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        fullName: "",
        email: "",
        password: ""
      }
    };
  }

  public handleInput = e => {
    const value = e.target.value;
    const name = e.target.name;
    const form = { ...this.state.form, [name]: value };
    this.setState({ form });
  };

  public validate = (): boolean => {
    if (!this.state.form.email.toLowerCase().endsWith("@nssfug.org")) {
      const emailError = "Please provide an nssfug.org email";
      this.setState({ emailError });
      return false;
    }
    this.setState({ emailError: null });
    return true;
  };

  public handleSubmit = async (): Promise<void> => {
    if (!this.validate()) {
      return;
    }

    await this.props.onSubmit(this.state.form);

    if (!this.props.error && !process.env.STORYBOOK) {
      Router.push("/login");
    }
  };

  public render() {
    const hasError = !!this.state.emailError || !!this.props.error;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Sign Up
        </Header>
        <Form error={hasError} onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>UserName</label>
            <Input
              placeholder="nick name"
              type="text"
              name="name"
              minLength={3}
              value={this.state.form.name}
              onChange={this.handleInput}
              required={true}
            />
          </Form.Field>
          <Form.Field>
            <label>Full Name</label>
            <Input
              placeholder="Full Name"
              type="text"
              name="fullName"
              minLength={3}
              value={this.state.form.fullName}
              onChange={this.handleInput}
              required={true}
            />
          </Form.Field>

          <Form.Field>
            <label>Email</label>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={this.state.form.email}
              onChange={this.handleInput}
              required={true}
            />
            <Message
              error={true}
              header="Email input Error"
              content={this.state.emailError}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.form.password}
              onChange={this.handleInput}
              minLength={5}
              required={true}
            />
          </Form.Field>
          <Button className="ui submit button" type="submit">
            Sign Up
          </Button>
          <Message
            error={true}
            header="Signup Error"
            content={this.props.error}
          />
        </Form>
      </div>
    );
  }
}
