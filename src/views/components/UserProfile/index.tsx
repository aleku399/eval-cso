import Router from "next/router";
import React from "react";
import { Button, Container, Form, Input, Message } from "semantic-ui-react";
import { mkOptionsFromUser } from "../../../lib/helper";
import SearchableDropdown from "../SearchableDropdown";

export type Role = "admin" | "agent" | "evaluator" | "supervisor";

export const ADMIN: Role = "admin";
export const AGENT: Role = "agent";
export const EVALUATOR: Role = "evaluator";
export const SUPERVISOR: Role = "supervisor";

export interface Agent {
  branch?: string;
  supervisor?: string;
}

export interface Profile {
  userName: string;
  fullName: string;
  email: string;
  role: Role;
}

export interface ProfileUpdate {
  userName: string;
  user: Profile;
  password?: string;
  agent?: Agent;
}

export interface Props {
  editUser: Profile;
  agent?: Agent;
  error?: string;
  loading?: boolean;
  loggedInUser: Profile;
  onSubmit: (data: ProfileUpdate) => Promise<any>;
  supervisors: Profile[];
  branches: string[];
  deleteUserHandler: (userName: string) => Promise<void>;
}

export interface State {
  editUser?: Profile;
  agent?: Agent;
  password?: string;
  error?: string;
  feedback?: string;
  loading?: boolean;
}

const roles = [ADMIN, AGENT, SUPERVISOR, EVALUATOR];

class UserProfile extends React.Component<Props, State> {
  public state: State;
  public defaultAgent: Agent = { supervisor: "", branch: "" };

  constructor(props) {
    super(props);
    this.state = this.initState();
  }

  public componentDidUpdate(prevProps: Props) {
    if (
      prevProps.loading !== this.props.loading ||
      prevProps.error !== this.props.error
    ) {
      this.setState(this.initState());
    }
  }

  public initState() {
    return {
      agent: this.props.agent || this.defaultAgent,
      editUser: this.props.editUser,
      loading: this.props.loading,
      error: this.props.error
    };
  }

  public handleInput = event => {
    const name = event.target.name;
    const value = event.target.value;
    const password = name === "password" ? value : null;
    const editUser = { ...this.state.editUser, [name]: value };
    this.setState({ editUser, password });
  };

  public handleDropdownInput = (_event, { name, value }) => {
    const agent = { ...this.state.agent, [name]: value.length ? value : null };
    const editUser =
      name === "role"
        ? { ...this.state.editUser, role: value }
        : this.state.editUser;
    this.setState({ agent, editUser });
  };

  public validate = (): boolean => {
    if (!this.state.editUser.email.toLowerCase().endsWith("@nssfug.org")) {
      const error = "Please provide an nssfug.org email";
      this.setState({ error });
      return false;
    }
    this.setState({ error: null });
    return true;
  };

  public handleSubmit = async (): Promise<void> => {
    if (this.validate()) {
      this.setState({ loading: true });
      this.props
        .onSubmit({
          user: this.state.editUser,
          agent: this.state.agent,
          password: this.state.password,
          userName: this.props.editUser.userName
        })
        .then(() => {
          // TODO: logout user after altering password
          this.setState({
            loading: false,
            feedback: "Submitted data Successfully"
          });
        })
        .catch(error => {
          this.setState({ error: error.toString(), loading: false });
        });
    }
  };

  public deleteUserHandler = async _event => {
    if (this.validate()) {
      this.setState({ loading: true });
      this.props
        .deleteUserHandler(this.props.editUser.userName)
        .then(() => {
          this.setState({ loading: false });
          if (!process.env.STORYBOOK) {
            Router.push("/");
          }
        })
        .catch(error =>
          this.setState({ error: error.toString(), loading: false })
        );
    }
  };

  public getRoles = (role: string) => {
    return role === ADMIN ? roles : roles.filter(opt => opt !== ADMIN);
  };

  public deleteUserButton = () => {
    return (
      <Form.Field>
        <Button onClick={this.deleteUserHandler}>
          Delete {this.props.editUser.role}
        </Button>
      </Form.Field>
    );
  };

  public deleteUser = (activeUserRole: string, editUserRole: string) => {
    return activeUserRole === ADMIN && editUserRole === AGENT
      ? this.deleteUserButton()
      : activeUserRole === ADMIN && editUserRole === ADMIN
      ? this.deleteUserButton()
      : activeUserRole === ADMIN && editUserRole === EVALUATOR
      ? this.deleteUserButton()
      : null;
  };

  public renderAdminRoleField = (activeUserRole: string) => {
    return activeUserRole === ADMIN ? (
      <Form.Field>
        <Form.Field>
          <label>Roles</label>
          <SearchableDropdown
            name="role"
            values={roles}
            search={false}
            value={this.state.editUser.role}
            onChange={this.handleDropdownInput}
          />
        </Form.Field>
      </Form.Field>
    ) : null;
  };

  public renderPasswordField = (activeUserRole: string) => {
    return activeUserRole === ADMIN && this.props.editUser.userName ? (
      <Form.Field>
        <label>Password</label>
        <Input
          placeholder="New Password"
          type="password"
          name="password"
          minLength={5}
          value={this.state.password}
          onChange={this.handleInput}
        />
      </Form.Field>
    ) : null;
  };

  public renderAgentFields = (editedUserRole: Role) => {
    return editedUserRole === AGENT ? (
      <Form.Field>
        <Form.Field>
          <label>Supervisor</label>
          <SearchableDropdown
            placeholder="Supervisor"
            name="supervisor"
            options={mkOptionsFromUser(this.props.supervisors)}
            search={false}
            onChange={this.handleDropdownInput}
            value={this.state.agent.supervisor}
          />
        </Form.Field>
        <Form.Field>
          <label>Branch</label>
          <SearchableDropdown
            placeholder="BranchName"
            name="branch"
            values={this.props.branches}
            onChange={this.handleDropdownInput}
            value={this.state.agent.branch}
          />
        </Form.Field>
      </Form.Field>
    ) : null;
  };

  public render() {
    const hasError = !!this.state.error;
    return (
      <Container>
        <Form
          error={hasError}
          onSubmit={this.handleSubmit}
          loading={!!this.state.loading}
        >
          <Message
            floating={true}
            positive={true}
            hidden={!this.state.feedback}
            content={this.state.feedback}
          />
          <Message
            error={true}
            header="User Profile Errors"
            content={this.state.error}
          />
          <Form.Field>
            <label>UserName</label>
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
            <label>FullName</label>
            <Input
              placeholder="Full Name"
              type="text"
              name="fullName"
              minLength={3}
              value={this.state.editUser.fullName}
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
          {this.renderAdminRoleField(this.props.loggedInUser.role)}
          {this.renderPasswordField(this.props.loggedInUser.role)}
          {this.renderAgentFields(this.props.editUser.role)}
          <Form.Field>
            <Button type="submit">Submit</Button>
          </Form.Field>
          {this.deleteUser(
            this.props.loggedInUser.role,
            this.props.editUser.role
          )}
        </Form>
      </Container>
    );
  }
}

export default UserProfile;
