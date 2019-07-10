import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { Services } from "../../../lib/serviceData";
import { deviation, zeroRated } from "../EvaluationForm";
import UpdateServiceType from "./index";

const props = {
  loading: false,
  serviceType: "call" as Services,
  parameterCategories: [
    {
      name: "Reasons for deviation",
      value: deviation,
      parameters: [
        {
          name: "Breach",
          value: "breach",
          weight: 5,
          category: deviation
        },
        {
          name: "Knowledge",
          value: "knowledge",
          weight: 5,
          category: deviation
        }
      ]
    },
    {
      name: "Reasons for Zero rating",
      value: zeroRated,
      parameters: [
        {
          name: "Confidence",
          value: "confidence",
          weight: -10,
          category: zeroRated
        },
        {
          name: "Language",
          value: "language",
          weight: -10,
          category: zeroRated
        }
      ]
    }
  ]
};

const createParametersProps = {
  loading: false,
  serviceType: "call" as Services,
  parameterCategories: [
    {
      name: "Reasons for deviation",
      value: deviation,
      parameters: []
    },
    {
      name: "Reasons for Zero rating",
      value: zeroRated,
      parameters: []
    }
  ]
};

const fakeSubmit = async (data: any): Promise<any> => {
  return Promise.resolve(data);
};

storiesOf("components/UpdateServiceType", module)
  .add("default", () => (
    <UpdateServiceType {...props} onSubmit={action("submit")} />
  ))
  .add("with new parameters", () => (
    <UpdateServiceType {...createParametersProps} onSubmit={fakeSubmit} />
  ));
