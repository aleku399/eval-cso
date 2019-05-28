import * as React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from "react-testing-library";
import Signup from "../SignupForm/index";

afterEach(cleanup);

test("a new user to be registered, they must first sign up", async () => {
  const onsubmit = jest.fn();

  const { getByTestId, getByPlaceholderText } = render(
    <Signup onSubmit={onsubmit} />
  );

  const userName = "lubegasimon";
  const fullName = "lubega simon";
  const email = "admin@nssfug.org";
  const password = "admin";

  const username = await waitForElement(() =>
    getByPlaceholderText("nick name")
  );
  const userPassword = await waitForElement(() =>
    getByPlaceholderText("Password")
  );
  const fullname = await waitForElement(() =>
    getByPlaceholderText("Full Name")
  );
  const emailAddress = await waitForElement(() =>
    getByPlaceholderText("Email")
  );

  fireEvent.change(username, { target: { value: userName } });
  fireEvent.change(userPassword, { target: { value: password } });
  fireEvent.change(fullname, { target: { value: fullName } });
  fireEvent.change(emailAddress, { target: { value: email } });

  getByTestId("submitButton").click();

  expect(onsubmit).toBeCalledWith({ userName, fullName, email, password });
  expect(onsubmit).toHaveBeenCalledTimes(1);
});
