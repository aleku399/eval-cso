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
  search?: boolean;
  value?: string;
}

export function makeOptions(values: string[]): DropdownItemProps[] {
  return values.map(value => ({
    text: upperFirst(value),
    key: value,
    value
  }));
}

export default function SearchableDropdown(props: Props) {
  const { fluid = true, search = true } = props;
  const options = props.values ? makeOptions(props.values) : props.options;
  if (!options) {
    throw new Error(`Selection Options missing for ${props.name}`);
  }
  return (
    <Dropdown
      placeholder={props.placeholder}
      name={props.name}
      options={options}
      fluid={fluid}
      search={search}
      selection={true}
      onChange={props.onChange}
      value={props.value}
    />
  );
}
