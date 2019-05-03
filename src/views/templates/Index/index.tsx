import * as React from "react";
import { Header } from "semantic-ui-react";
import Layout from "../Layout";

export default function Home() {
  return (
    <Layout>
      <Header
        as="h3"
        textAlign="center"
        block={true}
        content="CSO Agent Evaluation App"
        subheader="Login to access features"
      />
    </Layout>
  );
}
