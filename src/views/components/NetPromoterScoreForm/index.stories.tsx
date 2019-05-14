import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { loggedInEvaluator, users } from "../UserProfile/index.stories";
import NetPromoterScoreForm, { Props } from "./index";

const props: Props = {
  loading: false,
  evaluator: loggedInEvaluator,
  agents: users,
  frontLineRatingReasons: [
    "Good/ Positive CSO appearance",
    "Poor/ Negative CSO appearance",
    "Good/ Positive CSO Attitude"
  ],
  backOfficeReasons: [
    "Good Office Ambience",
    "Poor Office Ambience",
    "Easy finding and recognizing"
  ],
  onSubmit: action("submit"),
  touchPoints: ["person-to-person", "via app"],
  reasons: ["call", "email", "in-person"]
};

storiesOf("components/NetPromoterScoreForm", module).add(
  "Net Promoter Score Form",
  () => <NetPromoterScoreForm {...props} />
);
