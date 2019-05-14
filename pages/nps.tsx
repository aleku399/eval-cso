import React from "react";
import { connect } from "react-redux";
import Nps from "src/views/templates/Nps";

const page = () => <Nps />;

export default connect()(page);
