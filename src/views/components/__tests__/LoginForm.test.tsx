import * as React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "react-testing-library";
import LoginForm from "../LoginForm/index";

afterEach(cleanup);

test("user should login with his / her email and password", async () => {
  const onsubmit = jest.fn();

  const { getByTestId, getByPlaceholderText } = render(
    <LoginForm onSubmit={onsubmit} loading={false} />
  );

  const email = "admin@nssfug.org";
  const password = "admin";

  const emailAddress = await waitForElement(() =>
    getByPlaceholderText("Email address")
  );
  const userPassword = await waitForElement(() =>
    getByPlaceholderText("Password")
  );

  fireEvent.change(emailAddress, { target: { value: email } });
  fireEvent.change(userPassword, { target: { value: password } });
  getByTestId("submitButton").click();

  expect(onsubmit).toBeCalledWith({ email, password });
  expect(onsubmit).toHaveBeenCalledTimes(1);
});
