import _ from "lodash";
import * as React from "react";
import { CSVLink } from "react-csv";
import ReactTable, { Column, Filter } from "react-table";
import "react-table/react-table.css";
import { Button, DropdownItemProps, Form, Message } from "semantic-ui-react";
import { mkOptionsFromUser } from "../../../lib/helper";
import { EVALUATOR, Profile } from "../UserProfile";

export interface ColumnRowsOpt {
  Header: string;
  columns: Array<Column<any>>;
}

export interface TableData {
  date: string;
  agentName: string;
  evaluator: string;
  comment: string;
  score: number;
  from?: string;
  to?: string;
}

type InputData<T> = Array<T & TableData>;

export type AggregateFn<T, S = any> = (data: InputData<T>) => S[];

export interface Props<T, S = any> {
  users: Profile[];
  data: InputData<T>;
  loggedIn: Profile;
  loading?: boolean;
  isSummaryTable?: boolean;
  aggregate?: AggregateFn<T, S>;
  error?: string;
  columns: ColumnRowsOpt[];
}

type DownloadData<T> = { [k in keyof TableData & T]?: string | number };

export interface State<T> {
  filtered: Filter[];
  search: string;
  page: number;
  pageSize: number;
  from: string;
  to: string;
  dataToDownload: Array<DownloadData<T>>;
  evaluatorOptions: DropdownItemProps[];
}

const allEvaluators = "All Evaluators";

const all: DropdownItemProps = {
  key: allEvaluators,
  text: allEvaluators,
  value: allEvaluators
};

export default class DataTable<T, S> extends React.Component<
  Props<T>,
  State<T>
> {
  private reactTable: React.RefObject<any>;
  private csvLink: React.RefObject<any>;

  constructor(props: Props<T, S>) {
    super(props);
    this.state = {
      evaluatorOptions: this.evaluatorSearchOptions(),
      search: this.getDefaultEvaluatorSearch(),
      page: 0,
      pageSize: 10,
      filtered: [],
      from: "2016-01-01",
      to: this.todayDate(),
      dataToDownload: []
    };
    this.reactTable = React.createRef();
    this.csvLink = React.createRef();
  }

  public componentDidUpdate(prevProps: Props<T>) {
    if (
      prevProps.loading !== this.props.loading ||
      prevProps.data !== this.props.data
    ) {
      this.setState({
        evaluatorOptions: this.evaluatorSearchOptions(),
        search: this.getDefaultEvaluatorSearch()
      });
    }
  }

  public todayDate(): string {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
  }

  public getDefaultEvaluatorSearch() {
    return this.props.loggedIn.role === EVALUATOR
      ? this.props.loggedIn.userName
      : allEvaluators;
  }

  public filterMethod = (filter, row): boolean => {
    return String(row[filter.id]).startsWith(filter.value);
  };

  public handleDropdownInput = (_event, { value }) => {
    this.setState({ search: value });
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
    return this.state.search && this.state.search !== allEvaluators
      ? data.filter(row => {
          return row.evaluator.includes(this.state.search);
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

  public evaluatorSearchOptions(): DropdownItemProps[] {
    if (!this.props.users.length) {
      return [all];
    }
    const evaluators = this.props.data.map(obj => this.getUser(obj.evaluator));
    const evalOptions: DropdownItemProps[] = mkOptionsFromUser(evaluators);
    const allOptions: DropdownItemProps[] = [...evalOptions, all];
    return _.uniqBy(allOptions, "value");
  }

  public download = () => {
    const currentRecords = this.reactTable.current.getResolvedState()
      .sortedData;

    const dataToDownload: Array<DownloadData<T>> = currentRecords.map(
      (obj: { _original: InputData<T> }) => {
        const requiredObj = obj._original;

        return _.mapValues(requiredObj, value => {
          if (Array.isArray(value)) {
            return value.map(valueObj => valueObj.name).join(",\n");
          }
          return value;
        });
      }
    );

    this.setState({ dataToDownload }, () => {
      // click the CSVLink component to trigger the CSV download
      this.csvLink.current.link.click();
    });
  };

  public render() {
    const sortedData = this.searchByDate(
      this.searchByEvaluator(this.props.data)
    );
    const data = this.props.isSummaryTable
      ? this.props.aggregate(sortedData)
      : sortedData;
    return (
      <div>
        <Message
          error={true}
          hidden={!this.props.error}
          header="Evaluation data view Error"
          content={this.props.error}
        />
        <Form>
          <Form.Group widths="equal">
            <Form.Select
              fluid={true}
              label="Search"
              value={this.state.search}
              focus={"true"}
              search={true}
              options={this.state.evaluatorOptions}
              placeholder="Search for evaluator..."
              onChange={this.handleDropdownInput}
            />
            <Form.Input
              fluid={true}
              label="From"
              type="date"
              name="from"
              value={this.state.from}
              onChange={this.onChange}
            />
            <Form.Input
              label="To"
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
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <CSVLink
          data={this.state.dataToDownload}
          filename="data.csv"
          className="hidden"
          ref={this.csvLink}
          target="_blank"
        />
        <Button onClick={this.download}>Download CSV</Button>
      </div>
    );
  }
}
