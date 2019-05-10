import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
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
  service: "Call",
  evaluator: loggedInEvaluator,
  agents: [agent],
  reasons: ["Breach of confidentiality", "inquiry"],
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

storiesOf("components/EvaluationForm", module)
  .add("with evaluator", () => <EvaluationForm {...props} />)
  .add("with admin", () => <EvaluationForm {...adminProps} />);
