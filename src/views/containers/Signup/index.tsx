import React from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { AppState } from "../../../redux/reducers";
import { signupUser } from "../../../redux/signup/action";
import SignupForm, { Props } from "../../components/SignupForm";

const mapStateToProps = ({ signup: { loading, error } }: AppState) => ({
  loading,
  error
});

function Login(props: Props) {
  return <SignupForm {...props} />;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  onSubmit: signupUser(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
