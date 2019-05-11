import _ from "lodash";
import * as React from "react";
import { CSVLink } from "react-csv";
import ReactTable, { Column, Filter } from "react-table";
import "react-table/react-table.css";
import { Button, DropdownItemProps, Form, Message } from "semantic-ui-react";
import SearchableDropdown, { makeOptions } from "../SearchableDropdown";
import { AGENT, EVALUATOR, Profile } from "../UserProfile";

export interface ColumnRowsOpt {
  Header: string;
  columns: Array<Column<any>>;
}

export interface TableData {
  date: string;
  agentName: string;
  evaluator: string;
  comment: string;
  score?: number;
  branch?: string;
  supervisor?: string;
  from?: string;
  to?: string;
}

type InputDataObj<T> = T & TableData;

type InputData<T> = Array<InputDataObj<T>>;

export type AggregateFn<T, S = any> = (data: InputData<T>) => S[];

export interface Props<T, S = any> {
  users: Profile[];
  data: InputData<T>;
  loggedIn: Profile;
  loading?: boolean;
  isSummaryTable?: boolean;
  isNpsTable?: boolean;
  aggregate?: AggregateFn<T, S>;
  error?: string;
  columns: ColumnRowsOpt[];
}

type DownloadData<T> = { [k in keyof TableData & T]?: string | number };

export interface State<T> {
  filtered: Filter[];
  evaluatorSearch: string;
  page: number;
  data: InputData<T>;
  pageSize: number;
  branches: string[];
  branchSearch: string;
  supervisors: string[];
  supervisorSearch: string;
  agentSearch: string;
  agentOptions: DropdownItemProps[];
  from: string;
  to: string;
  dataToDownload: Array<DownloadData<T>>;
  evaluatorOptions: DropdownItemProps[];
}

const allEvaluators = "All Evaluators";
const allAgents = "All Agents";
const allBranches = "All Service Points";
const allSupervisors = "All Supervisors";

export default class DataTable<T, S> extends React.Component<
  Props<T>,
  State<T>
