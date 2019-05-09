import React from "react";
import { connect } from "react-redux";
import ClaimTypes from "src/views/templates/ClaimTypes";

const page = () => <ClaimTypes />;

export default connect()(page);
