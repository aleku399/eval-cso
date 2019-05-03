import React from "react";
import { connect } from "react-redux";
import CreateAgent from "src/views/templates/CreateAgent";

const page = () => <CreateAgent />;

export default connect()(page);
