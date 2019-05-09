import * as React from "react";
import { Header } from "semantic-ui-react";
import UpdateUserProfile from "../../containers/UpdateUserProfile";
import Layout from "../Layout";

export default function UserProfileTemplate() {
  return (
    <Layout>
      <Header
        as="h3"
        textAlign="center"
        block={true}
        content="Update User Profile"
      />
      <UpdateUserProfile />
    </Layout>
  );
}
