import { withRouter } from "next/router";
import React from "react";
import { connect } from "react-redux";
import UserProfile from "src/views/templates/UserProfile";

const page = ({ router }) => <UserProfile userName={router.query.userName} />;

export default connect()(withRouter(page));
