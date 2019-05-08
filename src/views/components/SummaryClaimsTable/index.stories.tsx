import { storiesOf } from "@storybook/react";
import React from "react";
import { claimsTestData } from "../ClaimsTable/index.stories";
import { loggedInEvaluator, users } from "../UserProfile/index.stories";
import SummaryClaimsTable from "./index";

storiesOf("components/SummaryClaimsTable", module).add("default", () => (
  <SummaryClaimsTable
    data={claimsTestData}
    users={users}
    loggedIn={loggedInEvaluator}
  />
));
