import React from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";

import { loginUser } from "../../../redux/login/action";
import { AppState } from "../../../redux/reducers";
import LoginForm, { Props } from "../../components/LoginForm";

const mapStateToProps = ({ login: { pendingLogin, error } }: AppState) => ({
  loading: pendingLogin,
  error
});

function Login(props: Props) {
  return <LoginForm {...props} />;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  onSubmit: loginUser(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
