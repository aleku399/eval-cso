import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import SignUp from "./index";

storiesOf("components/signUp", module).add("default", () => (
  <SignUp onSubmit={action("signup")} />
));
