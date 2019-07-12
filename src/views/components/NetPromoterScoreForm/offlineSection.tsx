import React from "react";
import { Form, StrictDropdownProps } from "semantic-ui-react";
import SearchableDropdown from "../SearchableDropdown";

export interface OfflineEvaluation {
  frontLineRatingReasons: string[];
  backOfficeReasons: string[];
}

interface Props {
  frontLineRatingReasons: string[];
  evaluation: OfflineEvaluation;
  backOfficeReasons: string[];
  handleDropDownInput: StrictDropdownProps["onChange"];
}

export default function OfflineSection(props: Props) {
  return (
    <Form.Field>
      <Form.Field>
        <label> B. OFFLINE SECTION</label>
      </Form.Field>
      <Form.Field inline={true} width="8">
        <label>1. Front line reasons for rating the officer</label>
        <SearchableDropdown
          name="frontLineRatingReasons"
          placeholder="Select a reason"
          multiple={true}
          value={props.evaluation.frontLineRatingReasons}
          values={props.frontLineRatingReasons}
          onChange={props.handleDropDownInput}
        />
      </Form.Field>
      <Form.Field inline={true} width="8">
        <label>2 Back Office reasons</label>
        <SearchableDropdown
          name="backOfficeReasons"
          placeholder="Select a reason"
          multiple={true}
          value={props.evaluation.backOfficeReasons}
          values={props.backOfficeReasons}
          onChange={props.handleDropDownInput}
        />
      </Form.Field>
    </Form.Field>
  );
}
