import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import UpdateClaimTypes from "./index";

const props = {
  loading: false,
  claimTypes: [{ name: "JKF", value: "jfk" }]
};

const createClaimTypesProps = {
  loading: false,
  claimTypes: []
};

const fakeSubmit = async (data: any): Promise<any> => {
  return Promise.resolve(data);
};

storiesOf("components/UpdateClaimTypes", module)
  .add("default", () => (
    <UpdateClaimTypes {...props} onSubmit={action("submit")} />
  ))
  .add("with new parameters", () => (
    <UpdateClaimTypes {...createClaimTypesProps} onSubmit={fakeSubmit} />
  ));
