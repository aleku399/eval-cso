import React from "react";
import { connect } from "react-redux";
import UserList from "src/views/templates/UserList";

const page = () => <UserList />;

export default connect()(page);
