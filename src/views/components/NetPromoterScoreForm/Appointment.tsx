import { AxiosPromise } from "axios";
import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

interface Appointment {
  customerTel: string;
  date: string;
  time: string;
}

export type SubmitAppointment = (data: Appointment) => AxiosPromise<void>;
interface Props {
  onSubmit: SubmitAppointment;
}

const initAppointment: Appointment = {
  customerTel: null,
  date: "",
  time: ""
};

export default function CustomerAppointment(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);
  const [appointment, setAppointment] = useState<Appointment>(initAppointment);

  const handleInput = (event: any): void => {
    const name = event.target.name;
    const value = event.target.value;
    const newAppointment = { ...appointment, [name]: value };
    setAppointment(newAppointment);
  };

  const submitAppointment = () => {
    setLoading(true);
    props
      .onSubmit(appointment)
      .then(({ status }) => {
        if (status !== 200) {
          throw new Error("Failed to create appointment");
        }
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        setLoading(false);
        setError(err.toString());
      });
  };

  return (
    <Form loading={loading} error={!!error}>
      <Form.Input
        width="8"
        label="1. Customer Contact"
        name="customerTel"
        type="tel"
        fluid={true}
        minLength={10}
        maxLength={10}
        pattern="[0]{1}[0-9]{9}"
        value={appointment.customerTel || ""}
        required={true}
        onChange={handleInput}
      />
      <Form.Field width="8">
        <label>2. Date of Interaction </label>
        <Input
          type="date"
          name="date"
          value={appointment.date}
          required={true}
          onChange={handleInput}
        />
      </Form.Field>
      <Form.Field width="8">
        <label>3. Time</label>
        <Input
          type="time"
          name="time"
          value={appointment.time}
          required={true}
          onChange={handleInput}
        />
      </Form.Field>
      <Form.Field>
        <Button type="submit" onClick={submitAppointment}>
          Submit
        </Button>
      </Form.Field>
      <Message
        error={true}
        header="NetPromoterScore input data Error"
        content={error}
      />
    </Form>
  );
}
