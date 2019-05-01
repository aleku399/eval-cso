import _ from "lodash";
import * as React from "react";
import ReactTable, { Column, Filter } from "react-table";
import "react-table/react-table.css";
import { DropdownItemProps, Form } from "semantic-ui-react";
import { EvalState, ParamCategoryName, Parameter } from "../EvaluationForm";

export interface ParameterAttrs extends Parameter {
  category: ParamCategoryName;
}

type CategoryObjects = { [k in ParamCategoryName]: ParameterAttrs[] };

interface EvalAttrs extends EvalState {
  evaluator: string;
}

interface Evaluation {
  evalAttrs: EvalAttrs;
  parameters: ParameterAttrs[];
  score: number;
}

type EvaluationData = Evaluation[];

interface EvaluationTableData {
  date: string;
  duration: string;
  reason: string;
  evaluator: string;
  agentName: string;
  customer: string;
  comment: string;
  score: string;
  zeroRated: ParameterAttrs[];
  deviation: ParameterAttrs[];
}

export interface Props {
  data: EvaluationData;
  loggedIn: string;
}

export interface State {
  data: EvaluationTableData[];
  filtered: Filter[];
  search: string;
  page: number;
  pageSize: number;
  from: string;
  to: string;
}

export interface ColumnRows extends Column<any> {
  foldable?: boolean;
  columns?: ColumnRows[];
}

export interface ColumnRowsOpt {
  Header: string;
  columns: ColumnRows[];
}

const allEvaluators = "all_evaluators";

const evalOption = (data: EvaluationTableData[]): DropdownItemProps[] => {
  return data.map(obj => ({
    key: obj.evaluator,
    text: obj.evaluator,
    value: obj.evaluator
  }));
};

const all: DropdownItemProps = {
  key: "All Evaluators",
  text: "All Evaluators",
  value: allEvaluators
};

const columns: ColumnRowsOpt[] = [
  {
    Header: "Data View",
    columns: [
      {
        Header: "Date",
        accessor: "date",
        filterable: false
      },
      {
        Header: "Agent Name",
        accessor: "agentName"
      },
      {
        Header: "Customer",
        accessor: "customer"
      },
      {
        Header: "Call Reason",
        id: "reason",
        accessor: "reason",
        style: { whiteSpace: "unset" },
        width: 200
      },
      {
        Header: "Reasons for Deviation",
        width: 200,
        accessor: "deviation",
        style: { whiteSpace: "unset" },
        id: "deviation",
        Cell: ({ row }) => {
          const list = row.deviation.map((z: ParameterAttrs) => (
            <li key={z.name}>{z.name}</li>
          ));
          return <ul style={{ marginTop: "2px" }}>{list}</ul>;
        },
        filterMethod: (filter, row) => {
          return row.deviation.some(x =>
            x.toLowerCase().includes(filter.value)
          );
        }
      },
      {
        Header: "Reasons for Zero Rating",
        width: 200,
        accessor: "zeroRated",
        style: { whiteSpace: "unset" },
        Cell: ({ row }) => {
          const list = row.zeroRated.map((z: ParameterAttrs) => (
            <li key={z.name}>{z.name}</li>
          ));
          return <ul style={{ marginTop: "2px" }}>{list}</ul>;
        },
        filterMethod: (filter, row) => {
          return row.zeroRated.some(x =>
            x.toLowerCase().includes(filter.value)
          );
        }
      },
      {
        Header: "Comment",
        accessor: "comment",
        style: { whiteSpace: "unset" },
        width: 200
      },
      {
        Header: "Score",
        id: "score",
        accessor: "score"
      },
      {
        Header: "Duration",
        accessor: "duration"
      }
    ]
  }
];

const EvaluationTableData = (data: EvaluationData): EvaluationTableData[] => {
  return data.map((obj: Evaluation) => {
    const paramObj = _.groupBy(
      obj.parameters,
      (x: ParameterAttrs) => x.category
    ) as CategoryObjects;
    return {
      ...paramObj,
      ...obj.evalAttrs,
      duration: String(obj.evalAttrs.customer),
      customer: String(obj.evalAttrs.customer),
      score: String(obj.score)
    };
  });
};

export default class DataTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: EvaluationTableData(this.props.data),
      search: this.props.loggedIn,
      page: 0,
      pageSize: 10,
      filtered: [],
      from: "2016-01-01",
      to: this.todayDate()
    };
  }

  public todayDate(): string {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  }

  public filterMethod = (filter, row): boolean => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
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

  public searchByEvaluator(data: EvaluationTableData[]): EvaluationTableData[] {
    return this.state.search && this.state.search !== allEvaluators
      ? data.filter(row => {
          return row.evaluator.includes(this.state.search);
        })
      : data;
  }

  public searchByDate(data: EvaluationTableData[]): EvaluationTableData[] {
    const startDate = new Date(this.state.from).getTime();
    const endDate = new Date(this.state.to).getTime();

    return data.filter(row => {
      const refDate = new Date(row.date).getTime();
      return refDate >= startDate && refDate <= endDate;
    });
  }

  public evaluatorSearchOptions() {
    const evalOptions: DropdownItemProps[] = evalOption(
      EvaluationTableData(this.props.data)
    );
    const allOptions: DropdownItemProps[] = [...evalOptions, all];
    return _.uniqBy(allOptions, "value");
  }

  public render() {
    const data = this.searchByDate(this.searchByEvaluator(this.state.data));
    return (
      <div>
        <Form>
          <Form.Group widths="equal">
            <Form.Select
              fluid={true}
              label="Search"
              defaultValue={this.state.search}
              focus={"true"}
              search={true}
              options={this.evaluatorSearchOptions()}
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
          data={data}
          columns={columns}
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
      </div>
    );
  }
}
