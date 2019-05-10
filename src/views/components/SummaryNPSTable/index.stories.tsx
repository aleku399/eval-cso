import { storiesOf } from "@storybook/react";
import React from "react";
import { testNpsData } from "../NPSdataTable/index.stories";
import { adminProfileA, users } from "../UserProfile/index.stories";
import SummaryNPSTable from "./index";

storiesOf("components/SummaryNPSTable", module).add("default", () => (
  <SummaryNPSTable data={testNpsData} users={users} loggedIn={adminProfileA} />
));
