import { AxiosPromise } from "axios";
import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Header,
  List,
  Message,
  Ref,
  TextArea
} from "semantic-ui-react";
import { mkOptionsFromUser, nullEmptyStrings } from "../../../lib/helper";
import {
  branchServiceIds,
  emailServiceIds,
  getServiceName,
  Services
} from "../../../lib/serviceData";
import SearchableDropdown from "../SearchableDropdown";
import { ParameterCategory } from "../UpdateServiceType";
import { ADMIN, Profile } from "../UserProfile";

export interface Parameter {
  name: string;
  value: string;
  checked?: boolean;
}

export interface EvalState {
  agentName: string;
  customerTel?: string;
  customerEmail?: string;
  branch?: string;
  date: string;
  comment: string;
  details: string;
}

interface Evaluation extends EvalState {
  reason: string;
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
  parameterCategories: ParameterCategory[];
  showOtherReasonField: boolean;
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
  service: Services;
  evaluator: Profile;
  agents: Profile[];
  branches: string[];
  parameterCategories: ParameterCategory[];
  reasons: string[];
}

export default class EvaluationForm extends React.Component<Props, State> {
  public comment: HTMLTextAreaElement;
  public details: HTMLTextAreaElement;

  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  public initialState(): State {
    return {
      feedback: null,
      parameterCategories: this.props.parameterCategories,
      showOtherReasonField: false,
      evaluation: {
        comment: "",
        details: "",
        parameters: [],
        date: "",
        reason: "",
        customerTel: "",
        customerEmail: "",
        branch: "",
        agentName: ""
      },
      error: this.props.error,
      loading: this.props.loading
    };
  }

  public componentDidUpdate(prevProps: Props) {
    if (
      prevProps.loading !== this.props.loading ||
      prevProps.error !== this.props.error ||
      prevProps.parameterCategories !== this.props.parameterCategories
    ) {
      this.setState({
        parameterCategories: this.props.parameterCategories,
        error: this.props.error,
        loading: this.props.loading
      });
    }
  }

  public renderParameters = (category, parameters: Parameter[]) => {
    return parameters.map(parameter => {
      return (
        <List key={parameter.name}>
          <Checkbox
            label={parameter.name}
            name={parameter.value}
            category={category}
            type="checkbox"
            checked={
              parameter.checked === undefined ? false : parameter.checked
            }
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
          <ul>{this.renderParameters(category.value, category.parameters)}</ul>
        </Form.Field>
      );
    });
  };

  public handleDropDownInput = (_event, { name, value }): void => {
    if (value === "Others") {
      return this.setState({ showOtherReasonField: true });
    }
    const evaluation = { ...this.state.evaluation, [name]: value };
    return this.setState({ evaluation });
  };

  public updateParameterCategories(
    categoryValue: string,
    parameterValue: string
  ) {
    const category = this.state.parameterCategories.find(
      cat => cat.value === categoryValue
    );

    const parameters = category.parameters.map(param =>
      param.value === parameterValue ? { ...param, checked: true } : param
    );

    const parameterCategories = this.state.parameterCategories.map(
      paramCats => {
        if (paramCats.value === categoryValue) {
          return { ...paramCats, parameters };
        }
        return paramCats;
      }
    );
    this.setState({ parameterCategories });
  }

  public handleChange = async (
    _event,
    { category, name, checked }
  ): Promise<void> => {
    const parameterValue = name;
    const parameters = checked
      ? [...this.state.evaluation.parameters, parameterValue]
      : this.state.evaluation.parameters;
    this.updateParameterCategories(category, name);
    const evaluation = { ...this.state.evaluation, parameters };
    this.setState({ evaluation });
  };

  public handleInput = (event: any): void => {
    const name = event.target.name;
    const value = event.target.value;
    const evaluation = { ...this.state.evaluation, [name]: value };
    this.setState({ evaluation });
  };

  public handleOtherReasonInput = (event: any): void => {
    const value = event.target.value;
    const evaluation = { ...this.state.evaluation, reason: value };
    this.setState({ evaluation });
  };

