import React from "react";
import { connect } from "react-redux";
import Signup from "src/views/templates/Signup";

const page = () => <Signup />;

export default connect()(page);
