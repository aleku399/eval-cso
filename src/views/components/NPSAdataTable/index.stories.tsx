import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { loggedInEvaluator, users } from "../UserProfile/index.stories";
import NPSAdataTable from "./index";

export const testNpsaData = [
  {
    date: "2019-05-01",
    evaluator: "alex",
    agentName: "thanos",
    customerName: "wax",
    customerTel: 6358376,
    touchPoint: "person-to-person",
    reason: "call",
    Time: "5 mins",
    duration: "10:00 AM",
    issueResolved: false,
    furtherInformationGiven: true,
    rating: 9,
    ratingReason: "good reception",
    crmCaptureCorrect: true,
    crmCapturedReason: "potential customer",
    frontLineRatingReasons: ["Good/ Positive CSO appearance"],
    backOfficeReasons: ["Good Office Ambience"],
    comment: "comment{ loggedInEv",
    id: 4
  },
  {
    date: "2019-03-02",
    evaluator: "steve",
    agentName: "alex",
    customerName: "wax",
    customerTel: 6358376,
    touchPoint: "Call",
    reason: "call",
    Time: "5:30 AM",
    duration: "10 mins",
    issueResolved: false,
    furtherInformationGiven: true,
    rating: 7,
    ratingReason: "good reception",
    crmCaptureCorrect: true,
    crmCapturedReason: "potential customer",
    frontLineRatingReasons: ["Good/ Positive CSO appearance"],
    backOfficeReasons: ["Good Office Ambience"],
    comment: "comment",
    id: 4
  },
  {
    date: "2019-04-13",
    evaluator: "simon",
    agentName: "thanos",
    customerName: "zilla",
    customerTel: 63586,
    touchPoint: "via-app",
    reason: "email",
    Time: "3: 00 PM",
    duration: "10 mins",
    issueResolved: true,
    furtherInformationGiven: false,
    rating: 5,
    ratingReason: "good reception",
    crmCaptureCorrect: true,
    crmCapturedReason: "fair customer",
    frontLineRatingReasons: ["Poor/ Negative CSO appearance"],
    backOfficeReasons: ["Poor Office Ambience"],
    comment: "comment",
    id: 4
  },
  {
    date: "2019-02-17",
    evaluator: "aleku399",
    agentName: "thanos",
    customerName: "allan",
    customerTel: 676,
    touchPoint: "person-to-person",
    reason: "call",
    Time: "4: 20 PM",
    duration: "10 mins",
    issueResolved: true,
    furtherInformationGiven: false,
    rating: 5,
    ratingReason: "poor reception",
    crmCaptureCorrect: true,
    crmCapturedReason: "potential customer",
    frontLineRatingReasons: ["Good/ Positive CSO Attitude"],
    backOfficeReasons: ["Easy finding and recognizing"],
    comment: "comment",
    id: 4
  }
];

storiesOf("components/NPSAdataTable", module).add("NPSAdataTable", () => (
  <NPSAdataTable
    data={testNpsaData}
    users={users}
    loggedIn={loggedInEvaluator}
    deleteHandler={action("delete")}
  />
));