> {
  private reactTable: React.RefObject<any>;
  private csvLink: React.RefObject<any>;
  private branchField: string = this.props.isNpsTable ? "touchPoint" : "branch";

  constructor(props: Props<T, S>) {
    super(props);
    this.state = {
      evaluatorOptions: this.evaluatorSearchOptions(),
      evaluatorSearch: this.getDefaultEvaluatorSearch(),
      agentOptions: this.agentSearchOptions(),
      agentSearch: allAgents,
      branches: this.getBranches(),
      branchSearch: allBranches,
      supervisors: this.getSupervisors(),
      supervisorSearch: allSupervisors,
      data: this.initialData(this.props.data),
      page: 0,
      pageSize: this.isNpsSummaryTable() ? 1 : 10,
      filtered: [],
      from: "2019-01-01",
      to: this.todayDate(),
      dataToDownload: []
    };
    this.reactTable = React.createRef();
    this.csvLink = React.createRef();
  }

  public componentDidUpdate(prevProps: Props<T>) {
    if (
      prevProps.data !== this.props.data ||
      prevProps.users !== this.props.users
    ) {
      this.setState({
        data: this.initialData(this.props.data),
        branches: this.getBranches(),
        supervisors: this.getSupervisors(),
        agentOptions: this.agentSearchOptions(),
        agentSearch: allAgents,
        evaluatorOptions: this.evaluatorSearchOptions(),
        evaluatorSearch: this.getDefaultEvaluatorSearch()
      });
    }
  }

  public todayDate(): string {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
  }

  public getDefaultEvaluatorSearch(): string {
    return this.props.loggedIn.role === EVALUATOR
      ? this.props.loggedIn.fullName
      : allEvaluators;
  }

  public getBranches(): string[] {
    const branches = _.uniq(this.props.data.map(obj => obj[this.branchField]));
    return [allBranches, ...branches];
  }

  public getSupervisors(): string[] {
    const supervisors = _.uniq(this.props.data.map(obj => obj.supervisor));
    return [allSupervisors, ...supervisors];
  }

  public agentData(data: InputData<T>): InputData<T> {
    return data.filter(obj => obj.agentName === this.props.loggedIn.userName);
  }

  public isNpsSummaryTable() {
    return this.props.isNpsTable && this.props.isSummaryTable;
  }

  public addFullNames(data: InputData<T>): InputData<T> {
    if (!this.props.users.length) {
      return data;
    }
    const usersMap = _.groupBy(this.props.users, user => user.userName);
    return data.map(obj => {
      const agentFullName = usersMap[obj.agentName][0].fullName;
      const evaluatorFullName = usersMap[obj.evaluator][0].fullName;
      return { ...obj, agentName: agentFullName, evaluator: evaluatorFullName };
    });
  }

  public initialData(data: InputData<T>): InputData<T> {
    const dataByUser =
      this.props.loggedIn.role === AGENT ? this.agentData(data) : data;
    return this.addFullNames(dataByUser);
  }

  public filterMethod = (filter, row): boolean => {
    return String(row[filter.id]).startsWith(filter.value);
  };

  public handleDropdownInput = (_event, { value, name }) => {
    // tslint:disable-next-line: no-object-literal-type-assertion
    this.setState({ [name]: value } as State<T>);
  };

  public onChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const stateWithDates = { ...this.state, [name]: value };
    this.setState(stateWithDates);
  };

  public onFilterChange = filtered => this.setState({ filtered });

  public onPageSizeChange = (pageSize, page) =>
    this.setState({ page, pageSize });

  public onPageChange = page => this.setState({ page });

  public searchByEvaluator(data: InputData<T>): InputData<T> {
    return this.state.evaluatorSearch !== allEvaluators
      ? data.filter(row => {
          return row.evaluator.includes(this.state.evaluatorSearch);
        })
      : data;
  }

  public searchByAgent(data: InputData<T>): InputData<T> {
    return this.state.agentSearch !== allAgents
      ? data.filter(row => {
          return row.agentName.includes(this.state.agentSearch);
        })
      : data;
  }

  public searchBySupervisor(data: InputData<T>): InputData<T> {
    return this.state.supervisorSearch !== allSupervisors
      ? data.filter(row => {
          return row.supervisor.includes(this.state.supervisorSearch);
        })
      : data;
  }

  public searchByBranch(data: InputData<T>): InputData<T> {
    return this.state.branchSearch !== allBranches
      ? data.filter(row => {
          return row[this.branchField].includes(this.state.branchSearch);
        })
      : data;
  }

  public getUser = (userName: string): Profile => {
    return this.props.users.find(user => user.userName === userName);
  };

  public searchByDate(data: InputData<T>): InputData<T> {
    const startDate = new Date(this.state.from);
    const endDate = new Date(this.state.to);
    return data.filter(row => {
      const refDate = new Date(row.date);
      return (
        refDate.getTime() >= startDate.getTime() &&
        refDate.getTime() <= endDate.getTime()
      );
    });
  }

  public userSearchOptions(
    userType: string,
    allSearchValue: string
  ): DropdownItemProps[] {
    const allSearchOption = makeOptions([allSearchValue]);
    if (!this.props.users.length) {
      return allSearchOption;
    }
    const users: Profile[] = _.uniqBy(
      this.props.data.map(obj => this.getUser(obj[userType])),
      "value"
    );

    const userOptions: DropdownItemProps[] = users.map(user => ({
      key: user.userName,
      value: user.fullName,
      text: user.fullName
    }));

    const options = [...allSearchOption, ...userOptions];
    return options;
  }

  public agentSearchOptions(): DropdownItemProps[] {
    return this.userSearchOptions("agentName", allAgents);
  }

  public evaluatorSearchOptions(): DropdownItemProps[] {
    const options = this.userSearchOptions("evaluator", allEvaluators);
    const loggedInUser = this.props.loggedIn;
    return loggedInUser.role === EVALUATOR
      ? _.uniqBy(
          [
            ...options,
            {
              key: loggedInUser.userName,
              value: loggedInUser.fullName,
              text: loggedInUser.fullName
            }
          ],
          "value"
        )
      : options;
  }

  public toCSVDataObj(obj: InputDataObj<T>): { [field: string]: string } {
    return _.mapValues(obj, value => {
      if (Array.isArray(value)) {
        return value
          .map(valueObj =>
            valueObj.name ? valueObj.name : valueObj.toString()
          )
          .join(",\n");
      }
      return value.toString();
    });
  }

  public download = () => {
    const currentRecords = this.reactTable.current.getResolvedState()
      .sortedData;

    const dataToDownload: Array<DownloadData<T>> = currentRecords.map(
      (obj: { _original: InputDataObj<T> }) => {
        const requiredObj = obj._original;

        return this.toCSVDataObj(requiredObj);
      }
    );

    this.setState({ dataToDownload }, () => {
      // click the CSVLink component to trigger the CSV download
      this.csvLink.current.link.click();
    });
  };

  public downloadAggregateSource = () => {
    const sortedData = this.getSortedData().map(obj => {
      return this.toCSVDataObj(obj);
    });

    this.setState({ dataToDownload: sortedData }, () => {
      this.csvLink.current.link.click();
    });
  };

  public getSortedData() {
    const sortedData = this.searchByDate(
      this.searchByBranch(
        this.searchBySupervisor(this.searchByEvaluator(this.state.data))
      )
    );

    return this.props.isNpsTable ? this.searchByAgent(sortedData) : sortedData;
  }

  public renderedData() {
    const sortedData = this.getSortedData();

    return this.props.isSummaryTable
      ? this.props.aggregate(sortedData)
      : sortedData;
  }

  public render() {
    const data = this.renderedData();
    return (
      <div>
        <Message
          error={true}
          hidden={!this.props.error}
          header="Evaluation data view Error"
          content={this.props.error}
        />
        <Form loading={this.props.loading}>
          <Form.Group widths="equal">
            {this.isNpsSummaryTable() ? (
              <Form.Field inline={true}>
                <label>Agents</label>
                <SearchableDropdown
                  value={this.state.agentSearch}
                  name="evaluatorSearch"
                  options={this.state.agentOptions}
                  placeholder="Agent"
                  onChange={this.handleDropdownInput}
                />
              </Form.Field>
            ) : null}
            <Form.Field inline={true}>
              <label>Evaluators</label>
              <SearchableDropdown
                value={this.state.evaluatorSearch}
                name="evaluatorSearch"
                options={this.state.evaluatorOptions}
                placeholder="Evaluator"
                onChange={this.handleDropdownInput}
              />
            </Form.Field>
            <Form.Field inline={true}>
              <label>Supervisors</label>
              <SearchableDropdown
                value={this.state.supervisorSearch}
                name="supervisorSearch"
                values={this.state.supervisors}
                placeholder="Supervisor"
                onChange={this.handleDropdownInput}
              />
            </Form.Field>
            <Form.Field inline={true}>
              <label>Service Points</label>
              <SearchableDropdown
                value={this.state.branchSearch}
                name="branchSearch"
                values={this.state.branches}
                placeholder="Service Point"
                onChange={this.handleDropdownInput}
              />
            </Form.Field>
            <Form.Input
              fluid={true}
              label="From"
              type="date"
              name="from"
              inline={true}
              value={this.state.from}
              onChange={this.onChange}
            />
            <Form.Input
              label="To"
              inline={true}
              fluid={true}
              type="date"
              name="to"
              value={this.state.to}
              onChange={this.onChange}
            />
          </Form.Group>
        </Form>
        <ReactTable
          ref={this.reactTable}
          data={data}
          columns={this.props.columns}
          filterable={true}
          defaultFilterMethod={this.filterMethod}
          page={this.state.page}
          pageSize={this.state.pageSize}
          filtered={this.state.filtered}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          onFilteredChange={this.onFilterChange}
          defaultPageSize={this.isNpsSummaryTable() ? 1 : 10}
          className="-striped -highlight"
        />
        <CSVLink
          data={this.state.dataToDownload}
          filename="data.csv"
          className="hidden"
          ref={this.csvLink}
          target="_blank"
        />
        <Form style={{ paddingTop: "1rem" }}>
          <Form.Group>
            <Form.Field inline={true}>
              <Button onClick={this.download}>Download Table Data</Button>
            </Form.Field>
            {this.props.isSummaryTable ? (
              <Form.Field inline={true}>
                <Button onClick={this.downloadAggregateSource}>
                  Download Source Data
                </Button>
              </Form.Field>
            ) : null}
          </Form.Group>
        </Form>
      </div>
    );
  }
}
