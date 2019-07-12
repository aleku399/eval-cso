import React from "react";
import {
  Form,
  Input,
  Ref,
  StrictDropdownProps,
  TextArea
} from "semantic-ui-react";
import { mkOptionsFromUser } from "../../../lib/helper";
import RangeSlider from "../RangeSlider";
import SearchableDropdown from "../SearchableDropdown";
import { Profile } from "../UserProfile";

export type YesNoToggle = "Yes" | "No";

export interface OnlineEvaluation {
  waitTime: string;
  duration: string;
  date: string;
  reason: string;
  branch: string;
  customerTel: string;
  agentName: string;
  issueResolved: YesNoToggle;
  furtherInformationGiven: YesNoToggle;
  ratingReason: string;
  crmCaptureCorrect: YesNoToggle;
  crmCaptureReason?: string;
  rating: number;
}

interface Props {
  evaluation: OnlineEvaluation;
  agents: Profile[];
  reasons: string[];
  branches: string[];
  showOtherReasonField: boolean;
  handleInput: (event: any) => void;
  handleOtherReasonInput: (event: any) => void;
  assignRatingReasonRef: (node: HTMLTextAreaElement) => void;
  assignCrmCaptureReasonRef: (node: HTMLTextAreaElement) => void;
  handleDropDownInput: StrictDropdownProps["onChange"];
}

const yesNoStates: YesNoToggle[] = ["Yes", "No"];

export const OthersReasonLabel = "Others";

const yesNoOptions = [
  { text: "Yes", value: true },
  { text: "No", value: false }
];

export default function OnlineSection(props: Props) {
  return (
    <Form.Field>
      <Form.Field>
        <label> A. ONLINE SECTION</label>
      </Form.Field>
      <Form.Field>
        <Form.Input
          width="8"
          label="1. Customer Contact"
          name="customerTel"
          type="tel"
          fluid={true}
          minLength={10}
          maxLength={10}
          pattern="[0]{1}[0-9]{9}"
          value={props.evaluation.customerTel}
          required={true}
          onChange={props.handleInput}
        />
      </Form.Field>
      <Form.Field required={true} width="8">
        <label>1. Name of agentName who attended to customer</label>
        <SearchableDropdown
          name="agentName"
          placeholder="Select an agentName"
          options={mkOptionsFromUser(props.agents)}
          value={props.evaluation.agentName}
          onChange={props.handleDropDownInput}
        />
      </Form.Field>
      <Form.Field width="8">
        <label>2. Date of first time interaction </label>
        <Input
          type="date"
          name="date"
          value={props.evaluation.date}
          required={true}
          onChange={props.handleInput}
        />
      </Form.Field>

      <Form.Field required={true} width="8">
        <label>3. Touch point</label>
        <SearchableDropdown
          name="branch"
          placeholder="Select a touch point"
          value={props.evaluation.branch}
          values={props.branches}
          onChange={props.handleDropDownInput}
        />
      </Form.Field>

      <Form.Field required={true} width="8">
        <label>
          4. Please confirm the reason for your call/visit to the call center/
          branch.
        </label>
        <SearchableDropdown
          name="reason"
          placeholder="Select a reason"
          value={
            props.showOtherReasonField
              ? OthersReasonLabel
              : props.evaluation.reason
          }
          values={props.reasons}
          onChange={props.handleDropDownInput}
        />
      </Form.Field>
      {props.showOtherReasonField ? (
        <div style={{ paddingLeft: "2em" }}>
          <Form.Field width="8">
            <Form.Input
              type="text"
              name="otherReason"
              value={props.evaluation.reason}
              label="4. (b) Other Reason"
              placeholder="Specify other reason"
              onChange={props.handleOtherReasonInput}
            />
          </Form.Field>
        </div>
      ) : null}
      <Form.Field required={true}>
        <label>
          5. How long did you wait before an officer served you?(minutes)
        </label>
        <Input
          type="number"
          name="waitTime"
          value={props.evaluation.waitTime}
          required={true}
          onChange={props.handleInput}
        />
      </Form.Field>

      <Form.Field required={true}>
        <label>
          6. How long did an officer take while addressing your issue?(minutes)
        </label>
        <Input
          type="number"
          name="duration"
          value={props.evaluation.duration}
          required={true}
          onChange={props.handleInput}
        />
      </Form.Field>
      <Form.Field required={true} width="8">
        <label>7. Was your issue resolved?</label>
        <SearchableDropdown
          name="issueResolved"
          placeholder="Select Yes or No"
          options={yesNoOptions}
          value={props.evaluation.issueResolved}
          onChange={props.handleDropDownInput}
        />
      </Form.Field>
      <Form.Field required={true} width="8">
        <label>8. Did the CSO explain and give any further information?</label>
        <SearchableDropdown
          name="furtherInformationGiven"
          placeholder="Select Yes or No"
          options={yesNoOptions}
          value={props.evaluation.furtherInformationGiven}
          onChange={props.handleDropDownInput}
        />
      </Form.Field>
      <Form.Field>
        <label>
          9. Based on your experience while interacting with us, how likely is
          it that you recommend NSSF to a friend or a Family member, (On a scale
          of 0 – 10)?
          <RangeSlider
            value={props.evaluation.rating}
            onChange={props.handleInput}
          />
        </label>
      </Form.Field>

      <Form.Field>
        <label>
          10. Verbatim rating: What is the reason for the rating you have
          provided? (Please capture exactly what customer says)
        </label>
        <Ref innerRef={props.assignRatingReasonRef}>
          <TextArea
            type="text"
            name="ratingReason"
            placeholder="Write your recommendation reason"
          />
        </Ref>
      </Form.Field>

      <Form.Field required={true} width="8">
        <label>11. Was the CRM task captured correctly</label>
        <SearchableDropdown
          name="crmCaptureCorrect"
          placeholder="Select Yes or No"
          values={yesNoStates}
          value={props.evaluation.crmCaptureCorrect}
          onChange={props.handleDropDownInput}
        />
      </Form.Field>

      <Form.Field>
        <label>12. Please give reason for your response above</label>
        <Ref innerRef={props.assignCrmCaptureReasonRef}>
          <TextArea
            type="text"
            name="crmCaptureReason"
            placeholder="Reason for response"
          />
        </Ref>
      </Form.Field>
    </Form.Field>
  );
}
