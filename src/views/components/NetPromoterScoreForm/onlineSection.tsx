import React from "react";
import { Accordion, Form, Icon, Input, TextArea } from "semantic-ui-react";
import { mkOptionsFromUser } from "../../../lib/helper";
import RadioGroup, { RadioOnChange } from "../RadioGroup";
import RangeSlider from "../RangeSlider";
import SearchableDropdown from "../SearchableDropdown";
import { Profile } from "../UserProfile";

export type CrmCaptureState = "Good" | "Fair" | "Bad";

export interface OnlineEvaluation {
  waitTime: string;
  duration: string;
  date: string;
  reason: string;
  touchPoint: string;
  customerTel: string;
  agent: string;
  issueResolved: boolean;
  furtherInformationGiven: boolean;
  ratingReason: string;
  crmCaptureCorrect: CrmCaptureState;
  crmCaptureReason?: string;
  rating: number;
}

interface Props {
  evaluation: OnlineEvaluation;
  activeSection: number;
  agents: Profile[];
  reasons: string[];
  touchPoints: string[];
  handleInput: (event: any) => void;
  handleSectionClick: (event, obj: any) => void;
  handleChangeRadioInput: RadioOnChange;
  handleDropDownInput: (event, { name, value }) => void;
}

export default function OnlineSection(props: Props) {
  return (
    <Accordion>
      <Accordion.Title
        active={props.activeSection === 0}
        index={0}
        onClick={props.handleSectionClick}
      >
        <Icon name="dropdown" />
        A. ONLINE SECTION
      </Accordion.Title>
      <Accordion.Content active={props.activeSection === 0}>
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
          <label>1. Name of agent who attended to customer</label>
          <SearchableDropdown
            name="agent"
            placeholder="Select an Agent"
            options={mkOptionsFromUser(props.agents)}
            value={props.evaluation.agent}
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
            name="touchPoint"
            placeholder="Select an touch point"
            value={props.evaluation.touchPoint}
            values={props.touchPoints}
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
            value={props.evaluation.reason}
            values={props.reasons}
            onChange={props.handleDropDownInput}
          />
        </Form.Field>

        <Form.Field required={true}>
          <label>5. How long did you wait before an officer served you?</label>
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
            6. How long did an officer take while addressing your issue?
          </label>
          <Input
            type="number"
            name="duration"
            value={props.evaluation.duration}
            required={true}
            onChange={props.handleInput}
          />
        </Form.Field>
        <RadioGroup
          label="7. Was your issue resolved?"
          name="issueResolved"
          onChange={props.handleChangeRadioInput}
          checkedValue={props.evaluation.issueResolved}
        />
        <RadioGroup
          label="8. Did the CSO explain and give any further information?"
          name="furtherInformationGiven"
          onChange={props.handleChangeRadioInput}
          checkedValue={props.evaluation.furtherInformationGiven}
        />
        <Form.Field>
          <label>
            9. Based on your experience while interacting with us, how likely is
            it that you recommend NSSF to a friend or a Family member, (On a
            scale of 0 – 10)?
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
          <TextArea
            type="text"
            name="ratingReason"
            value={props.evaluation.ratingReason}
            placeholder="Write your recommendation reason"
            onChange={props.handleInput}
          />
        </Form.Field>

        <Form.Field required={true} width="8">
          <label>11. Was the CRM task captured correctly</label>
          <SearchableDropdown
            name="crmCaptureCorrect"
            placeholder="Select a comment"
            value={props.evaluation.crmCaptureCorrect}
            values={["Good", "Fair", "Bad"]}
            onChange={props.handleDropDownInput}
          />
        </Form.Field>

        <Form.Field>
          <label>12. Please give reason for your response above</label>
          <TextArea
            type="text"
            name="crmCaptureReason"
            value={props.evaluation.crmCaptureReason}
            placeholder="Reason for CRM capture state"
            onChange={props.handleInput}
          />
        </Form.Field>
      </Accordion.Content>
    </Accordion>
  );
}