  public validate = (): boolean => {
    if (!this.state.evaluation.parameters.length) {
      this.setState({
        error: "Please add a reason for deviation or zero rating",
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
    const initState = this.initialState();
    this.comment.value = "";
    this.details.value = "";
    this.setState({
      ...initState,
      loading: false
    });
  }

  public assignCommentRef = (node: HTMLTextAreaElement) => {
    this.comment = node;
  };

  public assignDetailsRef = (node: HTMLTextAreaElement) => {
    this.details = node;
  };

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
          comment: this.comment.value,
          details: this.details.value,
          service: this.props.service,
          evaluator: this.props.evaluator.userName,
          customerTel: this.state.evaluation.customerTel,
          date: date.toISOString()
        },
        parameters
      };

      this.props
        .onSubmit(nullEmptyStrings<CreateEvaluation>(payload))
        .then(response => {
          if (response.status === 200) {
            return this.clearInput();
          }
          throw Error("failed to submit data");
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
        <Form.Field>
          <Header as="h3" textAlign="center">
            {getServiceName(this.props.service)} Evaluation{" "}
          </Header>
        </Form.Field>
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
              value={this.state.evaluation.agentName}
              options={mkOptionsFromUser(this.props.agents)}
              onChange={this.handleDropDownInput}
            />
          </Form.Field>
          {emailServiceIds.includes(this.props.service) ? (
            <Form.Input
              type="email"
              fluid={true}
              label="Email"
              name="customerEmail"
              value={this.state.evaluation.customerEmail || ""}
              onChange={this.handleInput}
            />
          ) : (
            <Form.Input
              type="tel"
              fluid={true}
              label="Phone Number"
              name="customerTel"
              minLength={10}
              maxLength={10}
              pattern="[0]{1}[0-9]{9}"
              value={this.state.evaluation.customerTel}
              onChange={this.handleInput}
            />
          )}
        </Form.Group>

        <Form.Group widths={this.props.evaluator.role === ADMIN ? "equal" : 8}>
          {this.props.reasons.length ? (
            <Form.Field
              inline={true}
              width={this.props.evaluator.role === ADMIN ? 16 : 8}
            >
              <label>Reasons</label>
              <SearchableDropdown
                placeholder="Reason"
                name="reason"
                fluid={true}
                values={this.props.reasons}
                value={
                  this.state.showOtherReasonField
                    ? "Others"
                    : this.state.evaluation.reason
                }
                onChange={this.handleDropDownInput}
              />
            </Form.Field>
          ) : null}

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
        {this.state.showOtherReasonField ? (
          <Form.Field width="8">
            <Form.Input
              type="text"
              name="otherReason"
              value={this.state.evaluation.reason}
              label="Specify other Reason"
              placeholder="Specify other reason"
              onChange={this.handleOtherReasonInput}
            />
          </Form.Field>
        ) : null}
        <Form.Group widths="equal">
          {this.renderReasons(this.state.parameterCategories)}
        </Form.Group>
        {branchServiceIds.includes(this.props.service) ? (
          <Form.Field width="8">
            <label> Branch</label>
            <SearchableDropdown
              name="branch"
              placeholder="Select a branch"
              value={this.state.evaluation.branch}
              values={this.props.branches}
              onChange={this.handleDropDownInput}
            />
          </Form.Field>
        ) : null}
        <Form.Group widths="equal">
          <Form.Field inline={true}>
            <label>Comments</label>
            <Ref innerRef={this.assignCommentRef}>
              <TextArea
                type="text"
                name="comment"
                placeholder="Write your comment"
              />
            </Ref>
          </Form.Field>
          <Form.Field inline={true}>
            <label>Details</label>
            <Ref innerRef={this.assignDetailsRef}>
              <TextArea type="text" name="details" placeholder="Add details" />
            </Ref>
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Button type="submit">Submit</Button>
        </Form.Field>
      </Form>
    );
  }
}
