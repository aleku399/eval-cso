import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { categories } from "../UpdateServiceType";
import { agent } from "../UserProfile/index.stories";
import EvaluationDataForm, { deviation, Props, zeroRated } from "./index";

const props: Props = {
  onSubmit: action("submit"),
  loading: false,
  service: "Call",
  evaluator: "allan",
  agents: [agent],
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

storiesOf("components/EvaluationDataForm", module).add(
  "Evaluation Data Form",
  () => <EvaluationDataForm {...props} />
);
