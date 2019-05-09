import React from "react";
import { connect } from "react-redux";
import Claim from "src/views/templates/Claim";

const page = () => <Claim />;

export default connect()(page);
