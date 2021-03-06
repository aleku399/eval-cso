import * as React from "react";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";
import { AppState } from "../../../redux/reducers";
import { ADMIN, EVALUATOR, Profile } from "../../components/UserProfile";
import CreateEvaluation from "../../containers/CreateEvaluation";
import EvaluationDataView from "../../containers/EvaluationDataView";
import Layout from "../Layout";

interface Props {
  jwt: string;
  loggedInUser: Profile;
}

const mapStateToProps = ({ login: { jwt, profile } }: AppState): Props => ({
  loggedInUser: profile,
  jwt
});

function LoggedInUserView(user: Profile) {
  return user.role === ADMIN || user.role === EVALUATOR ? (
    <CreateEvaluation />
  ) : (
    <EvaluationDataView />
  );
}

function Home({ jwt, loggedInUser }: Props) {
  return (
    <Layout>
      {jwt && loggedInUser ? (
        LoggedInUserView(loggedInUser)
      ) : (
        <Header
          as="h3"
          textAlign="center"
          block={true}
          content="CSO Agent Evaluation App"
          subheader="Login to access features"
        />
      )}
    </Layout>
  );
}

export default connect<Props>(mapStateToProps)(Home);
