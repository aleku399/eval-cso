import React from "react";
import { connect } from "react-redux";
import EditService from "src/views/templates/EditService";

const page = () => <EditService />;

export default connect()(page);
