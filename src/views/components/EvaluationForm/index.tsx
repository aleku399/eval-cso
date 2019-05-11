import { AxiosPromise } from "axios";
import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Header,
  List,
  Message,
  TextArea
} from "semantic-ui-react";
import { mkOptionsFromUser } from "../../../lib/helper";
import SearchableDropdown from "../SearchableDropdown";
import { ParameterCategory } from "../UpdateServiceType";
import { ADMIN, Profile } from "../UserProfile";

export interface Parameter {
  name: string;
  value: string;
}

export interface EvalState {
  agentName: string;
  customerTel: number;
  date: string;
  comment: string;
  details: string;
}

interface Evaluation extends EvalState {
  parameters: string[];
}

interface EvalAttrs extends EvalState {
  service: string;
  evaluator: string;
}

export interface CreateEvaluation {
  evalAttrs: EvalAttrs;
  parameters: string[];
}

export type ParamCategoryName = "deviation" | "zeroRated";

export const deviation: ParamCategoryName = "deviation";
export const zeroRated: ParamCategoryName = "zeroRated";

interface State {
  evaluation: Evaluation;
  loading: boolean;
  error: string;
  feedback?: string;
}

export type SubmitEvaluation = (
  data: CreateEvaluation
) => AxiosPromise<{ id: number }>;
export interface Props {
  onSubmit: SubmitEvaluation;
  loading?: boolean;
  error?: string;
  service: string;
  evaluator: Profile;
  agents: Profile[];
  parameterCategories: ParameterCategory[];
  reasons: string[];
}

export default class EvaluationForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  public initialState(): State {
    return {
      feedback: null,
      evaluation: {
        parameters: [],
        comment: "",
        date: "",
        customerTel: 0,
        agentName: "",
        details: ""
      },
      error: this.props.error,
      loading: this.props.loading
    };
  }

  public componentDidUpdate(prevProps: Props) {
    if (
      prevProps.loading !== this.props.loading ||
      prevProps.error !== this.props.error
    ) {
      this.setState({
        error: this.props.error,
        loading: this.props.loading
      });
    }
  }

  public renderParameters = (parameters: Parameter[]) => {
    return parameters.map(parameter => {
      return (
        <List key={parameter.name}>
          <Checkbox
            label={parameter.name}
            name={parameter.value}
            type="checkbox"
            onChange={this.handleChange}
          />
        </List>
      );
    });
  };

  public renderReasons = (parameterCategories: ParameterCategory[]) => {
    return parameterCategories.map(category => {
      return (
        <Form.Field inline={true} key={category.value}>
          <Header as="h3">{category.name}</Header>
          <ul>{this.renderParameters(category.parameters)}</ul>
        </Form.Field>
      );
    });
  };

  public handleDropDownInput = (_event, { name, value }): void => {
    const evaluation = { ...this.state.evaluation, [name]: value };
    return this.setState({ evaluation });
  };

  public handleChange = async (_event, { name, checked }): Promise<void> => {
    const parameterValue = name;
    const parameters = checked
      ? [...this.state.evaluation.parameters, parameterValue]
      : this.state.evaluation.parameters;
    const evaluation = { ...this.state.evaluation, parameters };
    this.setState({ evaluation });
  };

  public handleInput = (event: any): void => {
    const name = event.target.name;
    const value = event.target.value;
    const evaluation = { ...this.state.evaluation, [name]: value };
    this.setState({ evaluation });
  };

  public validate = (): boolean => {
    if (!this.state.evaluation.parameters.length) {
      this.setState({
        error: "Please check at least one parameter",
        feedback: null
      });
      return false;
    }
    if (!this.state.evaluation.agentName) {
      this.setState({ error: "Please select an agent" });
      return false;
    }
    this.setState({ error: null });
    return true;
  };

  public clearInput() {
    const evaluation = {
      ...this.state.evaluation,
      comment: "",
      reason: "",
      customer: 0
    };
    this.setState({ evaluation });
  }

  public handleSubmit = async (): Promise<void> => {
    if (this.validate()) {
      this.setState({ loading: true });
      const parameters = this.state.evaluation.parameters;
      const date = this.state.evaluation.date
        ? new Date(this.state.evaluation.date)
        : new Date();

      const payload: CreateEvaluation = {
        evalAttrs: {
          ...this.state.evaluation,
          service: this.props.service,
          evaluator: this.props.evaluator.userName,
          customerTel: this.state.evaluation.customerTel,
          date: date.toISOString()
        },
        parameters
      };
      this.props
        .onSubmit(payload)
        .then(response => {
          if (response.data.id) {
            this.setState({
              loading: false,
              feedback: `Added new  ${this.props.service} evaluation`
            });
            this.clearInput();
          }
        })
        .catch(error => {
          this.setState({ loading: false, error: error.toString() });
        });
    }
  };

  public render() {
    const hasError = !!this.state.error;
    return (
      <Form
        onSubmit={this.handleSubmit}
        error={hasError}
        loading={this.state.loading}
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
        <Form.Group widths="equal">
          <Form.Field inline={true}>
            <label> Agent Names</label>
            <SearchableDropdown
              name="agentName"
              placeholder="Select an Agent"
              options={mkOptionsFromUser(this.props.agents)}
              onChange={this.handleDropDownInput}
            />
          </Form.Field>
          <Form.Input
            type="tel"
            fluid={true}
            label="Phone Number"
            name="customerTel"
            minLength={10}
            maxLength={10}
            pattern="[0]{1}[0-9]{9}"
            value={this.state.evaluation.customerTel || ""}
            required={true}
            onChange={this.handleInput}
          />
        </Form.Group>

        <Form.Group widths={this.props.evaluator.role === ADMIN ? "equal" : 8}>
          <Form.Field
            inline={true}
            width={this.props.evaluator.role === ADMIN ? 16 : 8}
          >
            <label>Reasons</label>
            <SearchableDropdown
              placeholder="reason"
              name="reason"
              fluid={true}
              values={this.props.reasons}
              onChange={this.handleDropDownInput}
            />
          </Form.Field>
          {this.props.evaluator.role === ADMIN ? (
            <Form.Input
              type="date"
              name="date"
              value={this.state.evaluation.date}
              label="Submit date"
              required={true}
              onChange={this.handleInput}
            />
          ) : null}
        </Form.Group>
        <Form.Group widths="equal">
          {this.renderReasons(this.props.parameterCategories)}
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field inline={true}>
            <label>Comments</label>
            <TextArea
              type="text"
              name="comment"
              value={this.state.evaluation.comment}
              placeholder="Write your comment"
              onChange={this.handleInput}
            />
          </Form.Field>
          <Form.Field inline={true}>
            <label>Details</label>
            <TextArea
              type="text"
              name="details"
              value={this.state.evaluation.details}
              placeholder="Add details"
              onChange={this.handleInput}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Button type="submit">Submit</Button>
        </Form.Field>
      </Form>
    );
  }
}
