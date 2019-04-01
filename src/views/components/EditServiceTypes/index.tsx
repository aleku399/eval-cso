import * as React from "react";
import { Button, Form, Header, Input, Table } from "semantic-ui-react";

interface Parameter {
  value: string;
  weight: number;
}

type ParameterRes = Parameter & {
  name: string;
};

interface ParameterCategory {
  name: string;
  parameters: ParameterRes[];
}

export interface EditServiceTypesProps {
  onSubmit: (data: Parameter[]) => Promise<void>;
  loading: boolean;
  serviceType: string;
  parameterCategories: ParameterCategory[];
}

export interface ParameterStates {
  [parameterValue: string]: Parameter;
}

export interface EditServiceTypesState {
  parameters: ParameterStates;
  loading: boolean;
}

export default class EditServiceTypes extends React.Component<
  EditServiceTypesProps,
  EditServiceTypesState
> {
  public state = {
    parameters: {},
    loading: this.props.loading
  };

  public parameterInputHandler = (event: any): void => {
    const weight = event.target.value;
    const value = event.target.name;
    const changedParameter = { [value]: { value, weight } };
    const parameters = { ...this.state.parameters, ...changedParameter };
    this.setState({ parameters });
  };

  public submitForm = async (): Promise<void> => {
    const parameterList: Parameter[] = Object.values(this.state.parameters);
    this.setState({ loading: true });
    return this.props.onSubmit(parameterList);
  };

  public getParameterWeight = (category: string, value: string): number => {
    if (this.state.parameters[value]) {
      return this.state.parameters[value].weight;
    }
    const parameterCategory: ParameterCategory = this.props.parameterCategories.find(
      obj => obj.name === category
    );
    const parameter: ParameterRes = parameterCategory.parameters.find(
      obj => obj.value === value
    );
    return parameter.weight;
  };

  public renderCategory(category: ParameterCategory) {
    return (
      <Form.Field>
        <Header as="h4">{category.name}</Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Property Name</Table.HeaderCell>
              <Table.HeaderCell>Property Weight</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {category.parameters.map(parameter => (
              <Table.Row>
                <Table.Cell>{parameter.name}</Table.Cell>
                <Table.Cell>
                  <Input
                    value={this.getParameterWeight(
                      category.name,
                      parameter.value
                    )}
                    required={true}
                    type="number"
                    name={parameter.value}
                    onChange={this.parameterInputHandler}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Form.Field>
    );
  }
  public render() {
    return (
      <div>
        <Header as="h3" textAlign="center">
          {this.props.serviceType} Service Type
        </Header>
        <Form loading={this.state.loading} onSubmit={this.submitForm}>
          {this.props.parameterCategories.map(category =>
            this.renderCategory(category)
          )}
          <Form.Field>
            <Button className="ui submit button" type="submit">
              Submit
            </Button>
          </Form.Field>
        </Form>
      </div>
    );
  }
}
