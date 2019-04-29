import { AxiosPromise } from "axios";
import React from "react";
import axios from "../../../lib/axios";
import SignupForm, { SignupData } from "../../components/SignupForm";

const userSignupApi = "/users/signup";

export const signupUser = (credentials: SignupData): AxiosPromise<void> => {
  return axios.post(userSignupApi, credentials);
};

export default function Signup() {
  return <SignupForm onSubmit={signupUser} />;
}
