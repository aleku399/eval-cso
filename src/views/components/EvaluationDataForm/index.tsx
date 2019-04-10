import React from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Header,
  List,
  Message,
  TextArea
} from "semantic-ui-react";

interface Parameter {
  name: string;
  value: string;
}

interface ParameterCategory {
  categoryName: string;
  parameters: Parameter[];
}

interface Evaluation {
  agentName: string;
  reason: string;
  customer: number;
  date: string;
  comment?: string;
  parameters: string[];
}

interface AgentNameOptions {
  key: string;
  value: string;
  text: string;
}

interface State {
  evaluation: Evaluation;
  loading: boolean;
  errors: string;
}

interface Props {
  onSubmit: (data: Evaluation) => Promise<void>;
  loading: boolean;
  serviceType: string;
  agents: string[];
  parameterCategories: ParameterCategory[];
}

export default class EvaluationDataForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  public initialState(): State {
    return {
      evaluation: {
        parameters: [],
        comment: "",
        date: "",
        reason: "",
        customer: 0,
        agentName: ""
      },
      errors: null,
      loading: this.props.loading
    };
  }

  public agentNameOptions = (agentNames: string[]): AgentNameOptions[] => {
    return agentNames.map(
      (agentName): AgentNameOptions => {
        return {
          key: agentName,
          value: agentName.toLowerCase(),
          text: agentName
        };
      }
    );
  };

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
        <Form.Field inline={true} key={category.categoryName}>
          <Header as="h3">{category.categoryName}</Header>
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
      this.setState({ errors: "Please check at least one parameter" });
      return false;
    }
    if (!this.state.evaluation.agentName) {
      this.setState({ errors: "Please select an agent" });
      return false;
    }
    this.setState({ errors: null });
    return true;
  };

  public handleSubmit = async (): Promise<void> => {
    if (this.validate()) {
      this.setState({ loading: true });
      return this.props.onSubmit(this.state.evaluation);
    }
  };

  public render() {
    const hasError = !!this.state.errors;
    return (
      <Form
        onSubmit={this.handleSubmit}
        error={hasError}
        loading={this.state.loading}
      >
        <Form.Group widths="equal">
          <Form.Field inline={true}>
            <label> Agent Names</label>
            <Dropdown
              name="agentName"
              placeholder="Select an Agent"
              fluid={true}
              search={true}
              selection={true}
              options={this.agentNameOptions(this.props.agents)}
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
            label={`${this.props.serviceType} reason`}
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
        <Form.Field width="8">
          <TextArea
            type="text"
            name="comment"
            value={this.state.evaluation.comment}
            placeholder="Write your comment"
            onChange={this.handleInput}
          />
        </Form.Field>
        <Form.Field>
          <Button type="submit">Submit</Button>
        </Form.Field>
        <Message
          error={true}
          header="Evaluation input data Error"
          content={this.state.errors}
        />
      </Form>
    );
  }
}
