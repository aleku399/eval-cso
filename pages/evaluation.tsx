import React from "react";
import { connect } from "react-redux";
import Evaluation from "src/views/templates/Evaluation";

const page = () => <Evaluation />;

export default connect()(page);
