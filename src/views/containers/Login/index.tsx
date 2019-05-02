import React from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { loginUser } from "../../../redux/login/action";
import { AppState } from "../../../redux/reducers";
import LoginForm, { Props } from "../../components/LoginForm";

const mapStateToProps = ({ login: { loading, error, profile } }: AppState) => ({
  loading,
  userName: profile && profile.userName,
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
