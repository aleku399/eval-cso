import React from "react";
import {
  Button,
  Container,
  Form,
  Input,
  Message,
  Select
} from "semantic-ui-react";

export interface Opt {
  key: string;
  text: string;
  value: string;
}

export interface LoggedIn {
  userName: string;
  role: string;
}

export interface Agent {
  services: string;
  branch: string;
  supervisor: string;
}

export interface Profile {
  userName: string;
  password: string;
  email: string;
  role: string;
  agent?: Agent;
}

export interface Props {
  roleOptions: Opt[];
  editUser: Profile;
  loggedInUser: LoggedIn;
  autoFocus: boolean;
  onSubmit: (data: any) => Promise<void>;
  search: boolean;
  selection: boolean;
  options: Opt[];
  serviceOptions: Opt[];
  branches: Opt[];
  deleteUserHandler: (e) => void;
}

export interface State {
  editUser: Profile;
  emailError?: string;
}

class UserProfile extends React.Component<Props, State> {
  public state: State;

  constructor(props) {
    super(props);

    this.state = {
      editUser: this.props.editUser,
      emailError: null
    };
  }

  public handleInput = event => {
    const name = event.target.name;
    const value = event.target.value;

    const editUser = { ...this.state.editUser, [name]: value };
    this.setState({ editUser });
  };

  public handleDropdownInput = (_event, { name, value }) => {
    const agent = { ...this.state.editUser.agent, [name]: value };
    const editUser = { ...this.state.editUser, agent };
    this.setState({ editUser });
  };

  public validate = (): boolean => {
    if (!this.state.editUser.email.toLowerCase().endsWith("@nssfug.org")) {
      const emailError = "Please provide an nssfug.org email";
      this.setState({ emailError });
      return false;
    }
    this.setState({ emailError: null });
    return true;
  };

  public handleSubmit = async () => {
    if (this.validate()) {
      await this.props.onSubmit(this.state.editUser);
    }
  };

  public getOptions = (role: string, roleOptions: Opt[]) => {
    return role === "Admin"
      ? roleOptions
      : roleOptions.filter(opt => opt.text !== "Admin");
  };

  public deleteUser = (role: string, edit: string) => {
    return role === "Admin" && edit === "Agent" ? (
      <Button
        type="submit"
        style={{ marginTop: "10px" }}
        onClick={this.props.deleteUserHandler}
      >
        Delete Agent
      </Button>
    ) : role === "Admin" && edit === "Admin" ? (
      <Button
        type="submit"
        style={{ marginTop: "10px" }}
        onClick={this.props.deleteUserHandler}
      >
        Delete Admin
      </Button>
    ) : role === "Admin" && edit === "Evaluator" ? (
      <Button
        type="submit"
        style={{ marginTop: "10px" }}
        onClick={this.props.deleteUserHandler}
      >
        Delete Evaluator
      </Button>
    ) : null;
  };

  public adminField = (role: string) => {
    return role === "Admin" ? (
      <Form.Field>
        <label>Roles</label>
        <Select
          placeholder="role"
          name="role"
          options={this.getOptions(
            this.props.loggedInUser.role,
            this.props.roleOptions
          )}
          defaultValue={this.state.editUser.role}
          onChange={this.handleDropdownInput}
        />
      </Form.Field>
    ) : null;
  };

  public agentField = (role: string, edit: string) => {
    return (role === "Admin" || role === "Evaluator" || role === "Agent") &&
      edit === "Agent" ? (
      <span>
        <Form.Field>
          <label>Supervisor</label>
          <Select
            placeholder="Supervisor"
            name="supervisor"
            options={this.props.options}
            search={this.props.search}
            onChange={this.handleDropdownInput}
            defaultValue={this.state.editUser.agent.supervisor}
          />
        </Form.Field>
        <Form.Field>
          <label>Services</label>
          <Select
            placeholder="Email"
            name="services"
            options={this.props.serviceOptions}
            search={this.props.search}
            onChange={this.handleDropdownInput}
            defaultValue={this.state.editUser.agent.services}
          />
        </Form.Field>
        <Form.Field>
          <label>Branches</label>
          <Select
            placeholder="Nakawa"
            name="branch"
            options={this.props.branches}
            onChange={this.handleDropdownInput}
            defaultValue={this.state.editUser.agent.branch}
          />
        </Form.Field>
      </span>
    ) : null;
  };

  public render() {
    const hasError = !!this.state.emailError;

    return (
      <Container>
        <Form error={hasError} onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>User Name</label>
            <Input
              placeholder="Username"
              type="text"
              name="userName"
              minLength={3}
              value={this.state.editUser.userName}
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
              value={this.state.editUser.email}
              onChange={this.handleInput}
              required={true}
            />
          </Form.Field>
          <Message
            error={true}
            header="Email input Error"
            content={this.state.emailError}
          />
          <Form.Field>
            <label>Enter Password</label>
            <Input
              type="password"
              name="password"
              value={this.state.editUser.password}
              onChange={this.handleInput}
              minLength={5}
              required={true}
            />
          </Form.Field>
          {this.adminField(this.props.loggedInUser.role)}
          {this.agentField(
            this.props.loggedInUser.role,
            this.props.editUser.role
          )}
          <Button type="submit" style={{ marginTop: "10px" }}>
            Submit
          </Button>
        </Form>
        {this.deleteUser(
          this.props.loggedInUser.role,
          this.props.editUser.role
        )}
      </Container>
    );
  }
}

export default UserProfile;
