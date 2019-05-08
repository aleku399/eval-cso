import _ from "lodash";
import * as React from "react";
import "react-table/react-table.css";
import DataTable, { ColumnRowsOpt } from "../DataTable";
import {
  Evaluation,
  EvaluationData,
  EvaluationTableData,
  getEvaluationTableData
} from "../EvaluationDataTable";
import {
  deviation,
  ParamCategoryName,
  Parameter,
  zeroRated
} from "../EvaluationForm";
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
        Cell: ({ row }) => {
          const list = row.comments.map((comment: string) => (
            <li key={comment.split(" ")[0]}>{comment}</li>
          ));
          return <ul style={{ marginTop: "2px" }}>{list}</ul>;
        },
        filterMethod: (filter, row) => {
          return row.comments.some((comment: string) =>
            comment.toLowerCase().startsWith(filter.value)
          );
        }
      },
      {
        Header: "Reasons for Deviation",
        width: 200,
        accessor: deviation,
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
        accessor: zeroRated,
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
      const comments = _.flatten(values.map(value => value.comment));
      const { from, to } = getDateRange(values.map(value => value.date));

      return {
        agentName: values[0].agentName,
        deviation: _.uniqBy(deviationArr, item => item.value),
        zeroRated: _.uniqBy(zeroRatedArr, item => item.value),
        from,
        to,
        score,
        comments,
        branch: values[0].branch
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
