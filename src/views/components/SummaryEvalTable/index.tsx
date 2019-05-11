import _ from "lodash";
import * as React from "react";
import "react-table/react-table.css";
import DataTable, { ColumnRowsOpt } from "../DataTable";
import {
  Evaluation,
  EvaluationData,
  EvaluationTableData,
  getEvaluationTableData,
  parameterCategoryColumns
} from "../EvaluationDataTable";
import { ParamCategoryName, Parameter } from "../EvaluationForm";
import { Profile } from "../UserProfile";

export interface ParameterAttrs extends Parameter {
  category: ParamCategoryName;
}

export interface Props {
  users: Profile[];
  data: EvaluationData;
  loggedIn: Profile;
  loading?: boolean;
  error?: string;
}

interface EvalSummaryData {
  agentName: string;
  zeroRated: ParameterAttrs[];
  deviation: ParameterAttrs[];
  comments: string[];
  supervisor: string;
  branch: string;
  score: number;
  to: string;
  from: string;
}

interface DateRange {
  from: string;
  to: string;
}
interface DateWithTime {
  date: string;
  time: number;
}

export interface TableRowWithList {
  row: { [field: string]: string[] };
}

export const listCellFormatter = (accessor: string) => ({
  row
}: TableRowWithList): JSX.Element => {
  const list = row[accessor].map((item: string) => (
    <li key={item.split(" ")[0]}>{item}</li>
  ));
  return <ul style={{ marginTop: "2px" }}>{list}</ul>;
};

export const listFilterMethod = (accessor: string) => (
  filter: { value: string },
  row: { [field: string]: string[] }
): boolean => {
  return row[accessor].some((item: string) =>
    item.toLowerCase().startsWith(filter.value)
  );
};

const columns: ColumnRowsOpt[] = [
  {
    Header: "Summary View",
    columns: [
      {
        Header: "Agent Name",
        accessor: "agentName"
      },
      {
        Header: "Comments",
        width: 200,
        accessor: "comments",
        style: { whiteSpace: "unset" },
        Cell: listCellFormatter("comments"),
        filterMethod: listFilterMethod("comments")
      },
      ...parameterCategoryColumns,
      {
        Header: "Score",
        id: "score",
        accessor: "score"
      }
    ]
  }
];

export function getDateRange(dates: string[]): DateRange {
  const datesWithTime: DateWithTime[] = dates.map(dateStr => {
    const dateValue = new Date(dateStr);
    return { time: dateValue.getTime(), date: dateStr };
  });
  const sortedDates = _.sortBy(datesWithTime, obj => obj.time);
  return { from: sortedDates[0].date, to: _.last(sortedDates).date };
}

function aggregate(data: EvaluationTableData[]): EvalSummaryData[] {
  const groupedByAgent = _.groupBy(data, obj => obj.agentName);

  const aggregatedByAgent = _.mapValues(
    groupedByAgent,
    (values: EvaluationTableData[]) => {
      const score = _.round(_.meanBy(values, value => value.score), 2);

      const deviationArr = _.flatten(values.map(value => value.deviation));
      const zeroRatedArr = _.flatten(values.map(value => value.zeroRated));
      const comments = _.uniq(_.flatten(values.map(value => value.comment)));
      const { from, to } = getDateRange(values.map(value => value.date));

      return {
        agentName: values[0].agentName,
        deviation: _.uniqBy(deviationArr, item => item.value),
        zeroRated: _.uniqBy(zeroRatedArr, item => item.value),
        from,
        to,
        score,
        comments,
        branch: values[0].branch,
        supervisor: values[0].supervisor
      };
    }
  );
  return _.values(aggregatedByAgent);
}

const getSummaryTableData = (data: Evaluation[]): EvaluationTableData[] =>
  getEvaluationTableData(data);

export default function SummaryEvalTable(props: Props) {
  return (
    <DataTable
      data={getSummaryTableData(props.data)}
      users={props.users}
      isSummaryTable={true}
      aggregate={aggregate}
      columns={columns}
      loggedIn={props.loggedIn}
      loading={props.loading}
      error={props.error}
    />
  );
}
