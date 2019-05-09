import React from "react";
import { connect } from "react-redux";
import ClaimsData from "src/views/templates/ClaimsData";

const page = () => <ClaimsData />;

export default connect()(page);
