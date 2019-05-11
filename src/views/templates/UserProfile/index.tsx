import * as React from "react";
import { Header } from "semantic-ui-react";
import UpdateUserProfile from "../../containers/UpdateUserProfile";
import Layout from "../Layout";

interface Props {
  userName: string;
}

export default function UserProfileTemplate({ userName }: Props) {
  return (
    <Layout>
      <Header
        as="h3"
        textAlign="center"
        block={true}
        content="Update User Profile"
      />
      <UpdateUserProfile userName={userName} />
    </Layout>
  );
}
