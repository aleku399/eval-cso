import * as React from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Message,
  TextArea
} from "semantic-ui-react";

export interface Props {
  agents: string[];
  claimTypes: string[];
  evaluator: string;
  onSubmit: (data: ClaimsEvaluation) => Promise<void>;
  loading: boolean;
}

interface ClaimsEvaluation {
  claimType: string;
  workflowNumber: number;
  agent: string;
  comments: string;
  allParametersMet: boolean;
}

interface AgentOptions {
  key: string;
  value: string;
  text: string;
}

interface ClaimTypeOptions {
  key: string;
  value: string;
  text: string;
}

export interface State {
  claim: ClaimsEvaluation;
  dropdownError: string;
}

class ClaimEvaluation extends React.Component<Props, State> {
  public workflowNumber: string = "workflowNumber";

  constructor(props) {
    super(props);

    this.state = {
      claim: {
        claimType: "",
        workflowNumber: 0,
        agent: "",
        comments: "",
        allParametersMet: false
      },
      dropdownError: null
    };
  }

  public clearInput = () => {
    const claim = {
      ...this.state.claim,
      claimType: "",
      workflowNumber: 0,
      comments: "",
      allParametersMet: false
    };
    this.setState({ claim });
  };

  public submitForm = async (): Promise<void> => {
    if (this.validate()) {
      this.props.onSubmit(this.state.claim);
      this.clearInput();
    }
  };

  public validate = (): boolean => {
    if (!this.state.claim.agent) {
      this.setState({ dropdownError: "Please select an agent" });
      return false;
    }

    if (!this.state.claim.claimType) {
      this.setState({ dropdownError: "Please select a claim" });
      return false;
    }
    this.setState({ dropdownError: null });
    return true;
  };

  public handleCheckbox = (_event, { name, checked }): void => {
    const claim = { ...this.state.claim, [name]: checked };
    return this.setState({ claim });
  };

  public handleDropDownInput = (_event, { name, value }): void => {
    const claim = { ...this.state.claim, [name]: value };
    return this.setState({ claim });
  };

  public agentOptions = (agents: string[]): AgentOptions[] => {
    return agents.map(
      (agent): AgentOptions => {
        return {
          key: agent,
          value: agent.toLowerCase(),
          text: agent
        };
      }
    );
  };

  public claimTypeOptions = (claimTypes: string[]): ClaimTypeOptions[] => {
    return claimTypes.map(
      (claimType): ClaimTypeOptions => {
        return {
          key: claimType,
          value: claimType.toLowerCase(),
          text: claimType
        };
      }
    );
  };

  public handleInput = (event): any => {
    const name = event.target.name;
    const value =
      name === this.workflowNumber
        ? Number(event.target.value)
        : event.target.value;
    const claim = { ...this.state.claim, [name]: value };
    this.setState({ claim });
  };

  public render() {
    const hasError = !!this.state.dropdownError;
    return (
      <Form
        loading={this.props.loading}
        error={hasError}
        onSubmit={this.submitForm}
      >
        <Form.Field>
          <label>Agents</label>
          <Dropdown
            placeholder="Select Agent"
            fluid={true}
            search={true}
            selection={true}
            options={this.agentOptions(this.props.agents)}
            onChange={this.handleDropDownInput}
            name="agent"
          />
        </Form.Field>
        <Form.Field>
          <label>Type of claim</label>
          <Dropdown
            placeholder="Select claim"
            fluid={true}
            search={true}
            selection={true}
            options={this.claimTypeOptions(this.props.claimTypes)}
            onChange={this.handleDropDownInput}
            name="claimType"
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="All parameters met"
            onChange={this.handleCheckbox}
            checked={this.state.claim.allParametersMet}
            name="allParametersMet"
          />
        </Form.Field>
        <Form.Field>
          <label>work flow number</label>
          <input
            placeholder="Add workflow number"
            value={this.state.claim.workflowNumber || ""}
            type="number"
            onChange={this.handleInput}
            required={true}
            name={this.workflowNumber}
          />
        </Form.Field>
        <Form.Field>
          <label>comment</label>
          <TextArea
            placeholder="Add comment"
            onChange={this.handleInput}
            value={this.state.claim.comments}
            name="comments"
          />
        </Form.Field>
        <Button className="ui submit button" type="submit">
          Submit
        </Button>
        <Message
          error={true}
          header="Agents and Claim are mandatory"
          content={this.state.dropdownError}
        />
      </Form>
    );
  }
}

export default ClaimEvaluation;
