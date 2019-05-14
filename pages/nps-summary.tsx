import React from "react";
import { connect } from "react-redux";
import NpsSummary from "src/views/templates/NpsSummary";

const page = () => <NpsSummary />;

export default connect()(page);
