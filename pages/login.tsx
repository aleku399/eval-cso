import React from "react";
import { connect } from "react-redux";
import Login from "src/views/templates/Login";

const page = () => <Login />;

export default connect()(page);
