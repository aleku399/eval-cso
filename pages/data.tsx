import React from "react";
import { connect } from "react-redux";
import DataView from "src/views/templates/DataView";

const page = () => <DataView />;

export default connect()(page);
