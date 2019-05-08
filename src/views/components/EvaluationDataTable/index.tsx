import _ from "lodash";
import * as React from "react";
import "react-table/react-table.css";
import DataTable, { ColumnRowsOpt, TableData } from "../DataTable";
import {
  deviation,
  EvalState,
  ParamCategoryName,
  Parameter,
  zeroRated
} from "../EvaluationForm";
import { Profile } from "../UserProfile";

export interface ParameterAttrs extends Parameter {
  category: ParamCategoryName;
}

type CategoryObjects = { [k in ParamCategoryName]: ParameterAttrs[] };

interface EvalAttrs extends EvalState {
  evaluator: string;
  supervisor: string;
  branch: string;
}

export interface Evaluation {
  evalAttrs: EvalAttrs;
  parameters: ParameterAttrs[];
  score: number;
}

export type EvaluationData = Evaluation[];

export interface EvaluationTableData extends TableData {
  branch: string;
  zeroRated: ParameterAttrs[];
  deviation: ParameterAttrs[];
}

export interface Props {
  users: Profile[];
  data: EvaluationData;
  loggedIn: Profile;
  loading?: boolean;
  error?: string;
}

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
        Header: "Comment",
        accessor: "comment",
        style: { whiteSpace: "unset" },
        width: 200
      },
      {
        Header: "Details",
        accessor: "details",
        style: { whiteSpace: "unset" },
        width: 200
      },
      {
        Header: "Score",
        id: "score",
        accessor: "score"
      }
    ]
  }
];

export const getEvaluationTableData = (
  data: Evaluation[]
): EvaluationTableData[] => {
  return data.map((obj: Evaluation) => {
    const paramObj = _.groupBy(
      obj.parameters,
      (x: ParameterAttrs) => x.category
    ) as CategoryObjects;
    return {
      deviation: [],
      zeroRated: [],
      ...paramObj,
      ...obj.evalAttrs,
      score: obj.score,
      branch: obj.evalAttrs.branch,
      supervisor: obj.evalAttrs.supervisor,
      agentName: obj.evalAttrs.agentName
    };
  });
};

export default function EvaluationDataTable(props: Props) {
  return (
    <DataTable
      data={getEvaluationTableData(props.data)}
      users={props.users}
      columns={columns}
      loggedIn={props.loggedIn}
      loading={props.loading}
      error={props.error}
    />
  );
}
