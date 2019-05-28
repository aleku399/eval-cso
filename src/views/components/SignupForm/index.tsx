import { AxiosPromise } from "axios";
import * as React from "react";
import { Button, Form, Header, Input, Message } from "semantic-ui-react";
import { Router } from "../../../../server/routes";

export interface Props {
  onSubmit: (data: SignupData) => AxiosPromise<void>;
}

export interface SignupData {
  userName: string;
  fullName: string;
  email: string;
  password: string;
}

interface State {
  form: SignupData;
  loading: boolean;
  error?: string;
}

export default class Signup extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      form: {
        userName: "",
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
      this.setState({ error: emailError });
      return false;
    }
    this.setState({ error: null });
    return true;
  };

  public handleSubmit = async (): Promise<void> => {
    if (this.validate()) {
      this.setState({ loading: true });

      this.props
        .onSubmit(this.state.form)
        .then(response => {
          this.setState({ loading: false });
          if (response.status !== 200) {
            this.setState({ error: "Error signing up, please contact IT" });
          }
          if (!process.env.STORYBOOK) {
            Router.pushRoute("/login");
          }
        })
        .catch(error => {
          this.setState({ error: error.toString(), loading: false });
        });
    }
  };

  public render() {
    const hasError = !!this.state.error;
    return (
      <div>
        <Header as="h3" textAlign="center">
          Sign Up
        </Header>
        <Form
          error={hasError}
          onSubmit={this.handleSubmit}
          loading={this.state.loading}
        >
          <Form.Field>
            <label>UserName</label>
            <Input
              placeholder="nick name"
              type="text"
              name="userName"
              minLength={3}
              value={this.state.form.userName}
              onChange={this.handleInput}
              required={true}
            />
          </Form.Field>
          <Form.Field>
            <label>FullName</label>
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
          <Button
            data-testid="submitButton"
            className="ui submit button"
            type="submit"
          >
            Sign Up
          </Button>
          <Message
            error={true}
            header="Signup Error"
            content={this.state.error}
          />
        </Form>
      </div>
    );
  }
}
