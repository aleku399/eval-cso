import { AxiosPromise } from "axios";
import { flatten, groupBy, snakeCase } from "lodash";
import * as React from "react";
import { Button, Form, Header, Message, Table } from "semantic-ui-react";
import { getServiceName, Services } from "../../../lib/serviceData";
import { ParameterAttrs } from "../EvaluationDataTable";
import { ParamCategoryName } from "../EvaluationForm";

export interface ParameterRes extends ParameterAttrs {
  weight: number;
  isNew?: boolean;
  description?: string;
  group?: string;
  refName?: React.RefObject<HTMLInputElement>;
  refWeight?: React.RefObject<HTMLInputElement>;
}

export interface ParameterCategory {
  name: string;
  value: ParamCategoryName;
  parameters: ParameterRes[];
}

interface CreateParameters {
  service: string;
  parameters: ParameterRes[];
}

export type SubmitCreateParameters = (
  data: CreateParameters
) => AxiosPromise<void>;

export interface Props {
  onSubmit: SubmitCreateParameters;
  loading?: boolean;
  error?: string;
  serviceType: Services;
  parameterCategories: ParameterCategory[];
}

export interface ParameterStates {
  [parameterValue: string]: ParameterRes;
}

export interface State {
  error: string;
  loading: boolean;
  feedback?: string;
  parameterCategories: ParameterCategory[];
}

type CategoryMap = { [P in ParamCategoryName]: string };

export const categories: CategoryMap = {
  deviation: "Reasons for deviation",
  zeroRated: "Reasons for zero rating"
};

export default class UpdateServiceType extends React.PureComponent<
  Props,
  State
> {
  public autoParamCounter: number;
  public constructor(props: Props) {
    super(props);
    const parameterCategories = this.addRefsToParams(props.parameterCategories);
    this.state = {
      parameterCategories,
      feedback: null,
      error: props.error,
      loading: props.loading
    };
    this.autoParamCounter = 0;
  }

  public componentDidUpdate(prevProps: Props) {
    if (
      prevProps.loading !== this.props.loading ||
      prevProps.error !== this.props.error
    ) {
      const parameterCategories = this.addRefsToParams(
        this.mergeParameterCategories()
      );
      this.setState({
        parameterCategories,
        error: this.props.error,
        loading: this.props.loading
      });
    }
  }

  public addRefsToParams(parameterCategories) {
    return parameterCategories.map(cat => {
      const parameters = cat.parameters.map(param => {
        return !param.refName
          ? {
              ...param,
              refName: React.createRef(),
              refWeight: React.createRef()
            }
          : param;
      });
      return { ...cat, parameters };
    });
  }

  public mergeParameterCategories(): ParameterCategory[] {
    const groups = groupBy(
      this.props.parameterCategories,
      group => group.value
    );
    const parameterCategories = flatten(
      this.state.parameterCategories.map(group => {
        return (groups[group.value]
          ? groups[group.value]
          : group) as ParameterCategory;
      })
    );
    return parameterCategories;
  }

  public getParamCategory(pValue: string) {
    let categoryValue = null;
    this.state.parameterCategories.forEach(category => {
      const param = category.parameters.find(cParam => cParam.value === pValue);
      if (param && param.value === pValue) {
        categoryValue = category.value;
      }
    });
    return categoryValue;
  }

  public updateParameterCategories(updatedGroup: ParameterCategory) {
    const parameterCategories = this.state.parameterCategories.map(group => {
      if (group.value === updatedGroup.value) {
        return updatedGroup;
      }
      return group;
    });
    this.setState({ parameterCategories });
  }

  public setParamValue(paramName: string): string {
    return `${this.props.serviceType}_${snakeCase(paramName.toLowerCase())}`;
  }

  public submitForm = async (): Promise<void> => {
    const parameters: ParameterRes[] = flatten(
      this.state.parameterCategories.map(obj => obj.parameters)
    ).map(param => {
      return {
        ...param,
        name: param.refName.current.value,
        weight: Number(param.refWeight.current.value),
        value: param.isNew
          ? this.setParamValue(param.refName.current.value)
          : param.value
      };
    });
    this.setState({ loading: true });

    return this.props
      .onSubmit({ parameters, service: this.props.serviceType })
      .then(response => {
        this.setState({ loading: false });
        if (response.status !== 200) {
          this.setState({ error: "Failed to update or create parameters" });
        }
        this.setState({ feedback: "Updated Parameters" });
      })
      .catch(error => {
        this.setState({ error: error.toString(), loading: false });
      });
  };

  public addNewParameterField = (categoryValue: ParamCategoryName) => () => {
    this.autoParamCounter += 1;

    const emptyParameter: ParameterRes = {
      name: "",
      value: `${categoryValue}_${this.autoParamCounter}`, // placeholder value
      weight: 0,
      isNew: true,
      category: categoryValue,
      refName: React.createRef(),
      refWeight: React.createRef()
    };

    const activeCategory = this.state.parameterCategories.find(
      cat => cat.value === categoryValue
    );

    const updatedGroup = {
      ...activeCategory,
      parameters: [...activeCategory.parameters, emptyParameter]
    };
    this.updateParameterCategories(updatedGroup);
  };

  public renderCategory(category: ParameterCategory) {
    return (
      <Form.Field key={category.value}>
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
                <Table.Row key={parameter.value}>
                  <Table.Cell>
                    <input
                      defaultValue={parameter.name}
                      required={true}
                      type="text"
                      ref={parameter.refName}
                      name={parameter.value}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      defaultValue={parameter.weight.toString()}
                      required={true}
                      ref={parameter.refWeight}
                      type="number"
                      name={parameter.value}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Form.Field>
        <Form.Field>
          <Button onClick={this.addNewParameterField(category.value)}>
            Add new {category.name}
          </Button>
        </Form.Field>
      </Form.Field>
    );
  }

  public render() {
    return (
      <div>
        <Header
          as="h3"
          textAlign="center"
          block={true}
          content={`${getServiceName(
            this.props.serviceType
          )} service parameters`}
        />
        <Form loading={this.state.loading} error={!!this.state.error}>
          <Message
            hidden={!this.state.feedback}
            floating={true}
            positive={true}
            content={this.state.feedback}
          />
          {this.state.parameterCategories.map(category =>
            this.renderCategory(category)
          )}
          <Form.Field>
            <Button type="submit" onClick={this.submitForm}>
              Submit
            </Button>
            <Message
              error={true}
              header="Evaluation input data Error"
              content={this.state.error}
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}
