import * as React from "react";
import { Container } from "semantic-ui-react";
import ErrorBoundary from "../../components/ErrorBoundary";

const Layout = ({ children }) => (
  <Container fluid={true}>
    <ErrorBoundary>{children}></ErrorBoundary>
  </Container>
);

export default Layout;
