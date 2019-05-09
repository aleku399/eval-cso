import React from "react";
import { connect } from "react-redux";
import ClaimsSummary from "src/views/templates/ClaimsSummary";

const page = () => <ClaimsSummary />;

export default connect()(page);
