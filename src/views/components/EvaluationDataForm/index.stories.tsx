import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import EvaluationDataForm from "./index";

const data = {
  loading: false,
  serviceType: "Call",
  agents: ["alex", "brian", "allan", "simon"],
  parameterCategories: [
    {
      categoryName: "Reasons for zero rating",
      value: "zero_rated",
      parameters: [
        {
          name: "Breach of confidentiality",
          value: "breach-of-confidentiality"
        },
        {
          name: "Rude to client",
          value: "rude"
        }
      ]
    },
    {
      categoryName: "Reasons for deviating",
      value: "deviation",
      parameters: [
        { name: "Acknowledgment", value: "acknowledgment" },
        { name: "Poor English", value: "poor_english" }
      ]
    }
  ]
};

storiesOf("components/EvaluationDataForm", module).add(
  "Evaluation Data Form",
  () => <EvaluationDataForm {...data} onSubmit={action("submit")} />
);
