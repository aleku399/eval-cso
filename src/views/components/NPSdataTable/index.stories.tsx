import { storiesOf } from "@storybook/react";
import React from "react";
import {
  agent,
  agentB,
  agentC,
  loggedInEvaluator
} from "../UserProfile/index.stories";
import NPSdataTable from "./index";

const users = [agentB, agent, agentC, loggedInEvaluator];

const testData = [
  {
    date: "2016-05-17",
    evaluator: "alex",
    agentName: "thanos",
    customerName: "wax",
    customerTel: 6358376,
    touchPoint: "person-to-person",
    reason: "call",
    waitTime: "5 mins",
    duration: "10 mins",
    issueResolved: false,
    furtherInformationGiven: true,
    rating: 5,
    ratingReason: "good reception",
    crmCaptureCorrect: true,
    crmCapturedReason: "potential customer",
    frontLineRatingReason: "Good/ Positive CSO appearance",
    backOfficeReason: "Good Office Ambience",
    comment: "comment",
    score: 40
  },
  {
    date: "2017-04-13",
    evaluator: "simon",
    agentName: "thanos",
    customerName: "zilla",
    customerTel: 63586,
    touchPoint: "via-app",
    reason: "email",
    waitTime: "5 mins",
    duration: "10 mins",
    issueResolved: true,
    furtherInformationGiven: false,
    rating: 5,
    ratingReason: "good reception",
    crmCaptureCorrect: true,
    crmCapturedReason: "fair customer",
    frontLineRatingReason: "Poor/ Negative CSO appearance",
    backOfficeReason: "Poor Office Ambience",
    comment: "comment",
    score: 10
  },
  {
    date: "2016-05-17",
    evaluator: "aleku399",
    agentName: "thanos",
    customerName: "allan",
    customerTel: 676,
    touchPoint: "person-to-person",
    reason: "call",
    waitTime: "5 mins",
    duration: "10 mins",
    issueResolved: true,
    furtherInformationGiven: false,
    rating: 5,
    ratingReason: "poor reception",
    crmCaptureCorrect: true,
    crmCapturedReason: "potential customer",
    frontLineRatingReason: "Good/ Positive CSO Attitude",
    backOfficeReason: "Easy finding and recognizing",
    score: 120,
    comment: "comment"
  }
];

storiesOf("components/NPSdataTable", module).add("default", () => (
  <NPSdataTable users={users} data={testData} loggedIn={loggedInEvaluator} />
));
