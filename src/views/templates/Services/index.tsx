import * as React from "react";
import { Grid } from "semantic-ui-react";
import Placeholder from "../../components/Placeholder";
import NavBar from "../../containers/NavBar";
import SideBarMenu from "../../containers/SideBarMenu";
import Layout from "../Layout";

export default function Service() {
  return (
    <Layout>
      <Grid column={3}>
        <Grid.Row>
          <Grid.Column width={3}>
            <Grid.Row>
              <SideBarMenu />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={10}>
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
        </Grid.Row>
      </Grid>
    </Layout>
  );
}
