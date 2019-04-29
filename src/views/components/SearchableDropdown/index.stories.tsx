import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import SearchableDropdown from "./index";

storiesOf("components/SearchableDropdown", module)
  .add("with values", () => (
    <SearchableDropdown
      name="test"
      values={["school", "hospital"]}
      defaultValue={"school"}
      onChange={action("search-select")}
    />
  ))
  .add("with options", () => (
    <SearchableDropdown
      name="test"
      options={[{ value: "hospital", text: "Hospital", key: "hospital" }]}
      defaultValue={"hospital"}
      onChange={action("search-select")}
    />
  ));
