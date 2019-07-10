import { storiesOf } from "@storybook/react";
import React from "react";
import { evalTestData } from "../EvaluationDataTable/index.stories";
import { loggedInEvaluator, users } from "../UserProfile/index.stories";
import SummaryEvalTable from "./index";

storiesOf("components/SummaryEvalTable", module).add("default", () => (
  <SummaryEvalTable
    service="call"
    data={evalTestData}
    users={users}
    loggedIn={loggedInEvaluator}
  />
));
