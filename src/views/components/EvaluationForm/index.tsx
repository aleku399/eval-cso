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
import { Profile } from "../UserProfile";

export interface Parameter {
  name: string;
  value: string;
}

export interface EvalState {
  agentName: string;
  reason: string;
  customer: number;
  date: string;
  comment: string;
  duration: number;
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
  evaluator: string;
  agents: Profile[];
  parameterCategories: ParameterCategory[];
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
        reason: "",
        customer: 0,
        agentName: "",
        duration: 0
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
    const isChecked = checked;
    const parameters = isChecked
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
      const date = new Date(this.state.evaluation.date);

      const payload: CreateEvaluation = {
        evalAttrs: {
          ...this.state.evaluation,
          service: this.props.service,
          evaluator: this.props.evaluator,
          customer: Number(this.state.evaluation.customer),
          duration: this.state.evaluation.duration
            ? Number(this.state.evaluation.duration)
            : null,
          date: date.toISOString()
        },
        parameters
      };
      this.props
        .onSubmit(payload)
        .then(response => {
          if (response.data.id) {
            this.setState({ loading: false, feedback: "Added new evaluation" });
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
            type="number"
            fluid={true}
            label="Customer Number"
            name="customer"
            value={this.state.evaluation.customer || ""}
            required={true}
            onChange={this.handleInput}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            type="text"
            name="reason"
            value={this.state.evaluation.reason}
            fluid={true}
            label={`${this.props.service} reason`}
            required={true}
            onChange={this.handleInput}
          />

          <Form.Input
            type="date"
            name="date"
            value={this.state.evaluation.date}
            label="Submit date"
            required={true}
            onChange={this.handleInput}
          />
        </Form.Group>
        <Form.Group widths="equal">
          {this.renderReasons(this.props.parameterCategories)}
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field inline={true}>
            <TextArea
              type="text"
              name="comment"
              value={this.state.evaluation.comment}
              placeholder="Write your comment"
              onChange={this.handleInput}
            />
          </Form.Field>
          <Form.Input
            type="number"
            fluid={true}
            label="Duration"
            name="duration"
            value={this.state.evaluation.duration || ""}
            onChange={this.handleInput}
          />
        </Form.Group>
        <Form.Field>
          <Button type="submit">Submit</Button>
        </Form.Field>
        <Message
          error={true}
          header="Evaluation input data Error"
          content={this.state.error}
        />
      </Form>
    );
  }
}
