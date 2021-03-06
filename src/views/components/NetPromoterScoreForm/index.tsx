import { AxiosPromise } from "axios";
import React from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { nullEmptyStrings } from "../../../lib/helper";
import RadioGroup from "../RadioGroup";
import { Profile } from "../UserProfile";
import OfflineSection, { OfflineEvaluation } from "./offlineSection";
import OnlineSection, {
  OnlineEvaluation,
  OthersReasonLabel
} from "./onlineSection";

interface Evaluation {
  online: OnlineEvaluation;
  offline: OfflineEvaluation;
}

type EvaluationPayload = OnlineEvaluation & OfflineEvaluation;

export type SubmitEvaluation = (data: EvaluationPayload) => AxiosPromise<void>;

export interface Props {
  onSubmit: SubmitEvaluation;
  loading: boolean;
  error: string;
  agents: Profile[];
  evaluator: Profile;
  frontLineRatingReasons: string[];
  backOfficeReasons: string[];
  branches: string[];
  reasons: string[];
}

export type Section = "online" | "offline";

interface State {
  evaluation: Evaluation;
  loading: boolean;
  errors: string;
  showForm: boolean;
  feedback: string;
  showOtherReasonField: boolean;
}

export const onlineSection: Section = "online";
export const offlineSection: Section = "offline";

export default class NetPromoterScoreForm extends React.Component<
  Props,
  State
