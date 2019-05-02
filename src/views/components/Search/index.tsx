import React from "react";
import { Input, Segment } from "semantic-ui-react";

interface Props {
  autoFocus?: boolean;
  loading?: boolean;
  onChange: (term: string) => void;
}

interface State {
  value: string;
}

class Search extends React.Component<Props, State> {
  public props: Props;
  public state: State;

  constructor(props) {
    super(props);

    this.state = {
      value: null
    };
  }

  public onChange = e => {
    this.setState({ value: e.target.value });
  };

  public onSubmit = e => {
    e.preventDefault();
    this.props.onChange(this.state.value);
    this.setState({ value: null });
  };

  public render() {
    return (
      <Segment
        onSubmit={this.onSubmit}
        as="form"
        padded={false}
        style={{ marginTop: "2em", padding: "0.5em" }}
      >
        <Input
          fluid={true}
          transparent={true}
          autoFocus={this.props.autoFocus}
          loading={this.props.loading}
          size="big"
          icon="search"
          value={this.state.value}
          onChange={this.onChange}
          placeholder="Search events, cities, genres, categories"
        />
      </Segment>
    );
  }
}

export default Search;
