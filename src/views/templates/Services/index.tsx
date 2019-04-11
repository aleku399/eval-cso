import * as React from "react";
import { Grid } from "semantic-ui-react";
import Placeholder from "../../components/Placeholder";
import NavBar from "../../containers/NavBar";
import SideBarMenu from "../../containers/SideBarMenu";
import Layout from "../Layout";

export default function Service() {
  return (
    <Layout>
      <Grid>
        <Grid.Column width={2}>
          <SideBarMenu />
        </Grid.Column>
        <Grid.Column width={11}>
          <Grid.Row>
            <NavBar />
          </Grid.Row>
          <Grid.Row>
            <Placeholder />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={3}>
          <Grid.Row>
            <h4>User Profile</h4>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Layout>
  );
}