> {
  public ratingReasonRef: HTMLTextAreaElement;
  public crmCaptureReasonRef: HTMLTextAreaElement;

  public initialOnline: OnlineEvaluation = {
    agentName: "",
    branch: "",
    date: "",
    reason: "",
    waitTime: "",
    duration: "",
    issueResolved: null,
    customerTel: "",
    furtherInformationGiven: null,
    ratingReason: "",
    crmCaptureCorrect: null,
    crmCaptureReason: "",
    rating: null
  };

  public initialState: State = {
    evaluation: {
      online: this.initialOnline,
      offline: {
        frontLineRatingReasons: [],
        backOfficeReasons: []
      }
    },
    showOtherReasonField: false,
    errors: this.props.error,
    loading: this.props.loading,
    showForm: false,
    feedback: null
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  public componentDidUpdate(prevProp: Props) {
    if (
      prevProp.loading !== this.props.loading ||
      prevProp.error !== this.props.error
    ) {
      this.setState({
        errors: this.props.error,
        loading: this.props.loading
      });
    }
  }

  public handleShowForm = (_event, { value }) => {
    const feedback = value === "no" ? null : "Proceed as below";
    const radioState = value === "yes" ? true : false;
    this.setState({ feedback, showForm: radioState });
  };

  public handleDropDownInput = (section: Section) => (
    _event,
    { name, value }
  ): void => {
    const sectionEvaluation = {
      ...this.state.evaluation[section],
      [name]: value
    };
    const evaluation = {
      ...this.state.evaluation,
      [section]: sectionEvaluation
    };
    const showOtherReasonField =
      name === "reason" && value === OthersReasonLabel;
    return this.setState({ evaluation, showOtherReasonField });
  };

  public handleInput = (section: Section) => (event: any): void => {
    const { name, value, type } = event.target;
    const validValue = type === "number" ? Number(value) : value;
    const sectionEvaluation = {
      ...this.state.evaluation[section],
      [name]: validValue
    };

    const evaluation = {
      ...this.state.evaluation,
      [section]: sectionEvaluation
    };
    this.setState({ evaluation });
  };

  public handleOtherReasonInput = (event: any): void => {
    const { value } = event.target;
    const online = {
      ...this.state.evaluation.online,
      reason: value
    };
    const evaluation = {
      ...this.state.evaluation,
      online
    };
    this.setState({ evaluation });
  };

  public validateOfflineSection = (): boolean => {
    const offline = this.state.evaluation.offline;
    if (!offline.frontLineRatingReasons.length) {
      this.setState({
        errors: "Please select at least one Front line reason"
      });
      return false;
    }
    if (!offline.backOfficeReasons.length) {
      this.setState({
        errors: "Please select at least one Back Office reason"
      });
      return false;
    }
    return true;
  };

  // TODO: this can be abstracted away
  public validateOnlineSection = (): boolean => {
    const online = this.state.evaluation.online;
    if (!online.agentName) {
      this.setState({ errors: "Please select an agentName" });
      return false;
    }
    if (!online.branch) {
      this.setState({ errors: "Please select a touch point" });
      return false;
    }
    if (!online.reason) {
      this.setState({ errors: "Please select a reason for your call/visit" });
      return false;
    }
    if (!online.crmCaptureCorrect) {
      this.setState({ errors: "Please select if CRM capture" });
      return false;
    }
    if (!online.date) {
      this.setState({ errors: "Please enter a date" });
      return false;
    }
    if (online.rating === null) {
      this.setState({ errors: "Please select a rating" });
      return false;
    }
    return true;
  };

  public validate = (): boolean => {
    const isValid =
      this.validateOfflineSection() && this.validateOnlineSection();
    if (isValid) {
      this.setState({ errors: null });
      return true;
    }
    return false;
  };

  public clearInput = () => {
    this.ratingReasonRef.value = "";
    this.crmCaptureReasonRef.value = "";
    this.setState({ evaluation: this.initialState.evaluation });
  };

  public addRefTextValues(evaluation: Evaluation): Evaluation {
    const ratingReason = this.ratingReasonRef.value;
    const crmCaptureReason = this.crmCaptureReasonRef.value;
    const online = { ...evaluation.online, ratingReason, crmCaptureReason };
    return {
      ...evaluation,
      online
    };
  }

  public handleSubmit = (): void => {
    if (this.validate()) {
      this.setState({ loading: true });
      const date = new Date(this.state.evaluation.online.date);
      const evaluation = this.addRefTextValues(this.state.evaluation);

      const evaluationPayload = {
        ...evaluation.offline,
        ...evaluation.online,
        date: date.toISOString()
      };

      const payload = nullEmptyStrings<EvaluationPayload>(evaluationPayload);
      this.props
        .onSubmit(payload)
        .then(({ status }) => {
          if (status !== 200) {
            throw new Error("Failed to submit NPS data");
          }
          this.setState({ loading: false, feedback: "Submitted NPS data" });
          this.clearInput();
        })
        .catch(err => {
          this.setState({
            loading: false,
            errors: err.toString(),
            feedback: null
          });
        });
    }
  };

  public assignRatingReasonRef = (node: HTMLTextAreaElement) => {
    this.ratingReasonRef = node;
  };

  public assignCrmCaptureReasonRef = (node: HTMLTextAreaElement) => {
    this.crmCaptureReasonRef = node;
  };

  public setWelcomeMessage = () => {
    return `Good day, this is ${
      this.props.evaluator.fullName
    } from NSSF, do you have 3 minutes to quickly talk about your recent experience
    when you  contacted us/interacted with us?`;
  };

  public render() {
    return (
      <Form
        error={!!this.state.errors}
        loading={this.state.loading}
        onSubmit={this.handleSubmit}
      >
        <Message
          error={true}
          header="NetPromoterScore input Error"
          content={this.state.errors}
        />
        <RadioGroup
          label={this.setWelcomeMessage()}
          required={false}
          name="radioGroup"
          secondLabel="No, ask for a convenient time for a call back and thank customer"
          onChange={this.handleShowForm}
          checkedValue={this.state.showForm}
        />
        <Message
          hidden={!this.state.feedback}
          positive={true}
          floating={true}
          content={this.state.feedback}
        />
        {this.state.showForm ? (
          <Form.Field>
            <OnlineSection
              evaluation={this.state.evaluation.online}
              agents={this.props.agents}
              reasons={this.props.reasons}
              branches={this.props.branches}
              handleInput={this.handleInput(onlineSection)}
              showOtherReasonField={this.state.showOtherReasonField}
              handleOtherReasonInput={this.handleOtherReasonInput}
              assignCrmCaptureReasonRef={this.assignCrmCaptureReasonRef}
              assignRatingReasonRef={this.assignRatingReasonRef}
              handleDropDownInput={this.handleDropDownInput(onlineSection)}
            />
            <OfflineSection
              frontLineRatingReasons={this.props.frontLineRatingReasons}
              evaluation={this.state.evaluation.offline}
              backOfficeReasons={this.props.backOfficeReasons}
              handleDropDownInput={this.handleDropDownInput(offlineSection)}
            />
            <Form.Field>
              <Button type="submit">Submit</Button>
            </Form.Field>
          </Form.Field>
        ) : null}
      </Form>
    );
  }
}
