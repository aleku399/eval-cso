import React from "react";
import { Accordion, Form, Icon } from "semantic-ui-react";
import SearchableDropdown from "../SearchableDropdown";

interface Props {
  activeSection: number;
  frontLineRatingReasons: string[];
  backOfficeReasons: string[];
  handleSectionClick: (event, { index: number }) => void;
  handleDropDownInput: (_event, { name, value }) => void;
}

export default function OfflineSection(props: Props) {
  return (
    <Accordion>
      <Accordion.Title
        active={props.activeSection === 1}
        index={1}
        onClick={props.handleSectionClick}
      >
        <Icon name="dropdown" />
        B. OFFLINE SECTION
      </Accordion.Title>
      <Accordion.Content active={props.activeSection === 1}>
        <Form.Field inline={true} width="8">
          <label>1. Front line reasons for rating the officer</label>
          <SearchableDropdown
            name="frontLineRatingReasons"
            placeholder="Select a reason"
            multiple={true}
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
            values={props.backOfficeReasons}
            onChange={props.handleDropDownInput}
          />
        </Form.Field>
      </Accordion.Content>
    </Accordion>
  );
}
