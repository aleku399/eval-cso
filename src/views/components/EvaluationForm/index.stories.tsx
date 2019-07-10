import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { Services } from "../../../lib/serviceData";
import { categories } from "../UpdateServiceType";
import {
  adminProfileA,
  agent,
  loggedInEvaluator
} from "../UserProfile/index.stories";
import EvaluationForm, { deviation, Props, zeroRated } from "./index";

const props: Props = {
  onSubmit: action("submit"),
  loading: false,
  service: "call" as Services,
  evaluator: loggedInEvaluator,
  agents: [agent],
  branches: ["Kampala"],
  reasons: ["Breach of confidentiality", "inquiry", "Others"],
  parameterCategories: [
    {
      name: categories[zeroRated],
      value: zeroRated,
      parameters: [
        {
          name: "Breach of confidentiality",
          value: "breach-of-confidentiality",
          category: zeroRated,
          weight: 4
        },
        {
          name: "Rude to client",
          value: "rude",
          category: zeroRated,
          weight: 4
        }
      ]
    },
    {
      name: categories[deviation],
      value: deviation,
      parameters: [
        {
          name: "Acknowledgment",
          value: "acknowledgment",
          category: deviation,
          weight: 4
        },
        {
          name: "Poor English",
          value: "poor_english",
          category: deviation,
          weight: 5
        }
      ]
    }
  ]
};

const adminProps = { ...props, evaluator: adminProfileA };
const mysteryCall = {
  ...props,
  evaluator: adminProfileA,
  service: "mystery_call" as Services
};
const lookAndFeel = {
  ...props,
  evaluator: adminProfileA,
  service: "look_and_feel" as Services
};
const email = {
  ...props,
  evaluator: adminProfileA,
  service: "email" as Services
};
const withNoReasons = { ...props, evaluator: adminProfileA, reasons: [] };
const withNoReasonsEvaluator = { ...props, reasons: [] };

storiesOf("components/EvaluationForm", module)
  .add("with evaluator", () => <EvaluationForm {...props} />)
  .add("look and feel", () => <EvaluationForm {...lookAndFeel} />)
  .add("mystery call", () => <EvaluationForm {...mysteryCall} />)
  .add("email", () => <EvaluationForm {...email} />)
  .add("with admin", () => <EvaluationForm {...adminProps} />)
  .add("with out reasons admin", () => <EvaluationForm {...withNoReasons} />)
  .add("with out reasons evaluator", () => (
    <EvaluationForm {...withNoReasonsEvaluator} />
  ));
