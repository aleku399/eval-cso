import { upperFirst } from "lodash";
import React from "react";
import {
  Dropdown,
  DropdownItemProps,
  StrictDropdownProps
} from "semantic-ui-react";

interface Props {
  onChange: StrictDropdownProps["onChange"];
  options?: DropdownItemProps[];
  values?: string[];
  placeholder?: string;
  name: string;
  fluid?: boolean;
  defaultValue?: string;
}

function makeOptions(values: string[]): DropdownItemProps[] {
  return values.map(value => ({
    text: upperFirst(value),
    key: value,
    value
  }));
}

export default function SearchableDropdown(props: Props) {
  const { fluid = true } = props;
  const options = props.values ? makeOptions(props.values) : props.options;
  if (!options) {
    throw new Error("Selection Options missing");
  }
  return (
    <Dropdown
      placeholder={props.placeholder}
      name={props.name}
      options={options}
      fluid={fluid}
      search={true}
      selection={true}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
    />
  );
}
