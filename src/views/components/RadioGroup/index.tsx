import React from "react";
import { Form, Radio } from "semantic-ui-react";

export interface RadioData {
  name: string;
  checked: boolean;
  value: "yes" | "no";
}

export type RadioOnChange = (event: any, data: RadioData) => void;

export interface Props {
  required?: boolean;
  name: string;
  label: string;
  firstLabel?: string;
  secondLabel?: string;
  checkedValue: boolean;
  onChange: RadioOnChange;
}

export default function RadioGroup(props: Props) {
  const { label, secondLabel = "No", required = true } = props;
  return (
    <Form.Field required={required}>
      <label>{label}</label>
      <Form.Field>
        <Radio
          name={props.name}
          checked={props.checkedValue}
          type="radio"
          label="Yes"
          value="yes"
          onChange={props.onChange}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          name={props.name}
          checked={!props.checkedValue}
          type="radio"
          label={secondLabel}
          value="no"
          onChange={props.onChange}
        />
      </Form.Field>
    </Form.Field>
  );
}
