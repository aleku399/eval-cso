import { storiesOf } from "@storybook/react";
import React from "react";
import NavMenu, { vertical } from ".";

const items = [
  { name: "Call Service", id: "call" },
  { name: "SMS Service", id: "sms-service" },
  { name: "Email Service", id: "email-service" },
  { name: "Claims Service", id: "claims-service" }
];

// tslint:disable no-console
storiesOf("components/NavMenu", module).add("default", () => (
  <NavMenu
    items={items}
    alignment={vertical}
    activeItem="call"
    setActiveMenuItem={console.log}
  />
));
