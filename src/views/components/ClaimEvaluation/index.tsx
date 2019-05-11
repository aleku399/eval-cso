import { AxiosPromise } from "axios";
import * as React from "react";
import {
  Button,
  Checkbox,
  DropdownItemProps,
  Form,
  Message,
  TextArea
} from "semantic-ui-react";
import { mkOptionsFromUser } from "../../../lib/helper";
import SearchableDropdown from "../SearchableDropdown";
import { ClaimType } from "../UpdateClaimTypes";
import { ADMIN, Profile } from "../UserProfile";

interface Evaluation {
  claimType: string;
  details: string;
  workflowNumber: number;
  agentName: string;
  comment: string;
  date: string;
  allParametersMet: boolean;
}

interface ClaimPayload extends Evaluation {
  evaluator: string;
}

export type SubmitClaimEvaluation = (
  data: ClaimPayload
) => AxiosPromise<{ id: number }>;

export interface Props {
  agents: Profile[];
  claimTypes: ClaimType[];
  evaluator: Profile;
  onSubmit: SubmitClaimEvaluation;
  loading?: boolean;
  error?: string;
}

export interface State {
  claim: Evaluation;
  error: string;
  loading: boolean;
  feedback?: string;
}

class ClaimEvaluation extends React.Component<Props, State> {
  public workflowNumber: string = "workflowNumber";

  constructor(props) {
    super(props);

    this.state = {
      claim: {
        claimType: "",
        details: "",
        date: "",
        comment: "",
        workflowNumber: 0,
        agentName: "",
        allParametersMet: false
      },
      loading: props.loading,
      error: props.error
    };
  }

  public clearInput = () => {
    const claim = {
      ...this.state.claim,
      claimType: "",
      workflowNumber: 0,
      comment: "",
      allParametersMet: false
    };
    this.setState({ claim });
  };

  public submitForm = async (): Promise<void> => {
    if (this.validate()) {
      this.setState({ loading: true });
      const date = this.state.claim.date
        ? new Date(this.state.claim.date)
        : new Date();
      const claim = {
        ...this.state.claim,
        evaluator: this.props.evaluator.userName,
        date: date.toISOString()
      };
      this.props
        .onSubmit(claim)
        .then(response => {
          if (response.data.id) {
            this.setState({
              loading: false,
              feedback: "Added new claim evaluation"
            });
            this.clearInput();
          }
        })
        .catch(error => {
          this.setState({ loading: false, error: error.toString() });
        });
    }
  };

  public validate = (): boolean => {
    if (!this.state.claim.agentName) {
      this.setState({ error: "Please select an agent" });
      return false;
    }

    if (!this.state.claim.claimType) {
      this.setState({ error: "Please select a claim" });
      return false;
    }
    this.setState({ error: null });
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

  public claimTypeOptions = (claimTypes: ClaimType[]): DropdownItemProps[] => {
    return claimTypes.map(claimType => {
      return {
        key: claimType.value,
        value: claimType.value,
        text: claimType.name
      };
    });
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
    const hasError = !!this.state.error;
    return (
      <Form
        loading={this.props.loading}
        error={hasError}
        onSubmit={this.submitForm}
      >
        <Message
          hidden={!this.state.feedback}
          positive={true}
          floating={true}
          content={this.state.feedback}
        />
        <Message
          error={true}
          header="Evaluation input data Error"
          content={this.state.error}
        />
        <Form.Field>
          <label>Agents</label>
          <SearchableDropdown
            placeholder="Select an Agent"
            options={mkOptionsFromUser(this.props.agents)}
            onChange={this.handleDropDownInput}
            name="agentName"
          />
        </Form.Field>
        <Form.Field>
          <label>Type of claim</label>
          <SearchableDropdown
            placeholder="Select a claim type"
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
        {this.props.evaluator.role === ADMIN ? (
          <Form.Field>
            <Form.Input
              type="date"
              name="date"
              value={this.state.claim.date}
              label="Submit date"
              required={true}
              onChange={this.handleInput}
            />
          </Form.Field>
        ) : null}
        <Form.Field>
          <label>comment</label>
          <TextArea
            placeholder="Add comment"
            onChange={this.handleInput}
            value={this.state.claim.comment}
            name="comment"
          />
        </Form.Field>

        <Form.Field>
          <label>Details</label>
          <TextArea
            placeholder="Add detail"
            onChange={this.handleInput}
            value={this.state.claim.details}
            name="details"
          />
        </Form.Field>
        <Button className="ui submit button" type="submit">
          Submit
        </Button>
        <Message
          error={true}
          header="Agents and Claim are mandatory"
          content={this.state.error}
        />
      </Form>
    );
  }
}

export default ClaimEvaluation;
