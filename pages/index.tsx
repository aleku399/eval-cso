import React from "react";
import { connect } from "react-redux";
import Services from "src/views/templates/Services";

const index = () => <Services />;

export default connect()(index);
