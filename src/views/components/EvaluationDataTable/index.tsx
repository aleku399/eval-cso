import _ from "lodash";
import * as React from "react";
import "react-table/react-table.css";
import { getFormattedDate } from "../../../lib/helper";
import { emailServiceIds, Services } from "../../../lib/serviceData";
import DataTable, {
  ColumnRowsOpt,
  DeleteHandler,
  TableData
} from "../DataTable";
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
  id: number;
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
  service: Services;
  loggedIn: Profile;
  loading?: boolean;
  error?: string;
  deleteHandler: DeleteHandler;
}

interface TableRowData {
  row: EvaluationTableData;
}

export const dateCellFormatter = (accessor: string = "date") => ({
  row
}: TableRowData): string => {
  const utcDate = row[accessor];
  return getFormattedDate(utcDate);
};

const parameterCellFormatter = (accessor: ParamCategoryName) => ({
  row
}: TableRowData): JSX.Element => {
  const list = row[accessor].map((param: ParameterAttrs) => (
    <li key={param.name}>{param.name}</li>
  ));
  return <ul style={{ marginTop: "0px" }}>{list}</ul>;
};

const parameterCellFilter = (accessor: ParamCategoryName) => (
  filter: { value: string },
  row: EvaluationTableData
): boolean => {
  return row[accessor].some((param: ParameterAttrs) =>
    param.name.toLowerCase().includes(filter.value)
  );
};

export const parameterCategoryColumns = [
  {
    Header: "Reasons for Deviation",
    width: 200,
    accessor: deviation,
    style: { whiteSpace: "unset" },
    Cell: parameterCellFormatter(deviation),
    filterMethod: parameterCellFilter(deviation)
  },
  {
    Header: "Reasons for Zero Rating",
    width: 200,
    accessor: zeroRated,
    style: { whiteSpace: "unset" },
    Cell: parameterCellFormatter(zeroRated),
    filterMethod: parameterCellFilter(zeroRated)
  }
];

const getColumns = (service: Services): ColumnRowsOpt[] => [
  {
    Header: "Data View",
    columns: [
      {
        Header: "Date",
        accessor: "date",
        filterable: false,
        Cell: dateCellFormatter()
      },
      {
        Header: "Agent Name",
        accessor: "agentName"
      },
      {
        Header: "Reason",
        id: "reason",
        accessor: "reason",
        style: { whiteSpace: "unset" },
        width: 200
      },
      ...parameterCategoryColumns,
      {
        Header: "Customer",
        accessor: emailServiceIds.includes(service)
          ? "customerEmail"
          : "customerTel"
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
      agentName: obj.evalAttrs.agentName,
      id: obj.id
    };
  });
};

export default function EvaluationDataTable(props: Props) {
  return (
    <DataTable
      data={getEvaluationTableData(props.data)}
      service={props.service}
      users={props.users}
      columns={getColumns(props.service)}
      loggedIn={props.loggedIn}
      loading={props.loading}
      error={props.error}
      deleteHandler={props.deleteHandler}
    />
  );
}
