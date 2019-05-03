import React from "react";
import { connect } from "react-redux";
import UserProfile from "src/views/templates/UserProfile";

const page = () => <UserProfile />;

export default connect()(page);
