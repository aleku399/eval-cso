import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import EditServiceTypes from "./index";

const props = {
  loading: false,
  serviceType: "Call",
  parameterCategories: [
    {
      name: "Reasons for deviation",
      value: "deviation",
      parameters: [
        {
          name: "Breach of confidentiality",
          value: "breach_of_confidentiality",
          weight: 5
        },
        { name: "Knowledge", value: "knowledge", weight: 5 }
      ]
    },
    {
      name: "Reasons for Zero rating",
      value: "zero-rating",
      parameters: [
        { name: "Confidence", value: "confidence", weight: -10 },
        { name: "Language", value: "language", weight: -10 }
      ]
    }
  ]
};
storiesOf("components/EditServiceTypes", module).add("EditService", () => (
  <EditServiceTypes {...props} onSubmit={action("submit")} />
));
