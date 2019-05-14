import React from "react";
import { connect } from "react-redux";
import NpsData from "src/views/templates/NpsData";

const page = () => <NpsData />;

export default connect()(page);
