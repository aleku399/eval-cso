import * as React from "react";
import { Header } from "semantic-ui-react";
import CreateAgentProfile from "../../containers/CreateAgentProfile";
import Layout from "../Layout";

export default function CreateAgentTemplate() {
  return (
    <Layout>
      <Header
        as="h3"
        textAlign="center"
        block={true}
        content="Create new CSO Agent"
      />
      <CreateAgentProfile />
    </Layout>
  );
}
