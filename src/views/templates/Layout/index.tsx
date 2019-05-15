import * as React from "react";
import { Container, Grid } from "semantic-ui-react";
import ErrorBoundary from "../../components/ErrorBoundary";
import NavMenu, { vertical } from "../../components/NavMenu";
import NavBar from "../../containers/NavBar";
import ServicesMenu from "../../containers/ServicesMenu";
import UserSideBar from "../../containers/UserSideBar";

const isServer = typeof window === "undefined";
const identity = (value: string) => value;

const Layout = ({ children }) => (
  <Container fluid={true} style={{ padding: "1rem" }}>
    <ErrorBoundary>
      <Grid>
        <Grid.Column width={3}>
          <NavMenu
            logo="/static/logo.png"
            header="CSO Evaluation Tool"
            setActiveMenuItem={identity}
            items={[]}
            alignment={vertical}
          />
          <UserSideBar />
          <ServicesMenu />
        </Grid.Column>
        <Grid.Column width={13}>
          <Container>
            <Grid.Row>
              <NavBar />
            </Grid.Row>
            <Grid.Row>
              <section style={{ paddingTop: "2rem" }}>
                {isServer ? null : children}
              </section>
            </Grid.Row>
          </Container>
        </Grid.Column>
      </Grid>
    </ErrorBoundary>
  </Container>
);

export default Layout;
