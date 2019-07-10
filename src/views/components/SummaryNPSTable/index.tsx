import _ from "lodash";
import * as React from "react";
import "react-table/react-table.css";
import DataTable, { ColumnRowsOpt } from "../DataTable";
import { NPS } from "../NPSdataTable";
import { getDateRange } from "../SummaryEvalTable";
import { Profile } from "../UserProfile";

export interface NPSSummaryData {
  score: number;
  to: string;
  from: string;
}

export interface Props {
  users: Profile[];
  data: NPS[];
  loggedIn: Profile;
  loading?: boolean;
  error?: string;
}

type NPSCategories = "Promoters" | "Passives" | "Detractors";

interface NPSWithCategory extends NPS {
  category: NPSCategories;
}

const Promoters: NPSCategories = "Promoters";
const Passives: NPSCategories = "Passives";
const Detractors: NPSCategories = "Detractors";

const columns: ColumnRowsOpt[] = [
  {
    Header: "Net Promoter Score",
    columns: [
      {
        Header: "Score",
        id: "score",
        accessor: "score",
        filterable: false
      }
    ]
  }
];

function getRatingCategory(rating: number) {
  if (rating >= 9) {
    return Promoters;
  }
  return rating < 7 ? Detractors : Passives;
}

function aggregate(data: NPS[]): NPSSummaryData[] {
  const categorized: NPSWithCategory[] = data.map(obj => {
    const category = getRatingCategory(obj.rating);
    return { ...obj, category };
  });

  const groupedByCategory = _.groupBy(categorized, obj => obj.category);

  const aggregatedByCategory = _.mapValues(
    groupedByCategory,
    (values: NPSWithCategory[]) => {
      const respondents = values.length;
      return {
        respondents
      };
    }
  );

  const promoters =
    aggregatedByCategory[Promoters] &&
    aggregatedByCategory[Promoters].respondents;
  const pcPromoters = promoters ? (promoters / data.length) * 100 : 0;

  const detractors =
    aggregatedByCategory[Detractors] &&
    aggregatedByCategory[Detractors].respondents;
  const pcDetractors = detractors ? (detractors / data.length) * 100 : 0;

  const npsValue = pcPromoters - pcDetractors;

  const { from, to } = getDateRange(data.map(value => value.date));

  return [{ score: _.round(npsValue, 2), from, to }];
}

export default function SummaryNPSTable(props: Props) {
  return (
    <DataTable
      data={props.data}
      users={props.users}
      columns={columns}
      loggedIn={props.loggedIn}
      service="nps"
      isSummaryTable={true}
      aggregate={aggregate}
      loading={props.loading}
      error={props.error}
    />
  );
}
