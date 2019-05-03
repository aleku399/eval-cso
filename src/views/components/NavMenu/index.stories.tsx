import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import NavMenu, { vertical } from ".";

const items = [
  { name: "Call Service", id: "call" },
  { name: "SMS Service", id: "sms-service" },
  { name: "Email Service", id: "email-service" },
  { name: "Claims Service", id: "claims-service" }
];

storiesOf("components/NavMenu", module).add("default", () => (
  <NavMenu
    items={items}
    alignment={vertical}
    activeItem="call"
    setActiveMenuItem={action("click")}
  />
));
