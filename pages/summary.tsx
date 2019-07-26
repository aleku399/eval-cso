import React from "react";
import { connect } from "react-redux";
import SummaryView from "src/views/templates/SummaryView";

const page = () => <SummaryView />;

export default connect()(page);
