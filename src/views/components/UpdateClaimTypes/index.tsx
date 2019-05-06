import { AxiosPromise } from "axios";
import { snakeCase } from "lodash";
import * as React from "react";
import { Button, Form, Header, Input, Message } from "semantic-ui-react";

export interface ClaimType {
  name: string;
  value: string;
}

export type SubmitCreateClaimTypes = (data: ClaimType[]) => AxiosPromise<void>;

export interface Props {
  onSubmit: SubmitCreateClaimTypes;
  loading?: boolean;
  error?: string;
  claimTypes: ClaimType[];
}

export interface State {
  error: string;
  loading: boolean;
  feedback?: string;
  claimTypes: ClaimType[];
}

export default class UpdateClaimTypes extends React.PureComponent<
  Props,
  State
> {
  public autoClaimTypeCounter: number;

  public constructor(props: Props) {
    super(props);
    this.state = {
      claimTypes: props.claimTypes,
      feedback: null,
      error: props.error,
      loading: props.loading
    };

    this.autoClaimTypeCounter = 0;
  }

  public componentDidUpdate(prevProps: Props) {
    if (
      prevProps.loading !== this.props.loading ||
      prevProps.error !== this.props.error
    ) {
      this.setState({
        claimTypes: this.props.claimTypes,
        error: this.props.error,
        loading: this.props.loading
      });
    }
  }

  public onChangeHandler = (event: any): void => {
    const inputValue = event.target.value;
    const claimTypeValue = event.target.name;
    const claimTypes = this.state.claimTypes.map(obj => {
      return obj.value === claimTypeValue ? { ...obj, name: inputValue } : obj;
    });
    this.setState({ claimTypes });
  };

  public submitForm = async (): Promise<void> => {
    const claimTypes = this.state.claimTypes.map(claimType => ({
      ...claimType,
      value: snakeCase(claimType.name.toLowerCase())
    }));

    this.setState({ loading: true });

    return this.props
      .onSubmit(claimTypes)
      .then(response => {
        this.setState({ loading: false });
        if (response.status !== 200) {
          this.setState({ error: "Failed to update or create ClaimTypes" });
        }
        this.setState({ feedback: "Updated ClaimTypes" });
      })
      .catch(error => {
        this.setState({ error: error.toString(), loading: false });
      });
  };

  public addNewServiceTypeField = () => () => {
    this.autoClaimTypeCounter += 1;

    const emptyClaimType: ClaimType = {
      name: "",
      value: `claimType_${this.autoClaimTypeCounter}`
    };

    this.setState({ claimTypes: [...this.state.claimTypes, emptyClaimType] });
  };

  public renderClaimType(claimType: ClaimType) {
    return (
      <Form.Field key={claimType.value}>
        <Input
          value={claimType.name}
          placeholder="New ClaimType"
          required={true}
          type="text"
          name={claimType.value}
        />
      </Form.Field>
    );
  }

  public render() {
    return (
      <Form
        loading={this.state.loading}
        error={!!this.state.error}
        onChange={this.onChangeHandler}
      >
        <Header as="h3" textAlign="center">
          ClaimTypes
        </Header>
        <Message
          hidden={!this.state.feedback}
          floating={true}
          positive={true}
          content={this.state.feedback}
        />
        <Form.Field>
          <label>Add ClaimTypes </label>
        </Form.Field>
        {this.state.claimTypes.map(claimType =>
          this.renderClaimType(claimType)
        )}
        <Form.Field>
          <Button onClick={this.addNewServiceTypeField()}>
            Add new ClaimType
          </Button>
        </Form.Field>
        <Form.Field>
          <Button type="submit" onClick={this.submitForm}>
            Submit
          </Button>
        </Form.Field>
        <Form.Field>
          <Message
            error={true}
            header="Evaluation input data Error"
            content={this.state.error}
          />
        </Form.Field>
      </Form>
    );
  }
}
